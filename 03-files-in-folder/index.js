const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
fsPromises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}).then(items => {
  items.forEach(item => {
    if(!item.isDirectory()){
      const pathToFile = path.join(__dirname, 'secret-folder', item.name);
      const fileName = item.name.split('.').shift();
      const extension = item.name.split('.').pop();
      fsPromises.stat(pathToFile).then(stats => {
        console.log(`${fileName} - ${extension} - ${stats.size} b `)
      })
    }
  })
})
