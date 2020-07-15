from socketengine import host
import time

def transcript(message):
	#AI code here:
	
	
	answer = 'Transcripted answer'
	
	return(answer)

deliverable = ""

h = host(addr='localhost', port=7070, timeout=3, size=256, open=True)
h.start()

time.sleep(0.6)

# while True:
data = h.get_ALL("channel")
		
if data is not None:
	for item in data:
		# print(h.)
		deliverable = transcript(item)
		break
else:
	print("No data")
	# break

# time.sleep(1)
h.write_ALL("channel", deliverable)
# h.write_ALL("channel", "Server is here")

h.close()