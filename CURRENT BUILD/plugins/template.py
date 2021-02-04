modules=["template","wtf","nice"]
async def get(driver,searchTerm,moduleName):
    print("ran function")
    title="title"
    link="link"
    return ["Modulename that got called: "+moduleName,link];