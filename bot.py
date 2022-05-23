import discord
import asyncio
import meilisearch
from discord.ext import commands
import json
import decouple
from decouple import config
import base64
SEARCHCLIENT = config('SEARCHCLIENT')
SEARCHAPIKEY = config('SEARCHAPIKEY')
CLIENTTOKEN = config('CLIENTTOKEN')
f = open('counts.json')
previouscount = json.load(f)
searcher = meilisearch.Client(SEARCHCLIENT, SEARCHAPIKEY)
client = commands.Bot(command_prefix = '$')
client.remove_command('help')
@client.event
async def on_ready():
    print('Bot is ready.')
    await client.change_presence(activity = discord.Activity(type = discord.ActivityType.watching, name = "$help"))#sets status as "Watching:!help"
@client.command()
async def eggotyou(ctx):
    await ctx.send('Fine. You got me... screenshot this and send it to me on my discord to have your name put in the source code!', delete_after=5)
    await ctx.message.delete()
@client.command()
async def project(ctx):
    await ctx.send('```https://github.com/Wamy-Dev/Rezi```')
@client.command()
async def convert(ctx):
    await ctx.send('```https://www.base64decode.org/```')
@client.command()
async def website(ctx):
    await ctx.send('```https://rezi.one```')
@client.command()
async def donate(ctx):
    await ctx.send('```https://homeonacloud.com/donate```')
@client.command()
async def ping(ctx):
    await ctx.send(f'```I`m not too slow... right? {round(client.latency * 1000)}ms```')
@client.command()
async def counts(ctx):
    await ctx.send(f'```The bot has grabbed {previouscount["times"]} times.```')
@client.command(pass_context = True, aliases = ['Help'])
async def help(ctx):
    embed = discord.Embed(title = "Here is a command list:", colour= discord.Colour.from_rgb(251,172,4))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
    embed.add_field(name = '$grab', value='Pick a console to get a download link from.', inline = False)
    embed.add_field(name = '$ping', value='Shows the ping between the bot and the user.', inline = False)
    embed.add_field(name = '$project', value='View the project github.', inline = False)
    embed.add_field(name = '$website', value='View the rezi website.', inline = False)
    embed.add_field(name = '$donate', value='Donate to the project.', inline = False)
    embed.add_field(name = '$convert', value='Convert your link so you can use it.', inline = False)
    embed.add_field(name = '$counts', value='See how many times the bot has grabbed globally.', inline = False)
    await ctx.send(embed = embed)
@client.command(aliases = ['Grab', 'GRAB', 'get', 'GET', 'search', 'SEARCH'])
async def grab(ctx):
    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel
    embed = discord.Embed(title = "Search for any game imaginable:", colour = discord.Colour.from_rgb(251,172,4))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
    embed.set_footer(text = "Respond within 15 seconds. If you like this project please donate using $donate")
    await ctx.send(embed = embed)    
    message = await client.wait_for("message", check = check, timeout = 15)
    content = message.content
    searchresult = searcher.index('games').search(content, {
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
            embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
            embed.add_field(name = link1title, value = link1b64, inline = False)
            embed.add_field(name = link2title, value = link2b64, inline = False)
            embed.add_field(name = link3title, value = link3b64, inline = False)
            embed.add_field(name = link4title, value = link4b64, inline = False)
            embed.set_footer(text = "To get more results please go to https://rezi.one. To convert do $convert.")
            await ctx.send(embed = embed)
            try: 
                previouscount['times'] += 1
                with open('counts.json', 'w+') as file:
                    json.dump(previouscount, file)
            except: 
                print('count failed')
        except:
            try:
                if result:
                    link1title,link1link = result.split(",")
                    link1link = link1link.replace(" ", "")
                    link1b64 = base64.b64encode(link1link.encode("UTF-8"))
                    link1b64 = link1b64.decode("UTF-8")
                    embed = discord.Embed(title = "Here is your top result:", colour = discord.Colour.from_rgb(4,132,188))
                    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
                    embed.add_field(name = link1title, value = link1b64, inline = False)
                    embed.set_footer(text = "Only 1 result found. To convert do $convert.")
                    await ctx.send(embed = embed)
                    try:
                        previouscount['times'] += 1
                        with open('counts.json', 'w+') as file:
                            json.dump(previouscount, file)
                    except:
                        print('count failed')
                else:
                    await ctx.send(f'```No results found. Thats impossible. Your search was: {content}. Please make sure this was correct.```')
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
                        embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
                        embed.add_field(name = link1title, value = link1b64, inline = False)
                        embed.add_field(name = link2title, value = link2b64, inline = False)
                        embed.set_footer(text = "Only 2 results found. To convert do $convert.")
                        await ctx.send(embed = embed)
                        try:
                            previouscount['times'] += 1
                            with open('counts.json', 'w+') as file:
                                json.dump(previouscount, file)
                        except:
                            print('count failed')
                    else:
                        await ctx.send(f'```No results found. Thats impossible. Your search was: {content}. Please make sure this was correct.```')
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
                            embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
                            embed.add_field(name = link1title, value = link1b64, inline = False)
                            embed.add_field(name = link2title, value = link2b64, inline = False)
                            embed.add_field(name = link3title, value = link3b64, inline = False)
                            embed.set_footer(text = "Only 3 results found. To convert do $convert.")
                            await ctx.send(embed = embed)
                            try:
                                previouscount['times'] += 1
                                with open('counts.json', 'w+') as file:
                                    json.dump(previouscount, file)
                            except:
                                print('count failed')
                        else:
                            await ctx.send(f'```No results found. Thats impossible. Your search was: {content}. Please make sure this was correct.```')
                    except:
                        await ctx.send('```Search failed. This is not normal. Please report this on github by running $project please.```')
client.run(CLIENTTOKEN)
