const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const dirDistAssetsPath = path.join(__dirname, 'project-dist', 'assets');
const dirAssetsPath = path.join(__dirname, 'assets');


const writeStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));


fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) throw err;
  console.log('folder project-dist created!')
});

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
        writeStyle.write(`${resultStileArr}\n`)
      })
      
    }
  })
  console.log('style.css created!')
});




fsPromises.rm(dirDistAssetsPath, { recursive: true, force: true }, (err) => {
  if(err) throw err;
}).then(copy);



function copy(){
  fs.mkdir(dirDistAssetsPath, { recursive: true }, (err) => {
    if (err) throw err;
  })

  function copyDirFile(dir, dirCopy){
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if(file.isDirectory()){
          const newDir = path.join(dir, file.name);
          const newDirCopy = path.join(dirCopy, file.name);
          fs.mkdir(newDirCopy, {recursive: true}, (err) => {
            if(err) throw err;
          })
          copyDirFile(newDir, newDirCopy)
        } else if(file.isFile()){
          fs.copyFile(path.join(dir, file.name), path.join(dirCopy, file.name), (err) => {
            if(err) throw err;
            console.log('The file has been copied!');
          })
        }

      })
    })
  }

  copyDirFile(dirAssetsPath, dirDistAssetsPath)
  }

  // const dirCompPath = path.join(__dirname, 'components');
  // const htmlPath = path.join(__dirname, 'template.html');
  // const htmlCopyPath = path.join(__dirname, 'project-dist', 'index.html');

  // const inputHtml = fs.createReadStream(htmlPath, 'utf-8');
  // // const outputHtml = fs.createWriteStream(htmlCopyPath);
  // const componentsArr = fs.readdir(dirCompPath, {withFileTypes: true}, (err, files){

  // });

  // let htmlInner = inputHtml.toString();



  // console.log(htmlInner)



 
const htmlCopyPath = path.join(__dirname, 'project-dist', 'index.html');
const dirCompPath = path.join(__dirname, 'components');

  
  fs.copyFile(path.join(__dirname, 'template.html'), htmlCopyPath, (err) => {
        if (err) throw err;
        writeHtml();
      }
  );

function writeHtml() {
    fs.readdir(dirCompPath, (err, files) => {
      if (err) throw err;

        fs.readFile(htmlCopyPath, (err, data) => {
          if (err) throw err;
            data = data.toString();
            files.forEach(file => {
              const fileComponentsPath = path.join(dirCompPath, file);
                fs.readFile(path.join(dirCompPath, file), (err, dataComponent) => {
                  if (err) throw err;
                    data = data.replace(`{{${path.parse(fileComponentsPath).name}}}`, dataComponent);
                    fs.writeFile(htmlCopyPath, data, err => {
                      if (err) throw err;
                    });
                })
            })
            // for (let file of files) {
            //     const absoluteFilePath = path.join(__dirname, 'components', file);
            //     fs.readFile(absoluteFilePath, (err, fileData) => {
            //       if (err) throw err;
            //         data = data.replace(`{{${path.parse(absoluteFilePath).name}}}`, fileData);
            //         fs.writeFile(htmlCopyPath, data, err => {
            //           if (err) throw err;
            //         });
            //     })
            // }
        })
    });
}




