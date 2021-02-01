import discord
import os
from discord.ext import commands
from dotenv import load_dotenv
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
client = commands.Bot(command_prefix = '!')
#helpme
bot = client
bot.remove_command('help')
@bot.command()
async def help(ctx):

@client.event
async def on_message(message):
    if message.content == "!help":
    embed = discord.Embed(title="Here's some help for you kid", description="This bot was made by Wamy#0001. This page is your help guide.")
    embed.add_field(name="!grab", value="Begins the rom grabbing process.")
    embed.add_field(name="!ping", value="Gets the latency of the bot.")
    embed.add_field(name="!help", value="To bring up this menu.")
    embed.add_field(name="*secret*", value="Shows the super secret easter egg.")
    await message.channel.send(content=None, embed=embed)
    
#logged in
	@client.event
	async def on_ready():
		print('The scraper of bots is here!')

#easter egg
@client.command()
async def eggotyou(ctx):
	await ctx.send('Fine. You got me...')
#ping
@client.command()
async def ping(ctx):
	await ctx.send(f'Im not too slow... right? {round(client.latency * 1000)}ms')
#piracy options
@client.command()
async def loadcog1(ctx, *, extension):
	client.load_extension(f'cogs.{extension}')
	await ctx.send('Loaded cog 1.')
@client.command()
async def unloadcog1(ctx, *, extension):
	client.unload_extension(f'cogs.{extension}')
	await ctx.send('Unloaded cog 1.')

@client.command()
async def piracy1load(ctx, *, extension):
	client.load_extension(f'cogs.{extension}')#links
	await ctx.send('piracy option 1 loaded.')
@client.command()
async def piracy1unload(ctx, *, extension):
	client.unload_extension(f'cogs.{extension}')
	await ctx.send('piracy option 1 unloaded.')

@client.command()
async def piracy2load(ctx, *, extension):
	client.load_extension(f'cogs.{extension}')#base64
	await ctx.send('piracy option 2 loaded.')
@client.command()
async def piracy2unload(ctx, *, extension):
	client.unload_extension(f'cogs.{extension}')
	await ctx.send('piracy option 2 unloaded.')

@client.command()
async def piracy3load(ctx, *, extension):
	client.load_extension(f'cogs.{extension}')#official
	await ctx.send('piracy option 3 loaded.')
@client.command()
async def piracy3unload(ctx, *, extension):
	client.unload_extension(f'cogs.{extension}')
	await ctx.send('piracy option 2 unloaded.')

for filename in os.listdir('S:\Discord-Bot\RomScraperBot\REWORKED\cogs'):#change to where cogs are located.
	if filename.endswith('.py'):
		client.load_extension(f'cogs.{filename[:-3]}')



client.run(TOKEN)