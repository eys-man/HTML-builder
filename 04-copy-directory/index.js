const fs = require("fs/promises");
const path = require("path");

const destFolderPath = path.join(__dirname, "files-copy");
const sourceFolderPath = path.join(__dirname, "files");

async function copyDirectory(folderSrc, folderDest) {

    await fs.mkdir(folderDest, { recursive: true });

    const srcFiles = await fs.readdir( folderSrc, { withFileTypes: true } );
    const destFiles = await fs.readdir( folderDest, { withFileTypes: true } );

    for( let i = 0; i < destFiles.length; i++) {

        try {
            await fs.rm( path.join(folderDest, destFiles[i].name), { recursive: true } );
        } catch( err ) {
            console.log(err);
        }
    }

    for( let i = 0; i < srcFiles.length; i++) {

        if( srcFiles[i].isDirectory() ) {
            await copyDirectory( path.join(folderSrc, srcFiles[i].name),
                                 path.join(folderDest, srcFiles[i].name) );
        } else if( srcFiles[i].isFile() ) {
            try {
                await fs.copyFile( path.join(folderSrc, srcFiles[i].name),
                                   path.join(folderDest, srcFiles[i].name) );
            } catch( err ) {
                console.log(err);
            }
        }
    }
};

copyDirectory(sourceFolderPath, destFolderPath);
