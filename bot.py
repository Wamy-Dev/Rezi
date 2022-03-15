import discord
import asyncio
import meilisearch
from discord.ext import commands
import json
import decouple
from decouple import config


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
#easter egg
@client.command()
async def eggotyou(ctx):
    await ctx.send('Fine. You got me...')
#easter egg
@client.command()
async def project(ctx):
    await ctx.send('```https://github.com/Wamy-Dev/Rezi```')
#easter egg
@client.command()
async def website(ctx):
    await ctx.send('```https://rezi.one```')
@client.command()
async def donate(ctx):
    await ctx.send('```https://homeonacloud.com/pages/donate.html```')
#ping
@client.command()
async def ping(ctx):
    await ctx.send(f'```I`m not too slow... right? {round(client.latency * 1000)}ms```')
@client.command(pass_context = True, aliases = ['Help'])
async def help(ctx):
    embed = discord.Embed(title = "Here is a command list:", colour= discord.Colour.from_rgb(251,172,4))
    embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
    embed.add_field(name = '$grab', value='Pick a console to get a download link from.', inline = False)
    embed.add_field(name = '$ping', value='Shows the ping between the bot and the user.', inline = False)
    embed.add_field(name = '$project', value='View the project github', inline = False)
    embed.add_field(name = '$website', value='View the rezi website', inline = False)
    embed.add_field(name = '$donate', value='Donate to the project', inline = False)
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
    try:
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
        link1title,link1link,link2title,link2link,link3title,link3link,link4title,link4link = result.split(",")
        link1link = link1link.replace(" ", "")
        link2link = link2link.replace(" ", "")
        link3link = link3link.replace(" ", "")
        link4link = link4link.replace(" ", "")
        embed = discord.Embed(title = "Here are your top 4 results:", colour = discord.Colour.from_rgb(4,132,188))
        embed.set_author(name = ctx.message.author, icon_url = ctx.author.avatar_url)
        embed.add_field(name = link1title, value = 'https://' + link1link, inline = False)
        embed.add_field(name = link2title, value = 'https://' + link2link, inline = False)
        embed.add_field(name = link3title, value = 'https://' + link3link, inline = False)
        embed.add_field(name = link4title, value = 'https://' + link4link, inline = False)
        embed.set_footer(text = "To get more results please go to https://rezi.one")
        await ctx.send(embed = embed)
        try: 
            previouscount['times'] += 1
            with open('counts.json', 'w+') as file:
                json.dump(previouscount, file)
        except: 
            print('count failed')
    except:
        try:
            await ctx.send('Here are the top 4 results:' + '```' + result + '```' + 'This is not normal. Please report this on github by running $project please.') 
            previouscount['times'] += 1
            with open('counts.json', 'w+') as file:
                json.dump(previouscount, file)
        except:
            await ctx.send('```Search failed. This is not normal. Please report this on github by running $project please.```')
client.run(CLIENTTOKEN)