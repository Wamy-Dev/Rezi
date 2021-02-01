import discord
import asyncio
import pyshorteners
from discord.ext import commands
from selenium import webdriver
from bs4 import BeautifulSoup
import json
cachewii={}
cacheps={}
client = commands.Bot(command_prefix="!")
client.remove_command('help')
driver = webdriver.Chrome()

@client.event
async def on_ready():
    print('Bot is ready.')


@client.command(pass_context = True, aliases = ['Help'])
async def help(ctx):
    author = ctx.message.author

    embed = discord.Embed(colour= discord.Colour.orange())

    embed.set_author(name = 'Help')
    embed.add_field(name = '!grab', value='Pick a console to get a download link from. Options are:\nSwitch\nPlaystation\nXbox\nWii', inline= False)

    await ctx.send(author, embed=embed)
def saveCache():
    cache=json.dumps(cacheps)
    open("cacheps.json","w").write(cache)
    cache=json.dumps(cachewii)
    open("cachewii.json","w").write(cache)
def loadCache():
    global cacheps
    try:
        cacheps=json.loads(open("cacheps.json","r").read())
        cachewii=json.loads(open("cachewoo.json","r").read())
    except:
        open("cacheps.json","x")
        open("cachewii.json","x")
        print("Created new cache")
loadCache()

