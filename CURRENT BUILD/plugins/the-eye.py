import asyncio
from bs4 import BeautifulSoup
modules=["SNES","Amiga","Atari 2600","Atari 5200","Atari 7800","Atari Jaguar","Atari Jaguar CD"]
color=0xFFFFFF
async def get(driver,searchTerm,moduleName):
   
        driver.get("https://the-eye.eu/public/rom/"+moduleName+"/")
        await asyncio.sleep(1)
        try:
            link = driver.find_element_by_partial_link_text(f'{searchTerm}')
        except:
            try:
                link = driver.find_element_by_partial_link_text(f'{searchTerm}'.title())
            except:
                link = driver.find_element_by_partial_link_text(f'{searchTerm}'.upper())
        name = link.text
      
        gameLink = link.get_attribute("href")

        return [name,gameLink];