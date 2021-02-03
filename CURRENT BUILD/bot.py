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

#commands
client = commands.Bot(command_prefix="!")
client.remove_command('help')

#load extension
chrome_options = Options()
chrome_options.add_extension(os.path.abspath('extension_1_32_4_0.crx'))

#load driver
driver = webdriver.Chrome(options=chrome_options)

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
	await ctx.send(f'Im not too slow... right? {round(client.latency * 1000)}ms')

#asks user what game they would like to grab
async def sendGameQuestion(ctx):
    q_embed = discord.Embed(title='What game would you like to grab?', color=0xFF0000)
    await ctx.send(embed=q_embed)   

#help command
@client.command(pass_context = True, aliases = ['Help'])
async def help(ctx):
    author = ctx.message.author
    embed = discord.Embed(colour= discord.Colour.orange())
    embed.set_author(name = 'Help')
    embed.add_field(name = '!grab', value='Pick a console to get a download link from. Options are:\nSwitch\nPlaystation\nXbox\nWii\nSnes\nAmiga', inline= False)
    await ctx.send(author, embed=embed)

#grab command
@client.command(aliases = ['Grab','get','Get'])
async def grab(ctx):
    global cacheps,cachewii,cacheswitch#mentions caches to be used
    await ctx.send('`What console would you like me to grab?`')#asks user what console to grab
    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel and \
               msg.content.lower() in ["switch", "wii", "playstation","xbox","snes","amiga"]#console options
    try:
        msg = await client.wait_for("message", check=check, timeout=15)#allows user 15 seconds to respond
        if msg.content.lower() == "switch":
            pass
            #await ctx.send("You said switch!")
        elif msg.content.lower() == "wii":
            pass
            #await ctx.send("You said wii!")
        elif msg.content.lower() == "playstation":
            pass
            #await ctx.send("You said playstation!")
        elif msg.content.lower() == "xbox":
            pass
            #await ctx.send("You said xbox!")
        elif msg.content.lower() in {"snes","amiga"}:
            pass
        else:
            await ctx.send('Invalid choice - please try again!')
        #starts playstation module
        if msg.content.lower() == "playstation":
            q_embed = discord.Embed(title='What game would you like to grab?', color=  0x0000FF )#asks user what game they would like to grab
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel

            try:
                game = await client.wait_for("message", check=checkd, timeout=15)#allows user 15 seconds to reply
                if(isGamePresentInCache("playstation",game.content.lower())):    #checks if the game is in cache first
                    embed = discord.Embed(title = f'{game.content}', description= f'`{getFromCache("playstation",game.content.lower())}`',color = 0x0000FF)#if it is found in cache it is sent
                    await ctx.send(embed=embed)#sent cached link
                    return
                #sets up multiuser
                actions = ActionChains(driver)
                actions.send_keys(Keys.LEFT_CONTROL + 't')
                actions.perform()
                txt = game.content.replace(" ", "+")#if it cannot find cached links it uses website
                url = f'https://psndl.net/packages?filter=title&order=asc&search={txt}'
                driver.get(url)
                
                try:
                   
                    try:
                        link = driver.find_element_by_partial_link_text(f'{game.content}')
                    except:
                        try:
                            link = driver.find_element_by_partial_link_text(f'{game.content}'.lower().title())
                        except:
                            link = driver.find_element_by_partial_link_text(f'{game.content}'.upper())
                    link.click()
                    await asyncio.sleep(4)
                    html = driver.page_source
                    bSoup = BeautifulSoup(html, 'html.parser')
                    links_list = bSoup.find_all('a')
                    game_list = []
                    g_l = []
                    for link in links_list:
                        if 'href' in link.attrs:
                            game_list.append(str(link.attrs['href']))
                            #print(str(link.attrs['href']))
                    for i in game_list:
                        if '/packages/' in i:
                            g_l.append(i)
                            #print(g_l)
                    driver.get(f'https://psndl.net{g_l[-1]}')
                    html = driver.page_source
                    bSoup = BeautifulSoup(html, 'html.parser')
                    links_list = bSoup.find_all('a')
                    game_list = []
                    g_l = []
                    for link in links_list:
                        if 'href' in link.attrs:
                            game_list.append(str(link.attrs['href']))
                            #print(str(link.attrs['href']))
                    for i in game_list:
                        if 'http://zeus.dl.playstation.net/cdn' in i:
                            g_l.append(i)
                    v = pyshorteners.Shortener()
                    ready_link = v.tinyurl.short(g_l[0])
                   	#enables base64
                    b64string = getB64(ready_link.encode("utf-8"))
                    addToCache("playstation",game.content.lower(),b64string)
                    embed = discord.Embed(title = f'{game.content}', description= f'`{b64string}`',color = 0x0000FF)
                    await ctx.send(embed=embed)
                    #closes tab and goes back to original
                    driver.close()
                    driver.switchTo().window(originalWindow);

                except Exception as e:
                    print(e)
                    await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")#bot error:cannot find link

            except asyncio.TimeoutError:
                await ctx.send("```css\nSorry, you didn't reply in time!```")#user error: did not respond within 15 seconds
        #starts Snes/Amiga module (please dont combine)
        if msg.content.lower() in {"snes","amiga"}:

            print("yo")
            await ctx.send("yo")
        #starts switch module
        if msg.content.lower() == 'switch':
            q_embed = discord.Embed(title='What game would you like to grab?', color=0xFF0000)#asks user what game they would like to grab
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel
            try:
                game = await client.wait_for("message", check=checkd, timeout=15)#allows user 15 seconds to reply
                txt = game.content.replace(" ", "+")
                if(isGamePresentInCache("switch",game.content.lower())):  #checks if game is in cache first
                    embed = discord.Embed(title = f'{getFromTitleCache("switch",game.content.lower())}', description= f'`{getFromCache("switch",game.content.lower())}`',color = 0xFF0000)#if it is found in cache it is sent
                    await ctx.send(embed=embed)
                    return
                        
                url = f'https://nsw2u.com/?s={txt}'#if not found in cache it moves onto getting it from the site
                driver.get(url)
                await asyncio.sleep(1.9)
                try:
                    try:
                        link = driver.find_element_by_partial_link_text(f'{game.content}')
                    except:
                        try:
                            link = driver.find_element_by_partial_link_text(f'{game.content}'.lower().title())
                        except:
                            link = driver.find_element_by_partial_link_text(f'{game.content}'.upper())

                    link.click()
                    html = driver.page_source
                    bSoup = BeautifulSoup(html,'html.parser')
                    links_list = bSoup.find_all('a')
                    games_list = []
                    n_l = []
                    for link in links_list:
                        if 'href' in link.attrs:
                            games_list.append(str(link.attrs['href']))
                            #print(str(link.attrs['href']))
                    for i in games_list:
                        if 'https://ouo.io/' in i:
                            n_l.append(i)
                    #enables base64
                    b64string=getB64(n_l[0].encode("utf-8"))
                    addToCache("switch",game.content.lower(),b64string)#adds base64 to cache
                    
                    title=str(bSoup.find("h1",{"class":"entry-title"})).replace('<h1 class="entry-title">',"").replace(' NSP XCI</h1>',"")#gets title that was grabbed to be used
                    addToTitleCache("switch",game.content.lower(),title)#adds title of game to title chache
                    embed = discord.Embed(title=f'{title}', description=f'`{b64string}`',color=0xFF0000)
                    await ctx.send(embed=embed)#sends message as embed from line 201

                except Exception as e:
                    print(e)
                    await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")#bot error: could not find link

            except asyncio.TimeoutError:
                await ctx.send("```css\nSorry, you didn't reply in time!```")#user error: did not respond within 15 seconds
        #starts xbox module
        if msg.content.lower() == "xbox":
            q_embed = discord.Embed(title='What game would you like to grab?', color=0x3FB02C)#asks user what game they would like to grab
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel

            try:
                game = await client.wait_for("message", check=checkd, timeout=15)  # 15 seconds to reply
                #txt = game.content.replace(" ", "+")
                url = f'https://1fichier.com/dir/l4nVnLVA'#link to be used
                driver.get(url)

                await asyncio.sleep(1)
                try:
                    if(isGamePresentInCache("xbox",game.content.lower())):  
                        embed = discord.Embed(title = f'{game.content}', description= f'`{getFromCache("xbox",game.content.lower())}`',color = 0x0000FF)
                        await ctx.send(embed=embed)
                        return
                        
                    try:
                        link = driver.find_element_by_partial_link_text(f'{game.content}')
                    except:
                        try:
                            link = driver.find_element_by_partial_link_text(f'{game.content}'.title())
                        except:
                            link = driver.find_element_by_partial_link_text(f'{game.content}'.upper())
                        
                    name = link.text
                    #link.click()
                    await asyncio.sleep(1.9)

                    html = driver.page_source
                    bSoup = BeautifulSoup(html, 'html.parser')
                    links_list = bSoup.find('a', title = f'Download {name}')
                	#enables base64
                    b64string = getB64(links_list['href'].encode("utf-8"))
                    addToCache("xbox",game.content.lower(),b64string)#adds finished product to cache
                    embed = discord.Embed(title=f'{game.content}', description= f"`{b64string}`", color=0x3FB02C)#sends finished embed
                    await ctx.send(embed=embed)#sends message as embed

                    #await ctx.send(links_list['href'])


                except Exception as e:
                    print(e)
                    await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")#bot error: could not find link

            except asyncio.TimeoutError:
                await ctx.send("```css\nSorry, you didn't reply in time!```")#user error: did not respond in 15 seconds


        #starts wii module
        if msg.content.lower() == 'wii':
					    #WII Download
					    q_embed = discord.Embed(title='What game would you like to grab?', color=0xFFFFFF)
					    await ctx.send(embed=q_embed)

					    def checkd(msg):
					        return msg.author == ctx.author and msg.channel == ctx.channel
					    try:
					        game = await client.wait_for("message", check=checkd, timeout=15)  # 15 seconds to reply
					        driver.get('https://roms-download.com/roms/nintendo-wii')

					        try:
					            await asyncio.sleep(2)
					            #b = driver.find_element_by_class_name('btn btn-h')
					            ac = ActionChains(driver)
					            ac.move_by_offset(5,5).click().perform()
					            await asyncio.sleep(2)
					            driver.find_element_by_class_name('form-control').send_keys(game.content)
					            await asyncio.sleep(2)
					            driver.find_element_by_id('searh_btn').click()
					            await asyncio.sleep(1)
					            link = driver.find_element_by_partial_link_text(f'{game.content}')
					            link.click()
					            html = driver.page_source
					            bSoup = BeautifulSoup(html,'html.parser')
					            links_list = bSoup.find_all('a')
					            games_list = []
					            n_l = []
					            for link in links_list:
					                if 'href' in link.attrs:
					                    games_list.append(str(link.attrs['href']))
					                            # print(str(link.attrs['href']))
					            for i in games_list:
					                if '/download/roms/nintendo-wii/' in i:
					                    n_l.append(i)

					            embed = discord.Embed(title=f'{game.content}', description=f'https://roms-download.com{n_l[0]}',color=0xFFFFFF)

					            await ctx.send(embed=embed)
					            #print(games_list)
					        except Exception as e:
					            print(e)
					            #ale = driver.switch_to_alert()
					            #ale.accept()






					    except asyncio.TimeoutError:
					        await ctx.send("Sorry, you didn't reply in time!")

    except asyncio.TimeoutError:
        await ctx.send("Sorry, you didn't reply in time!")#user error: did not respond in 15 seconds



client.run('Nzk2OTA5NzY4OTQwOTc4MTg2.X_eyDg.P1VoDeL_WHr7oMUiUucv0PQuFgc')#token to be entered