@client.command(aliases = ['Grab','get','Get'])
async def grab(ctx):
    global cacheps
    await ctx.send('`What console would you like me to grab?`')
    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel and \
               msg.content.lower() in ["switch", "wii", "playstation","xbox"]
    try:
        msg = await client.wait_for("message", check=check, timeout=15)  # 15 seconds to reply
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
        else:
            await ctx.send('Invalid choice - please try again!')

        if msg.content.lower() == "playstation":
            q_embed = discord.Embed(title='What game would you like to grab?', color=  0x0000FF )
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel

            try:
                game = await client.wait_for("message", check=checkd, timeout=15)  # 15 seconds to reply
                for i in cacheps:
                    print(i)
                    if(i==game.content):         

                        embed = discord.Embed(title = f'{game.content}', description= f'`{cacheps[i]}`',color = 0x0000FF)
                        await ctx.send(embed=embed)
                        return
                txt = game.content.replace(" ", "+")
                url = f'https://psndl.net/packages?filter=title&order=asc&search={txt}'
                driver.get(url)
                try:
                    link = driver.find_element_by_partial_link_text(f'{game.content}')
                    link.click()
                    await asyncio.sleep(3)

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
                    cacheps[game.content]=g_l[0]
                    saveCache()
                    embed = discord.Embed(title = f'{game.content}', description= f'`{ready_link}`',color = 0x0000FF)

                    await ctx.send(embed=embed)

                except Exception as e:
                    print(e)
                    await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")

            except asyncio.TimeoutError:
                await ctx.send("```css\nSorry, you didn't reply in time!```")

        if msg.content.lower() == 'switch':
            #Switch Download
            q_embed = discord.Embed(title='What game would you like to grab?', color=0xFF0000)
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel
            try:
                game = await client.wait_for("message", check=checkd, timeout=15)  # 15 seconds to reply
                txt = game.content.replace(" ", "+")
                url = f'https://nsw2u.com/?s={txt}'
                driver.get(url)
                await asyncio.sleep(1.9)
                try:
                    print('a')
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
                            #print(str(link.attrs['href']))
                    for i in games_list:
                        if 'https://ouo.io/' in i:
                            n_l.append(i)
                    embed = discord.Embed(title=f'{game.content}', description=f'`{n_l[0]}`',color=0xFF0000)

                    await ctx.send(embed=embed)

                    #await ctx.send(n_l[0])

                except Exception as e:
                    print(e)
                    await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")

            except asyncio.TimeoutError:
                await ctx.send("```css\nSorry, you didn't reply in time!```")

        if msg.content.lower() == "xbox":
            q_embed = discord.Embed(title='What game would you like to grab?', color=0x3FB02C)
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel

            try:
                game = await client.wait_for("message", check=checkd, timeout=15)  # 15 seconds to reply
                #txt = game.content.replace(" ", "+")
                url = f'https://1fichier.com/dir/l4nVnLVA'
                driver.get(url)

                await asyncio.sleep(1)
                try:
                    link = driver.find_element_by_partial_link_text(f'{game.content}')
                    name = link.text
                    #link.click()
                    await asyncio.sleep(1.9)

                    html = driver.page_source
                    bSoup = BeautifulSoup(html, 'html.parser')
                    links_list = bSoup.find('a', title = f'Download {name}')

                    embed = discord.Embed(title=f'{game.content}', description= f"`{links_list['href']}`", color=0x3FB02C)

                    await ctx.send(embed=embed)

                    #await ctx.send(links_list['href'])


                except Exception as e:
                    print(e)
                    await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")

            except asyncio.TimeoutError:
                await ctx.send("```css\nSorry, you didn't reply in time!```")



        if msg.content.lower() == 'wii':
            #WII Download

            q_embed = discord.Embed(title='What game would you like to grab?', color=0xFFFFFF)
            await ctx.send(embed=q_embed)

            def checkd(msg):
                return msg.author == ctx.author and msg.channel == ctx.channel
            try:
                game = await client.wait_for("message", check=checkd, timeout=15)  # 15 seconds to reply
                for i in cachewii:
                    print(i)
                    print(game.content)
                    if(i==game.content):
                        await ctx.send(cachewii[i])
                        return
                txt = game.content.replace(" ", "+")
                url = f'https://game-2u.com/?s={txt}'
                driver.get(url)

                await asyncio.sleep(1.9)
                try:
                    link = driver.find_element_by_partial_link_text(f'{game.content}')
                    link.click()
                    html = driver.page_source
                    bSoup = BeautifulSoup(html,'html.parser')
                    title = bSoup.find('h1', class_ = "entry-title").text
                    if 'Wii' in title:

                        links_list = bSoup.find_all('a')
                        games_list = []
                        n_l = []
                        for link in links_list:
                            if 'href' in link.attrs:
                                games_list.append(str(link.attrs['href']))
                                # print(str(link.attrs['href']))
                        for i in games_list:
                            if 'https://ouo.io/' in i:
                                n_l.append(i)
                        cachewii[game.content]=n_l[0]
                        embed = discord.Embed(title=f'{game.content}', description=f'`{n_l[0]}`',color=0xFFFFFF)

                        await ctx.send(embed=embed)

                    else:
                        try:
                            url = f'https://game-2u.com/?s={txt}+wii'
                            driver.get(url)
                            await asyncio.sleep(1.9)
                            link = driver.find_element_by_partial_link_text(f'{game.content}')
                            link.click()
                            html = driver.page_source
                            bSoup = BeautifulSoup(html, 'html.parser')

                            links_list = bSoup.find_all('a')
                            games_list = []
                            n_l = []
                            for link in links_list:
                                if 'href' in link.attrs:
                                    games_list.append(str(link.attrs['href']))
                                    # print(str(link.attrs['href']))
                            for i in games_list:
                                if 'https://ouo.io/' in i:
                                    n_l.append(i)

                            embed = discord.Embed(title=f'{game.content}', description=f'`{n_l[0]}`',color=0xFFFFFF)

                            await ctx.send(embed=embed)

                        except Exception as e:
                            await ctx.send('```css\nThis game is not for the wii!```')
                            #print(e)

                except:
                    try:
                        url = f'https://game-2u.com/?s={txt}+wii'
                        driver.get(url)
                        await asyncio.sleep(1.9)
                        link = driver.find_element_by_partial_link_text(f'{game.content}')
                        link.click()
                        html = driver.page_source
                        bSoup = BeautifulSoup(html, 'html.parser')

                        links_list = bSoup.find_all('a')
                        games_list = []
                        n_l = []
                        for link in links_list:
                            if 'href' in link.attrs:
                                games_list.append(str(link.attrs['href']))
                                # print(str(link.attrs['href']))
                        for i in games_list:
                            if 'https://ouo.io/' in i:
                                n_l.append(i)

                        embed = discord.Embed(title=f'{game.content}', description=f'`{n_l[0]}`',color=0xFFFFFF)

                        await ctx.send(embed=embed)


                    except Exception as e:
                        print(e)
                        await ctx.send(f"```css\nI could not find a download link for '{game.content}'\nRetry using a different game.```")

            except asyncio.TimeoutError:
                await ctx.send("Sorry, you didn't reply in time!")

    except asyncio.TimeoutError:
        await ctx.send("Sorry, you didn't reply in time!")



client.run('ODA1NTM5MTYyODU4MDYxOTA1.YBcWzg.Qs22nJRprKbAAXbudems8s_KdCc')