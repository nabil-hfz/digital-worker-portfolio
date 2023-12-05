const fs = require('fs');
const path = require('path');

function deleteFileFromUploads(filename) {
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filename}`, err);
        } else {
            console.log(`Successfully deleted file: ${filename}`);

        }
    });
}
