const {stdout} = require('process');
const path = require('path');
const fs = require('fs');

let abs_path = path.join(__dirname, 'text.txt');   // абсолютный путь файла
let handler =  function(data) { stdout.write(data) };  // обработчик события 'data'
const input = fs.createReadStream( abs_path, 'utf-8' );
input.on('data', handler);
