import requests
import time

earth = {'name': 'Earth', 'diameter' : 123123}
jupiter = {'name': 'Jupiter', 'diameter' : 34564}
saturn = {'name': 'Saturn', 'diameter' : 234234}
mars = {'name': 'Mars', 'diameter' : 645634}
venus = {'name': 'Venus', 'diameter' : 234234}


tmpTime = time.time()
x = requests.post('http://front-end:80/planets', params=earth)
x = requests.post('http://front-end:80/planets', params=jupiter)
x = requests.post('http://front-end:80/planets', params=mars)
x = requests.post('http://front-end:80/planets', params=saturn)
x = requests.post('http://front-end:80/planets', params=venus)
print(str((time.time() - tmpTime)/5) + "s per post requests")

while True:
    
    tmpTime = time.time()
    for i in range(0, 100):
        requests.get('http://front-end:80/planets?name=Earth')
    print(str((time.time() - tmpTime)/100) + "s per get requests")


    tmpTime = time.time()
    for i in range(0, 100):
        requests.get('http://front-end:80/pi')
    print(str((time.time() - tmpTime)/100) + "s per PI computation request")

    tmpTime = time.time()
    for i in range(0, 100):
        x = requests.get('http://front-end:80/home')
    print(str((time.time() - tmpTime)/100) + "s per home page requests")
    print(x.content)


    time.sleep(1)