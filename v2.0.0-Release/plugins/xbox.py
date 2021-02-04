
import asyncio
from bs4 import BeautifulSoup
import pyshorteners
modules=["xbox"]
color=0x3FB02C
async def get(driver,searchTerm,moduleName):
                    #start multiuser
                    driver.get("https://github.com/Wamy-Dev/Rezi")
                    driver.execute_script("window.open('');")
                    driver.switch_to.window(driver.window_handles[1])
                    time.sleep(2)      
                    url = f'https://1fichier.com/dir/l4nVnLVA?lg=en'#link to be used
                    driver.get(url)
                    try:
                        link = driver.find_element_by_partial_link_text(f'{searchTerm}')
                    except:
                        try:
                            link = driver.find_element_by_partial_link_text(f'{searchTerm}'.title())
                        except:
                            link = driver.find_element_by_partial_link_text(f'{searchTerm}'.upper())
                    name = link.text
                    await asyncio.sleep(1.9)
                    html = driver.page_source
                    bSoup = BeautifulSoup(html, 'html.parser')
                    links_list = bSoup.find('a', title =  f'Download {name}')
                    title=links_list["title"].replace("Download ","").replace(".iso","")
                    #ends multiuser
                    driver.close()
                    driver.switch_to.window(driver.window_handles[0])
                    time.sleep(2) 
                    return [title,links_list["href"]]