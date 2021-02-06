import discord
import asyncio
import pyshorteners
from discord.ext import commands
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from pathlib import Path
import os
import json
import base64
import time
import os
from functions import *
import importlib
import pyyaml
#commands
client = commands.Bot(command_prefix="!")
client.remove_command('help')

#load extension
chrome_options = Options()
chrome_options.add_extension(os.path.abspath('extension_1_32_4_0.crx'))
plugins={}
#load driver
driver = webdriver.Chrome(options=chrome_options)
#load token
token = yaml.safe_load(open('token.yml'))

for file in os.listdir(os.getcwd()+r"\\plugins"):
    if file.endswith(".py"):
        print(os.path.join(os.getcwd()+r"\\plugins", file))
        tempPlug=importlib.import_module("plugins."+file.replace(".py",""))
        for i in tempPlug.modules:
            plugins[i] = tempPlug 
#bot loaded
@client.event
async def on_ready():
    print('Bot is ready.')#tells user, bot is ready
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="!help"))#sets status as "Watching:!help"

#easter egg
@client.command()
async def eggotyou(ctx):
    await ctx.send('Fine. You got me...')

#ping
@client.command()
async def ping(ctx):
    await ctx.send(f'Im not too slow... right? {round(client.latency * 1000)}ms')#Gets the ping from the server to the user.

#asks user what game they would like to grab
async def sendGameQuestion(ctx):
    q_embed = discord.Embed(title='What game would you like to grab?', color=0xFF0000)
    await ctx.send(embed=q_embed) 

#systems command
@client.command()
async def systems(ctx):
    q_embed = discord.Embed(title='Systems', color=0x8B4513)
    text=""
    buf=[]
    length=0
    for i in plugins:
        length+=len(i)
        if(length>256):
            buf.append(text)
            
            text=""
            length=len(i)
        text+=i+", "
    q_embed.add_field(name="Available Systems",value=buf[0][:-2])

    message = await ctx.send(embed=q_embed)  
    await message.add_reaction("⬅️")
    await message.add_reaction("➡️")
    i=0
    try:
        reactOld = None
        userOld = None
        while(True):
            reaction, user = await client.wait_for("reaction_add",timeout= 100)

            if(message.author.id!=user.id):
                if(reaction.message==message):
                    if(reaction.emoji=="➡️"):
                        if(i<len(buf)-1):
                            i+=1
                            embed = discord.Embed(title='Systems', color=0x8B4513)
                            embed.add_field(name="Available Systems",value=buf[i][:-2])
                            await message.edit(embed=embed)
                            await message.remove_reaction(reaction,user)
                            if(reactOld!=None):
                                await message.remove_reaction(reactOld,userOld)
                                reactOld = None
                                userOld = None
                        else:
                            reactOld=reaction
                            userOld=user
                    elif(reaction.emoji=="⬅️"):
                        if(i>0):
                            i-=1
                            embed = discord.Embed(title='Systems', color=0x8B4513)
                            embed.add_field(name="Available Systems",value=buf[i][:-2])
                            await message.edit(embed=embed)
                            await message.remove_reaction(reaction,user)
                            if(reactOld!=None):
                                await message.remove_reaction(reactOld,userOld)
                                reactOld = None
                                userOld = None
                        else:
                            reactOld=reaction
                            userOld=user
    except:
        await message.remove_reaction("➡️",client.user)
        await message.remove_reaction("⬅️",client.user)
        return
    

#help command
@client.command(pass_context = True, aliases = ['Help'])
async def help(ctx):
    author = ctx.message.author
    embed = discord.Embed(colour= discord.Colour.orange())
    embed.set_author(name = 'Help')
    embed.add_field(name = '!grab', value='Pick a console to get a download link from.', inline= False)
    embed.add_field(name = '!systems', value='Shows all available systems, this is affeted my the plugins you have installed.', inline= False)
    await ctx.send(author, embed=embed)

#grab command
@client.command(aliases = ['Grab','get','Get'])
async def grab(ctx):
    global cacheps,cachewii,cacheswitch#mentions caches to be used
    await ctx.send('`What console would you like me to grab?`')#asks user what console to grab
    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel and \
               msg.content.lower() in {k.lower(): v for k, v in plugins.items()}#console options
    try:
        msg = await client.wait_for("message", check=check, timeout=15)#allows user 15 seconds to respond
        for i in plugins:
            if(msg.content.lower()==i.lower()):
                print(i.lower())
                try:
                    color=plugins[i].color
                except:
                    color=0x0000FF
                q_embed = discord.Embed(title='What game would you like to grab?', color=  color )#asks user what game they would like to grab
                await ctx.send(embed=q_embed)
                try:
                    def checkd(msg):
                        return msg.author == ctx.author and msg.channel == ctx.channel
                    try:
                        game = await client.wait_for("message", check=checkd, timeout=15)#allows user 15 seconds to reply

                        if(isGamePresentInCache(i,game.content.lower())):    #checks if the game is in cache first
                            embed = discord.Embed(title = f'{getFromTitleCache(i,game.content.lower())}', description= f'`{getFromCache(i,game.content.lower())}`',color = color)#if it is found in cache it is sent
                            await ctx.send(embed=embed)#sent cached link
                            return
                        linkStr=await plugins[i].get(driver,game.content,i)
                        linkB64=getB64(linkStr[1].encode("utf-8"))#base 64 code
                        addToCache(i,game.content.lower(),linkB64)
                        addToTitleCache(i,game.content.lower(),linkStr[0])
                        embed = discord.Embed(title = f'{linkStr[0]}', description= f'`{linkB64}`',color = color)
                        await ctx.send(embed=embed)#sent cached link
                    except Exception as e:
                        print(e)
                        await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")#bot error:cannot find link
                except asyncio.TimeoutError:
                    await ctx.send("```css\nSorry, you didn't reply in time!```")#user error: did not respond within 15 seconds
        #starts Snes/Amiga module (please dont combine)
    except asyncio.TimeoutError:
        await ctx.send("Sorry, you didn't reply in time!")#user error: did not respond in 15 seconds
                    


client.run(token["token"])
