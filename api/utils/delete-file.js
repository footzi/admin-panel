import fs from 'fs';

export default function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    })
}