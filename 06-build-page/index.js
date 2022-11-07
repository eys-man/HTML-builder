const fs = require("fs/promises");
const path = require("path");

const projectDestFolder = path.join(__dirname, "project-dist");
const templateFile = path.join(__dirname, "template.html");
const destIndexFolder = path.join(projectDestFolder, "index.html");
const srcComponentsFolder = path.join(__dirname, "components");
const destCSSFile = path.join(projectDestFolder, "style.css");
const srcCSSFolder = path.join(__dirname, "styles");
const srcAssets = path.join(__dirname, "assets");
const destAssets = path.join(projectDestFolder, "assets");

async function buildHTML( srcFile, srcFolder, destFolder ) {
    let template = await fs.readFile( srcFile, "utf-8" );
  
    const files = await fs.readdir( srcFolder, { withFileTypes: true } );

    for( let i=0; i < files.length; i++) {
         
        const extName = path.extname(files[i].name);
        const baseName = path.basename(files[i].name, extName);

        if( files[i].isFile() && extName === ".html" ) {
            
            const filePath = path.join(srcFolder, files[i].name);
            const fileData = await fs.readFile(filePath, "utf-8"); // массив прочитанного текста из html

            let tagWrapper = "{{" + baseName +"}}";

            template = template.replace(tagWrapper, fileData);
        }
    }

    await fs.writeFile( destFolder, template );
};

async function bundleCSS(srcFolder, destBundleFile) {
    let arr = [];
    const srcFiles = await fs.readdir( srcFolder, { withFileTypes: true } );

    for( let i=0; i < srcFiles.length; i++) {

        if (srcFiles[i].isFile() && path.extname(srcFiles[i].name) === ".css") {
            arr.push( await fs.readFile( path.join(srcFolder, srcFiles[i].name) ) );
        }

        arr.push("\n");
    }

    await fs.writeFile( destBundleFile, arr) ;
};

async function copyFolder(folderSrc, folderDest) {

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
            await copyFolder( path.join(folderSrc, srcFiles[i].name),
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

async function buildPage() {
    try {
        await fs.mkdir(projectDestFolder, { recursive: true });
    } catch( err ) {
        console.log(err);
    }

    await bundleCSS(srcCSSFolder, destCSSFile);
    await buildHTML(templateFile, srcComponentsFolder, destIndexFolder);
    await copyFolder(srcAssets, destAssets);
};

buildPage();