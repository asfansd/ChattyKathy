var net = require('net');
var send_Message, read_Message, send_Status;
var server = net.createServer(async function(socket) {
    console.log("\n***************\nServer Started!\n***************")
    //try{
        while(1){
            // Read message from Client
            var receiveMessage = function() {
                return new Promise(resolve => socket.on('data', data => {
                    resolve(data);
                }))
            }
            read_Message = await receiveMessage();

            if(read_Message.toString() === 'KillTheClient') {
                console.log('\n********************\nClient Disconnected!\n********************\n')
                break;
            }

            await print('\nClient: '+read_Message);

            //Prompt for server message
            send_Message = await serverMessage();

            var writeMessage = function(){
                return new Promise(resolve => socket.write(send_Message, send_Message => {
                    resolve(send_Message);
                }))
            }
            send_Status = await writeMessage();
        }
    //}
    //catch (error) {
    //     console.log(error.response.body);
    // }
});

function serverMessage(){
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question("\nServer: ", message => {
        rl.close();
        resolve(message);
    }))
}

function print(message){
  console.log(message);
}

function transcription(message){
    var c = new client(addr='localhost', port=7070);
    var transcripted_message;
    c.start();
    
    c.write("channel", message.toString());
    
    c.on("channel", (data) => {
        transcripted_message = data.toString();
    });

    return(transcripted_message);
}

//Change the IP accordingly
server.listen(9090, '192.168.0.199');