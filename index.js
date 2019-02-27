#!/usr/bin/env node


/* module.exports = () => {
  // ...
};
 */

/* const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');

let settings = {
  input: fs.createReadStream('README.md')
};

const myInterface = readline.createInterface(settings); 

let lineNumber = 0


let printUrl = (line) => {
  
  lineNumber++;
  let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
  let match = regExp.exec(line);

  let promisePrintUrl = function () {   
    return new Promise(function(resolve){
      if (match != null){
        resolve({"lineNumber":lineNumber, "link":match[1]});
      }
    })  
  }

  let getStatus = (urlObjResolve) => {
    return fetch(match[1])
      .then(res => {
        urlObjResolve.status = res.status;
        return Promise.resolve(urlObjResolve);
      })
  }
  
  promisePrintUrl()
  .then(function(result){
    return getStatus(result)
  })
  .then(function(result){
    console.log(JSON.stringify(result));
  })
}

myInterface.on('line', printUrl);  */







//incluye hints Fabián
/* const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');

let settings = {
  input: fs.createReadStream('README.md')
};

const myInterface = readline.createInterface(settings); 

let lineNumber = 0

let printUrl = (line) => {
  
  lineNumber++;
  let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
  let match = regExp.exec(line);

  let promisePrintUrl = function () {   
    return new Promise(function(resolve){
      if (match != null){
        resolve({"lineNumber":lineNumber, "link":match[1]});
      }
    })  
  }

  let getStatus = (urlObjResolve) => {
    return fetch(match[1])
      .then(res => {
        urlObjResolve.status = res.status;
        return Promise.resolve(urlObjResolve);
      })
  }
  
  promisePrintUrl()
  .then(function(result){
    return getStatus(result)
  })
}

const mdlinks = () =>
myInterface.on('line', (line) => {
  const res = printUrl(line);
}  */






// empieza transformación segun hints, pero prefiero cambiar un poco
/* const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');



let printUrl = (line) => {
  
  lineNumber++;
  let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
  let match = regExp.exec(line);

  let promisePrintUrl = function () {   
    return new Promise(function(resolve){
      if (match != null){
        resolve({"lineNumber":lineNumber, "link":match[1]});
      }
    })  
  }

  let getStatus = (urlObjResolve) => {
    return fetch(match[1])
      .then(res => {
        urlObjResolve.status = res.status;
        return Promise.resolve(urlObjResolve);
      })
  }
  
  promisePrintUrl()
  .then(function(result){
    return getStatus(result)
  })
}

const mdlinks = (path) => {

  let settings = {
    input: fs.createReadStream(path)
  };
  
  const myInterface = readline.createInterface(settings); 
  
  let lineNumber = 0
  myInterface.on('line', (line) => {
    const res = printUrl(line);
    

    
  }) 
} */ 


const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');

const mdLinks = (path) => {
  let settings = {
    input: fs.createReadStream(path)
  };
  
  const myInterface = readline.createInterface(settings); 
  
  let lineNumber = 0
    
  let printUrl = (line) => {
    
    lineNumber++;
    let regExp = /\[.+\]\((.+)\)/g; 
    let match = regExp.exec(line);
  
    let promisePrintUrl = function () {   
      return new Promise(function(resolve){
        if (match != null){
          resolve({"path": path, "lineNumber":lineNumber, "link":match[1]});
        }
      })  
    }
  
    let getStatus = (urlObjResolve) => {
      return fetch(match[1])
        .then(res => {
          urlObjResolve.status = res.text();
          return Promise.resolve(urlObjResolve);
        })
    }
    
    promisePrintUrl()
    .then(function(result){
      return getStatus(result)
    })
    .then(function(result){
      console.log( JSON.stringify(result));
    }) 
  }
  
  myInterface.on('line', printUrl)  
}

/* mdLinks("./README.md") */ 


/* fetch('https://github.com/')
    .then(res => res.text())
    .then(body => console.log(body.substring(0, 7000))); */


/* const testFolder = './tests/';

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
});  */



/* console.log(fs.lstatSync("README.md").isDirectory()) */

var forExtension = require('path');

const myFunction = (path) => {
  if (fs.lstatSync(path).isDirectory() === true){
    fs.readdirSync(path).forEach(file => {
      if (fs.lstatSync(file).isDirectory() === true){
        myFunction(file);
      }else if(forExtension.extname(file) === ".md"){
        myFunction(file);
      } else {
        console.log("no .md files in this directory")
      }
    });
  } else if(fs.lstatSync(path).isFile() === true && forExtension.extname(path) === ".md"){
    console.log("hola soy un archivo .md")
  }
}

/* myFunction("./prueba") */  

/* const fileOrDirectory = (path) => {
  if (fs.lstatSync(path).isDirectory() === true){
    console.log("soy una carpeta");
    fs.readdirSync(path).forEach(file => {
      console.log(file); 
      if (fs.lstatSync(path + "/" + file).isDirectory() === true){
        console.log("soy una carpeta") 
      } else if (forExtension.extname(path + "/" + file) === ".md"){
        console.log("soy un archivo .md")
      } else {
        console.log("soy un archivo cualquiera")
      }    
    }); 
  } else if (fs.lstatSync(path).isFile() === true && forExtension.extname(path) === ".md"){
    console.log("hola soy un archivo .md")
  }
} */

const fileOrDirectory = (path) => {
  if (fs.lstatSync(path).isDirectory() === true){
    console.log("soy una carpeta");
    fs.readdirSync(path).forEach(file => {
      console.log(file); 
      if (fs.lstatSync(path + "/" + file).isDirectory() === true || forExtension.extname(path + "/" + file) === ".md"){
        fileOrDirectory(path + "/" + file); 
      } /* else {
        console.log("soy un archivo cualquiera")
      }  */   
    }); 
  } else if (fs.lstatSync(path).isFile() === true && forExtension.extname(path) === ".md"){
    console.log("hola soy un archivo .md")
  }
}

fileOrDirectory("./prueba");  

/* fs.readdirSync("./prueba").forEach(file => {
  console.log(file); 
  if (fs.lstatSync("./prueba/" + file).isDirectory() === true){
    console.log("soy una carpeta") 
  } else if (forExtension.extname("./prueba/" + file) === ".md"){
    console.log("soy un archivo .md")
  } else {
    console.log("soy un archivo cualquiera")
  }    
});  */





// hacerlo sin readline
/* const fs = require('fs');
const fetch = require('node-fetch')

let links = fs.readFileSync('README.md').toString().match(/\[.+\]\((.+)\)/gm);

let urls = []

for (let i = 0; i < links.length; i++){
  let regExp = /\((.+)\)/g; 
  let match = regExp.exec(links[i]);
  urls.push(match[1]);
}



console.log(urls) */


  






  












 



 





 







