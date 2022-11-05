const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const dir_path = path.join(__dirname, 'secret-folder');
fsPromises.readdir( dir_path, {withFileTypes: true} ).then( res => { 

    for( let i=0; i < res.length; i++)
    {
        // получить информацию о файле в stats по полному пути
        let file_path = path.join(dir_path, res[i].name);
        fsPromises.stat( file_path ).then( file => {

            if( file.isFile() )
                console.log( path.basename(file_path).replace( path.extname(file_path), "")
                + " - " + path.extname(file_path).replace(".", "")
                + " - " + file.size + " Bytes");

        } );

    }
    
} );
