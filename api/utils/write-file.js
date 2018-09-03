import fs from 'fs';
import path from 'path';
import randomstring from 'randomstring';

export default function writeFile(file, folder) {
    return new Promise ((resolve, reject) => {
        const fileName = randomstring.generate(10) + path.extname(file.name);
        const pathFile = 'uploads/' + folder + '/' + fileName;
    
        fs.writeFile(pathFile, file.data, (err)=> {
            if (err) {
                reject(err)
            } else {
                resolve(pathFile)
            }
        });
    })
}