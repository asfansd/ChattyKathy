from socketengine import client
import time

c = client(addr='localhost', port=7070, timeout=3, size=256, open=True)
c.start()

c.write("channel", "Client is connected!")

time.sleep(2)

data = c.get("channel")
if data is not None:
	print(data)
	
c.close()