import requests

url = "http://127.0.0.1:8000"

def testgetUsers():
    response = requests.get(url + "/")
    print(response.json())

def testAll():
    testgetUsers()