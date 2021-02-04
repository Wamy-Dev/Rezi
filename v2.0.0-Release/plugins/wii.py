from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import asyncio
from bs4 import BeautifulSoup
import pyshorteners
modules=["wii"]
color=0xFFFFFA
async def get(driver,searchTerm,moduleName):
                        #start multiuser
                        driver.get("https://github.com/Wamy-Dev/Rezi")
                        driver.execute_script("window.open('');")
                        driver.switch_to.window(driver.window_handles[1])
                        time.sleep(2) 
                        driver.get('https://roms-download.com/roms/nintendo-wii')

                  
                        await asyncio.sleep(2)
                                #b = driver.find_element_by_class_name('btn btn-h')
                        ac = ActionChains(driver)
                        ac.move_by_offset(5,5).click().perform()
                        await asyncio.sleep(1)
                        driver.find_element_by_class_name('form-control').send_keys(searchTerm)
                        await asyncio.sleep(1)
                        driver.find_element_by_id('searh_btn').click()
                        await asyncio.sleep(1)
                        link = driver.find_element_by_partial_link_text(f'{searchTerm.title()}')
                        link.click()
                        html = driver.page_source
                        bSoup = BeautifulSoup(html,'html.parser')
                        links_list = bSoup.find_all('a')
                        games_list = []
                        n_l = []
                        for link in links_list:
                            if 'href' in link.attrs:
                                games_list.append(str(link.attrs['href']))
                                
                                                # print(str(link.attrs['href']))
                        for i in games_list:
                            if '/download/roms/nintendo-wii/' in i:
                                n_l.append(i)
                        #ends multiuser
                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                        time.sleep(2)
                        return [searchTerm,f"https://roms-download.com{n_l[0]}"]
                        