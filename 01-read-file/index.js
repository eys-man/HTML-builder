const {stdout} = require('process');
const path = require('path');
const fs = require('fs');

let pathToFile = path.join(__dirname, 'text.txt');
let handler = function(data) { stdout.write(data) };
const inputStream = fs.createReadStream( pathToFile );
inputStream.on('data', handler);
