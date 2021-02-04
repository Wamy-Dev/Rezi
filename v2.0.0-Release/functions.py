import os,json,base64,time
cache={}
titlecache={}

def saveCache():
    #Saves the entire cache
    global cache,titlecache
    cacheTemp=json.dumps(cache)
    open("cache.json","w").write(cacheTemp)
    cacheTemp=json.dumps(titlecache)
    open("titlecache.json","w").write(cacheTemp)
def loadCache():
    #Loads the cache from cache.json
    global cache,titlecache
    try:
        cache=json.loads(open("cache.json","r").read())
        titlecache=json.loads(open("titlecache.json","r").read())
    except:
        if(os.path.isfile("cache.json")==False):
            open("cache.json","w").write('{}')
        if(os.path.isfile("titlecache.json")==False):
            open("titlecache.json","w").write('{}')
        print("Created new cache")
        loadCache()

loadCache()

def addToCache(platform, id, value):
    cache[platform+"$"+id]=value
    saveCache()

def getFromCache(platform, id):
    try:
        return cache[platform+"$"+id]
    except:
        #Key not yet present in dict
        return None

def isGamePresentInCache(platform,id):
    for i in cache:
        if(i==platform+"$"+id):
            return True
    return False
def getFromTitleCache(platform,id):
    try:
        return titlecache[platform+"$"+id]
    except:
        #Key not yet present in dict
        return None
def addToTitleCache(platform,id,value):
    titlecache[platform+"$"+id]=value
    saveCache()

def getB64(string):
    b64bytes = base64.b64encode(string)
    b64string = str(b64bytes, "utf-8")
    return b64string

def checkIfWebsiteLoaded(driver,searchTerm,tries=0):
    if(tries==5):
        return
    try:
        link = driver.find_element_by_partial_link_text(f'{searchTerm}')
    except:
        time.sleep(0.5)
        checkIfWebsiteLoaded(searchTerm,tries+1)

