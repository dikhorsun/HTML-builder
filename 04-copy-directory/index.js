const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files-copy');

fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) throw err;
})

function copyDir(){
  fs.readdir(dirPath, (err, filesDel) => {
    filesDel.forEach(file => {
      fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
        if(err) throw err;
      })
    })
  })

  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
        if(err) throw err;
        console.log('The file has been copied!');
      })
    })
  })
}
copyDir();