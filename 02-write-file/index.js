const fs = require('fs');
const path = require('path');
const {stdout, stdin, exit} = require('process');
const output = fs.createWriteStream( path.join(__dirname, 'test.txt') );

stdout.write('Hi. Enter some text:\n');

function goodBuy() {
    stdout.write('Good Buy!');
    exit();
}

function handler(data) {
    if( data.toString().trim() === 'exit' ) 
        goodBuy();
        
    output.write(data);
};

stdin.on('data', handler);
process.on('SIGINT', goodBuy);
