import asyncio
import time
from bs4 import BeautifulSoup
modules=["SNES","Amiga","Atari 2600","Atari 5200","Atari 7800","Atari Jaguar","Atari Jaguar CD","Atari Lynx","Atari ST","AtomisWave","Bandai Apple Pippin","Bandai Playdia","Bandai Wonderswan","Bandai Wonderswan Color","Casio PB-1000","Coleco ColecoVision","Commodore 64","Commodore VIC-20","Emerson Arcadia 2001","Entex Adventure Vision","Epoch Super Cassette Vision","Fairchild Channel F","Funtech Super Acan","GCE Vectrex","Hartung Game Master","HiVE","Leapfrog Leapster Learning Game System","Magnavox Odyssey2","Memorex VIS","Microsoft MSX","Microsoft MSX 2","NEC PC Engine TurboGrafx 16","NEC Super Grafx","NES","Nintendo 64","Nintendo Gameboy","Nintendo Gameboy Advance","Nintendo Gameboy Color","Nintendo Virtual Boy","Nokia N-Gage","Panasonic 3DO","Philips CDi","Phillips Videopac G7000","SNES","SNK Neo Geo","SNK Neo Geo CD","SNK Neo Geo Pocket","SNK Neo Geo Pocket Color","Sega 32X","Sega Dreamcast","Sega Genesis","Sega Genesis Mini","Sega Master System","Sega Model 2","Sega Model 3","Sega Naomi","Sega SG-1000","Sega Triforce","Sharp X1","Sharp x68000","Sinclair ZX Spectrum","Tiger Telematics Gizmondo","Watara - Supervision"]
color=0xFFFFFF
async def get(driver,searchTerm,moduleName):
        #start multiuser
        driver.get("https://github.com/Wamy-Dev/Rezi")
        driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[1])
        time.sleep(2) 
   
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
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
        time.sleep(2)

        return [name,gameLink];
