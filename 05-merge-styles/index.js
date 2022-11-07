const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if(err) throw err;

  
  files.forEach(file => {
    const pathStileFile = path.join(__dirname, 'styles', file.name);
    if(file.isFile() && path.extname(pathStileFile) === '.css') {
      const input = fs.createReadStream(pathStileFile, 'utf-8');
      let resultStileArr = '';
      input.on('data', (data) => {
        resultStileArr += data;
      });
      
      input.on('end', () => {
        output.write(`${resultStileArr}\n`)
      })
      
    }
  })

})



