const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const dirPath = path.join(__dirname, 'secret-folder');
fsPromises.readdir( dirPath, {withFileTypes: true} ).then( res => { 

    for( let i=0; i < res.length; i++)     {

        let filePath = path.join(dirPath, res[i].name);
        fsPromises.stat( filePath ).then( file => {

            if( file.isFile() )
                console.log( path.basename(filePath).replace( path.extname(filePath), "")
                + " - " + path.extname(filePath).replace(".", "")
                + " - " + file.size + " Bytes");

        } );

    }
    
} );
