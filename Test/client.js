var client = require("socket.engine").client;
function msleep(n) {
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
	msleep(n*1000);
}

var c = new client(addr='localhost', port=7070);
c.start();

c.write("channel", "Hello there!");

//sleep(4);

c.on("channel", (data) => {
  console.log(data);
});