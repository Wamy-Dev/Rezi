
import asyncio
from bs4 import BeautifulSoup
modules=["switch"]
color=0xFF0000
async def get(driver,searchTerm,moduleName):
                    txt = searchTerm.replace(" ", "+")                         
                    url = f'https://nsw2u.com/?s={txt}'#if not found in cache it moves onto getting it from the site
                    driver.get(url)
                    await asyncio.sleep(1.9)
                
                    try:
                        link = driver.find_element_by_partial_link_text(f'{searchTerm}')
                    except:
                        try:
                            link = driver.find_element_by_partial_link_text(f'{searchTerm}'.lower().title())
                        except:
                            link = driver.find_element_by_partial_link_text(f'{searchTerm}'.upper())

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
                    title=str(bSoup.find("h1",{"class":"entry-title"})).replace('<h1 class="entry-title">',"").replace('</h1>',"")#gets title that was grabbed to be used
                    return [title,n_l[0]]