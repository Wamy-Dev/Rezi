from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import asyncio
import time
from bs4 import BeautifulSoup
import pyshorteners
modules=[""]#inseart name of console(s) here
color=0x#colorcode of the embed
async def get(driver,searchTerm,moduleName):
    print("ran function")
    #start multiuser
    driver.get("https://github.com/Wamy-Dev/Rezi")
    driver.execute_script("window.open('');")
    driver.switch_to.window(driver.window_handles[1])
    time.sleep(2) 
   

    title="title"
    link="link"


    driver.close()
    driver.switch_to.window(driver.window_handles[0])
    time.sleep(2)#closes that tab, this is required 
    return ["Modulename that got called: "+moduleName,link];

    #If you need more help with this; 
    #look at other plugins, 
    #or ask for help in the discord, 
    #or you can make an issue at the Rezi Plugins Github.
    #PLEASE do not post plugin problems on the main Rezi Github! 

    #Sincerely, Wamy.
