import discord
from discord.ext import commands

class cog(commands.Cog):

	def __init__(self, client):
		self.client = client


	@commands.command()
	async def pingtestbro(self, ctx):
		await ctx.send('Pong!')











def setup(client):
	client.add_cog(cog(client))