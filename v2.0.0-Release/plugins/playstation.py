from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import asyncio
import time
from bs4 import BeautifulSoup
import pyshorteners
modules=["playstation"]
color= 0x0000FF
async def get(driver,searchTerm,moduleName):
                    actions = ActionChains(driver)
                    #start multiuser
                    driver.get("https://github.com/Wamy-Dev/Rezi")
                    driver.execute_script("window.open('');")
                    driver.switch_to.window(driver.window_handles[1])
                    time.sleep(2)
                    actions.perform()
                    txt = searchTerm.replace(" ", "+")#if it cannot find cached links it uses website
                    url = f'https://psndl.net/packages?filter=title&order=asc&search={txt}'
                    driver.get(url)
                    time.sleep(2)
                   
                    try:
                        link = driver.find_element_by_partial_link_text(f'{searchTerm}')
                    except:
                        try:
                            link = driver.find_element_by_partial_link_text(f'{searchTerm}'.lower().title())
                        except:
                            link = driver.find_element_by_partial_link_text(f'{searchTerm}'.upper())
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
                    title=str(bSoup.find("h4")).replace("<h4>","").replace("</h4>","")



                    driver.close()
                    driver.switch_to.window(driver.window_handles[0])
                    time.sleep(2)
 
                    return [title,ready_link];