const fs = require('fs');

const deleteFile = async (path) => {
    return fs.unlink(path, (err) => {
        console.log(path)
        if (err) {
            console.log("File wasn't deleted");
        } else {
            console.log('File was deleted');
        }
    })
}

module.exports = {
    deleteFile
}