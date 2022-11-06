const {stat, readdir, unlink, mkdir } = require("fs/promises");
const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;

const destFolderPath = path.join(__dirname, "files-copy");
const sourceFolderPath = path.join(__dirname, "files");

function copyFolder() {

    fs.stat( destFolderPath, err => { 
        if( !err) {  
            
            fs.readdir( destFolderPath, {withFileTypes: true}, (error, files) => {
                if( !error ) {
                    for( let i=0; i < files.length; i++) {

                        let filePath = path.join(destFolderPath, files[i].name);
                        fsPromises.unlink( filePath );
                    }
                }
            })
        };
        fs.mkdir( destFolderPath, { recursive: true }, () => {

            fs.readdir( sourceFolderPath, {withFileTypes: true}, (error, files) => {
                if( !error ) {
                    for( let i=0; i < files.length; i++) {

                        let filePath = path.join(sourceFolderPath, files[i].name);
                       
                        fsPromises.copyFile(filePath, path.join( destFolderPath, files[i].name ) );
                    }
                }

            })

        } )
        
    } );

}

copyFolder();
