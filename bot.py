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
#Putting all repeated lines in a function
def convert_command_embeds(link:str,author:discord.User):
    embed = discord.Embed(title = "Here is your converted link!", colour = discord.Colour.from_rgb(4,132,188))
    embed.set_author(name = author, icon_url = author.avatar.url)
    embed.add_field(name = '🔗', value="https://"+link if not link.startswith("https://") else link, inline = False)
    embed.set_footer(text = "If you like this project please donate using $donate in the server.")
    sendembed = discord.Embed(title = "Please check your DMs!", colour = discord.Colour.from_rgb(4,132,188))
    sendembed.set_author(name = author, icon_url = author.avatar.url)
    sendembed.set_footer(text = "If you like this project please donate using $donate in the server.")
    return embed,sendembed

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
@client.command()
async def convert(ctx, arg=None):
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
        searchresult = searcher.index('games').search(beforecontent, {
            'limit': 4,
            'attributesToRetrieve': ['basename', 'link'],
            })
        if 'nbHits' in searchresult:
            del searchresult['nbHits']
            del searchresult['exhaustiveNbHits']
            del searchresult['query']
            del searchresult['limit']
            del searchresult['offset']
            del searchresult['processingTimeMs']
            result = str(searchresult)
            for t in (("'", ""), ("{", ""), ("}", ""), ("]", ""), ("[", ""), ("hits: ", ""), ("basename: ", ""), ("link: ", "")):
                result = result.replace(*t)
            try:
                link1title,link1link,link2title,link2link,link3title,link3link,link4title,link4link = result.split(",")
                link1link = link1link.replace(" ", "")
                link2link = link2link.replace(" ", "")
                link3link = link3link.replace(" ", "")
                link4link = link4link.replace(" ", "")
                link1b64 = base64.b64encode(link1link.encode("UTF-8"))
                link1b64 = link1b64.decode("UTF-8")
                link2b64 = base64.b64encode(link2link.encode("UTF-8"))
                link2b64 = link2b64.decode("UTF-8")
                link3b64 = base64.b64encode(link3link.encode("UTF-8"))
                link3b64 = link3b64.decode("UTF-8")
                link4b64 = base64.b64encode(link4link.encode("UTF-8"))
                link4b64 = link4b64.decode("UTF-8")
                embed = discord.Embed(title = "Here are your top 4 results:", colour = discord.Colour.from_rgb(4,132,188))
                embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
                embed.add_field(name = link1title, value = link1b64, inline = False)
                embed.add_field(name = link2title, value = link2b64, inline = False)
                embed.add_field(name = link3title, value = link3b64, inline = False)
                embed.add_field(name = link4title, value = link4b64, inline = False)
                embed.set_footer(text = "To get more results please go to https://rezi.one. To convert do $convert.")
                await ctx.send(embed = embed)
                try:
                    counts = doc.get()
                    previouscount = counts.to_dict()
                    newcount = previouscount['counts'] + 1
                    doc.update({u'counts': newcount})
                except: 
                    print('Adding count failed')
            except:
                try:
                    if result:
                        link1title,link1link = result.split(",")
                        link1link = link1link.replace(" ", "")
                        link1b64 = base64.b64encode(link1link.encode("UTF-8"))
                        link1b64 = link1b64.decode("UTF-8")
                        embed = discord.Embed(title = "Here is your top result:", colour = discord.Colour.from_rgb(4,132,188))
                        embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
                        embed.add_field(name = link1title, value = link1b64, inline = False)
                        embed.set_footer(text = "Only 1 result found. To convert do $convert.")
                        await ctx.send(embed = embed)
                        try:
                            counts = doc.get()
                            previouscount = counts.to_dict()
                            newcount = previouscount['counts'] + 1
                            doc.update({u'counts': newcount})
                        except:
                            print('Adding count failed')
                    else:
                        await ctx.send(f'```No results found. Thats impossible. Your search was: {beforecontent}. Please make sure this was correct.```')
                except:
                    try:
                        if result:
                            link1title,link1link,link2title,link2link = result.split(",")
                            link1link = link1link.replace(" ", "")
                            link2link = link2link.replace(" ", "")
                            link1b64 = base64.b64encode(link1link.encode("UTF-8"))
                            link1b64 = link1b64.decode("UTF-8")
                            link2b64 = base64.b64encode(link2link.encode("UTF-8"))
                            link2b64 = link2b64.decode("UTF-8")
                            embed = discord.Embed(title = "Here are your top results:", colour = discord.Colour.from_rgb(4,132,188))
                            embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
                            embed.add_field(name = link1title, value = link1b64, inline = False)
                            embed.add_field(name = link2title, value = link2b64, inline = False)
                            embed.set_footer(text = "Only 2 results found. To convert do $convert.")
                            await ctx.send(embed = embed)
                            try:
                                counts = doc.get()
                                previouscount = counts.to_dict()
                                newcount = previouscount['counts'] + 1
                                doc.update({u'counts': newcount})
                            except:
                                print('Adding count failed')
                        else:
                            await ctx.send(f'```No results found. Thats impossible. Your search was: {beforecontent}. Please make sure this was correct.```')
                    except:
                        try:
                            if result:
                                link1title,link1link,link2title,link2link,link3title,link3link = result.split(",")
                                link1link = link1link.replace(" ", "")
                                link2link = link2link.replace(" ", "")
                                link3link = link3link.replace(" ", "")
                                link1b64 = base64.b64encode(link1link.encode("UTF-8"))
                                link1b64 = link1b64.decode("UTF-8")
                                link2b64 = base64.b64encode(link2link.encode("UTF-8"))
                                link2b64 = link2b64.decode("UTF-8")
                                link3b64 = base64.b64encode(link3link.encode("UTF-8"))
                                link3b64 = link3b64.decode("UTF-8")
                                embed = discord.Embed(title = "Here are your top results:", colour = discord.Colour.from_rgb(4,132,188))
                                embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar.url)
                                embed.add_field(name = link1title, value = link1b64, inline = False)
                                embed.add_field(name = link2title, value = link2b64, inline = False)
                                embed.add_field(name = link3title, value = link3b64, inline = False)
                                embed.set_footer(text = "Only 3 results found. To convert do $convert.")
                                await ctx.send(embed = embed)
                                try:
                                    counts = doc.get()
                                    previouscount = counts.to_dict()
                                    newcount = previouscount['counts'] + 1
                                    doc.update({u'counts': newcount})
                                except:
                                    print('Adding count failed')
                            else:
                                await ctx.send(f'```No results found. Thats impossible. Your search was: {beforecontent}. Please make sure this was correct.```')
                        except:
                            await ctx.send('```Search failed. This is not normal. Please report this on github by running $project please.```')
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
