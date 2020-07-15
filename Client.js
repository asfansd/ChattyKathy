var net = require('net');
var client = new net.Socket();
var send_Message, read_Message;

function main() {
    try{
        client.connect(9090, '192.168.0.199',async function() {
            console.log('\n********************\nConnected to server!\n********************');
            
            while(1){
            
                send_Message = await clientMessage(); //Prompt for Client message
                //await print(send_Message);
                if(send_Message === 'BoD' || send_Message === 'PromptTimeout'){
                    send_Message = 'KillTheClient';
                    var writeMessageBuffer = function(){
                        return new Promise(resolve => client.write(send_Message, send_Message => {
                            resolve(send_Message);
                        }))
                    }
                    await writeMessageBuffer();
                    break;
                }

                var writeMessageBuffer = function(){
                    return new Promise(resolve => client.write(send_Message, send_Message => {
                        resolve(send_Message);
                    }))
                }

                await writeMessageBuffer();

                //Read Server message
                var readMessage = function(){
                    return new Promise(resolve => client.on('data', data => {
                        data = '\nServer: '+data;
                        resolve(data);
                    }))
                }
                read_Message = await readMessage();
                await print(read_Message);

            }

            client.destroy();
        })

    }
    catch(error){
        console.log(error.response.body);
    }
}

main();

function clientMessage(){
    const readline = require("readline");
    const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
    });
    
    //if(){
        return new Promise(resolve => rl.question("\nClient: ", message => {
            // setTimeout(() => { message = 'PromptTimeout' }, 9000)
            
            rl.close();
            resolve(message);
        }))
    //}
}

function print(message){
    console.log(message);
}