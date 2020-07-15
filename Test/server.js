var host = require('socket.engine').host;

var h = new host(addr='localhost', port=7070, maxSize=1500000, timeout=3);
h.start();

h.on("channel", (data) => {
	console.log(data.toString());
	h.write_ALL("channel", "Yo server here!");
});