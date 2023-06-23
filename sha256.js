const crypto = require('crypto');
const fs = require('fs');
const path = require('path')

function getFileSha256(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            resolve(hash.digest('hex'));
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
}

getFileSha256(path.join(__dirname, "public", "updatepackages", "docker-compose.yml"))
    .then(console.log)
    .catch(console.error);