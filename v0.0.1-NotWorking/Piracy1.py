import discord
from discord.ext import commands

class cog(commands.Cog):

	def __init__(self, client):
		self.client = client


	@commands.command()
	async def piracy1(self, ctx):
		await ctx.send('Piracy options updated to direct links.')











def setup(client):
	client.add_cog(cog(client))