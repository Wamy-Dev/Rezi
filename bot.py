#    ______               __  __            __                  
#   / ____/___ _____ _   / / / /_  ______  / /____  ___________ 
#  / __/ / __ `/ __ `/  / /_/ / / / / __ \/ __/ _ \/ ___/ ___(_)
# / /___/ /_/ / /_/ /  / __  / /_/ / / / / /_/  __/ /  (__  )   
#/_____/\__, /\__, /  /_/ /_/\__,_/_/ /_/\__/\___/_/  /____(_)  
#      /____//____/                                             
# Mato.5201
import discord
import meilisearch
from discord.ext import commands
from quart import Quart
from decouple import config
import base64
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import asyncio
from threading import Thread
#quart
app = Quart(__name__)
@app.route("/", methods = ["get"])
async def index():
    return '<h3><center>Rezi bot is up! ✔</center></h3>', 200
#env
SEARCHAPIKEY = config('SEARCHAPIKEY')
CLIENTTOKEN = config('CLIENTTOKEN')
#firebase
cred = credentials.Certificate("./creds.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
#counts
doc = db.collection(u'counts').document(u'counts')
#meilisearch
searcher = meilisearch.Client("https://search.rezi.one", SEARCHAPIKEY)
#discord
intents = discord.Intents.default()
intents.message_content = True
intents.members = True
client = commands.Bot(command_prefix = '$', intents=intents)
client.remove_command('help')

@client.event
async def on_ready():
    print(f'Bot is ready. Logged in as {client.user}(ID: {client.user.id}) ')
    await client.change_presence(activity = discord.Activity(type = discord.ActivityType.watching, name = "$help"))#sets status as "Watching:!help"
@client.command()
async def eggotyou(ctx):
    await ctx.send('Fine. You got me... screenshot this and send it to me on my discord to have your name put in the source code!', delete_after=5)
    await ctx.message.delete()
@client.command()
async def project(ctx):
    embed = discord.Embed(title = "Rezi Github", colour = discord.Colour.from_rgb(4,132,188))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
    embed.add_field(name = '🔗', value='https://github.com/Wamy-Dev/Rezi', inline = False)
    embed.set_footer(text = "If you like this project please donate using $donate.")
    await ctx.send(embed = embed)
@client.command(aliases = ['decode', 'converts'])
async def convert(ctx, arg=None):
    def convert_command_embeds(link:str,author:discord.User): 
    #Thanks @ItsZabbs for this code snippet
        embed = discord.Embed(title = "Here is your converted link!", colour = discord.Colour.from_rgb(4,132,188))
        embed.set_author(name = author, icon_url = author.avatar.url)
        embed.add_field(name = '🔗', value="https://"+link if not link.startswith("https://") else link, inline = False)
        embed.set_footer(text = "If you like this project please donate using $donate in the server.")
        sendembed = discord.Embed(title = "Please check your DMs!", colour = discord.Colour.from_rgb(4,132,188))
        sendembed.set_author(name = author, icon_url = author.avatar.url)
        sendembed.set_footer(text = "If you like this project please donate using $donate in the server.")
        return embed,sendembed
    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel
    if (arg):
        beforecontent = arg
        try: 
            link = base64.b64decode(beforecontent).decode('utf-8')
        except:
            await ctx.send('```❌ Invalid base64 link. Please try again.```')
        embed,sendembed = convert_command_embeds(link,ctx.message.author)
        await ctx.author.send(embed = embed) 
        await ctx.send(embed = sendembed)
    else:
        embed = discord.Embed(title = "Please respond with your base64 link.", colour = discord.Colour.from_rgb(251,172,4))
        embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
        embed.set_footer(text = "Respond within 15 seconds. Rezi will return your link in your DMs.")
        await ctx.send(embed = embed)
        try:  
            message = await client.wait_for("message", check = check, timeout = 15)
            beforecontent = message.content
            try:
                link = base64.b64decode(beforecontent).decode('utf-8')
            except:
                await ctx.send('```❌ Invalid base64 link. Please try again.```')
            embed,sendembed = convert_command_embeds(link,ctx.message.author)
            await ctx.author.send(embed = embed)
            await ctx.send(embed = sendembed)
        except asyncio.TimeoutError:
            await ctx.send('```❌ Timed out.```')
@client.command()
async def website(ctx):
    embed = discord.Embed(title = "Rezi Website", colour = discord.Colour.from_rgb(4,132,188))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
    embed.add_field(name = '🔗', value='https://rezi.one', inline = False)
    embed.set_footer(text = "If you like this project please donate using $donate.")
    await ctx.send(embed = embed)
@client.command()
async def donate(ctx):
    embed = discord.Embed(title = "Donate to the project", colour = discord.Colour.from_rgb(4,132,188))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
    embed.add_field(name = '🔗', value='https://homeonacloud.com/donate', inline = False)
    embed.set_footer(text = "If you like this project please donate using $donate.")
    await ctx.send(embed = embed)
@client.command()
async def ping(ctx):
    txt = str(f"""```css\nIm not too slow right? {round(client.latency * 1000)}ms.```""")
    await ctx.send(txt)
@client.command()
async def counts(ctx):
    counts = doc.get()
    previouscount = counts.to_dict()
    txt = str(f"""```css\nThe bot has grabbed {str(previouscount["counts"])} times.```""")
    await ctx.send(txt)
@client.command(pass_context = True, aliases = ['Help'])
async def help(ctx):
    embed = discord.Embed(title = "Here is a command list:", colour= discord.Colour.from_rgb(251,172,4))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
    embed.add_field(name = '$grab', value='Search for a game to download. Returns the link in base64.', inline = False)
    embed.add_field(name = '$ping', value='Shows the ping between the bot and the user.', inline = False)
    embed.add_field(name = '$project', value='View the project Github.', inline = False)
    embed.add_field(name = '$website', value='View the Rezi website.', inline = False)
    embed.add_field(name = '$donate', value='Donate to the project.', inline = False)
    embed.add_field(name = '$convert', value='Convert your link so you can use it.', inline = False)
    embed.add_field(name = '$counts', value='See how many times the bot has grabbed globally.', inline = False)
    await ctx.send(embed = embed)
@client.command(aliases = ['Grab', 'GRAB', 'get', 'GET', 'search', 'SEARCH'])
async def grab(ctx):
    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel
    #detection of discord officials
    pf = ctx.author.public_flags
    if (pf.discord_certified_moderator or pf.staff or pf.partner or pf.team_user or pf.system):
        await ctx.send('```The Rezi Discord Bot does not contain any piracy. Please email *contact@rezi.one* for any inquiries. Thank you. ```')
    else:
        embed = discord.Embed(title = "Search for any game imaginable:", colour = discord.Colour.from_rgb(251,172,4))
        embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
        embed.set_footer(text = "Respond within 15 seconds. If you like this project please donate using $donate")
        await ctx.send(embed = embed)
        try:
            message = await client.wait_for("message", check = check, timeout = 15)
        except asyncio.TimeoutError:
            await ctx.send('```❌ Timed out. Please try again.```')
        beforecontent = message.content
        #
        try:
            searchresult = searcher.index('games').search(beforecontent, {
                'limit': 5,
                'attributesToRetrieve': ['basename', 'link'],
                })
            itemnumber = len(searchresult["hits"])
            if itemnumber == 0:
                await ctx.send(f"```❌ Could not find {beforecontent}. This is impossible. Please check your search and try again.```")
            else:
                i = 0
                embed = discord.Embed(title = f"Here are your top {itemnumber} results:", colour = discord.Colour.from_rgb(4,132,188))
                embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
                embed.set_footer(text = "To get more results please go to https://rezi.one. To convert do $convert.")
                while i < itemnumber:
                    title = searchresult["hits"][i]["basename"]
                    linkbytes = base64.b64encode(searchresult["hits"][i]["link"].encode("UTF-8"))
                    link = linkbytes.decode("UTF-8")
                    embed.add_field(name = title, value = link, inline = False)
                    i+=1
                await ctx.send(embed = embed)
                try:
                    counts = doc.get()
                    previouscount = counts.to_dict()
                    newcount = previouscount['counts'] + 1
                    doc.update({u'counts': newcount})
                except: 
                    print('Adding count failed')
        except:
            await ctx.send('```❌ Something went wrong. Please try again or report this on the Github using $project.```')
class async_discord_thread(Thread):
    #thanks @FrankWhoee for this code snippet
    def __init__(self):
        Thread.__init__(self)
        self.loop = asyncio.get_event_loop()
        self.start()
    async def starter(self):
        await client.start(CLIENTTOKEN)
    def run(self):
        self.name = 'Discord.py'
        self.loop.create_task(self.starter())
        self.loop.run_forever()
discord_thread = async_discord_thread()
app.run(host="0.0.0.0")
