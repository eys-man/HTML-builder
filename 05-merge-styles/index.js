const fs = require("fs/promises");
const path = require("path");

const destBundleFile = path.join(__dirname, "project-dist/bundle.css");
const sourceFolderPath = path.join(__dirname, "styles");

async function bundleCSS(srcFolder, destFile) {
    let arr = [];
    const srcFiles = await fs.readdir( srcFolder, { withFileTypes: true } );

    for( let i=0; i < srcFiles.length; i++) {

        if (srcFiles[i].isFile() && path.extname(srcFiles[i].name) === ".css") {
            arr.push( await fs.readFile( path.join(srcFolder, srcFiles[i].name) ) );
        }

        arr.push("\n");
    }

    await fs.writeFile( destFile, arr) ;
};

bundleCSS(sourceFolderPath, destBundleFile);

