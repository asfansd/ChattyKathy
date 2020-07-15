// var async = require('asyncawait/async');
// var await = require('asyncawait/await');
var message;
var i = 1;

async function main() {
    while(i++<10){
        message = await sendMessage();
        await print(message);
    }
}

main();

function sendMessage(){
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise(resolve => rl.question("a: ", function(a) {
            rl.question("b: ", function(b) {
                // console.log(a+b);
                rl.close();
                resolve(a+b);
            })
        })
    )
}

function print(message){
    console.log(message);
}