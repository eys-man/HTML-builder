const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const { readdir } = require('fs/promises');

const outputPath = path.join(__dirname, "project-dist/bundle.css");
const sourceFolderPath = path.join(__dirname, "styles");

const output = fs.createWriteStream( outputPath );

async function bundleCSS() {
    const files = await readdir(sourceFolderPath, {withFileTypes: true});

    for( let i=0; i < files.length; i++) {

        const filePath = path.join(sourceFolderPath, files[i].name);
        const ext = path.extname(filePath);

        if( ext === ".css") {

            const inputPath = path.join(sourceFolderPath, files[i].name)
            const input = fs.createReadStream(inputPath);

            input.on("data", data => {
                output.write(data.toString() + "\n");
            });

        };
    }
}

bundleCSS();
