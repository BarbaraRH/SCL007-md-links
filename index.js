#!/usr/bin/env node


/* module.exports = () => {
  // ...
};
 */


const fs = require('fs');
const fetch = require('node-fetch')
const forExtension = require('path');

const validateUrl = (url) => {
  return new Promise((resolve) => {
    fetch(url.link)
      .then((res) => {
        if (res.status === 200) {
          return resolve({...url, status:[res.status, "OK"]})
        } else {
          return resolve({...url, status:[res.status, "broken"]})
        }
      })
      .catch((err) => {
        return resolve({...url, status: 'failed connection'})
      }) 
  })
}

let promiseArrStore = [];

const fileOrDirectory = (path) => {  
  if (fs.lstatSync(path).isDirectory() === true){
    /* console.log("soy una carpeta"); */
    fs.readdirSync(path).forEach(file => {
      /* console.log(file); */ 
      if (fs.lstatSync(path + "/" + file).isDirectory() === true || forExtension.extname(path + "/" + file) === ".md"){
        fileOrDirectory(path + "/" + file); 
      } /* else {
        console.log("soy un archivo cualquiera")
      }  */   
    }); 
  } else if (fs.lstatSync(path).isFile() === true && forExtension.extname(path) === ".md"){
    promiseArrStore.push(extractLink(path));
  }
}







const extractLink = (path) => {
  let links = fs.readFileSync(path).toString().match(/\[.+\]\(.+\)/gm);
  let urls = []
  for (let i = 0; i < links.length; i++){
    let regExp = /\((.+)\)/g; 
    let regExpName = /\[(.+)\]/g;
    let match = regExp.exec(links[i]);
    let linkName = regExpName.exec(links[i]);
  urls.push({"path":path, "name": linkName[1], "link":match[1]}); 
  }

  const promiseArr = []
  for (let i = 0; i < urls.length; i++) {
    promiseArr.push(validateUrl({"path":urls[i].path, "name": urls[i].name, "link":urls[i].link}))
  }
  return promiseArr; 
} 












/* Promise.all(promiseArr).then(console.log); */


//Funcional del momento
/* const extractLink = (path) => {
  let links = fs.readFileSync(path).toString().match(/\[.+\]\(.+\)/gm);
  let urls = []
  for (let i = 0; i < links.length; i++){
    let regExp = /\((.+)\)/g; 
    let regExpName = /\[(.+)\]/g;
    let match = regExp.exec(links[i]);
    let linkName = regExpName.exec(links[i]);
  urls.push({"path":path, "name": linkName[1], "link":match[1]}); 
  }

  const promiseArr = []
  for (let i = 0; i < urls.length; i++) {
    promiseArr.push(validateUrl({"path":urls[i].path, "name": urls[i].name, "link":urls[i].link}))
  }

  Promise.all(promiseArr).then(console.log);
}  */



//falla fileOrDirectory al poner espacios en expresión regular ??????
/*const extractLink = (path) => { 

  let links = fs.readFileSync(path).toString().match(/\s\[.+\]\(.+\)\s/gm); 
  let urls = []
    for (let i = 0; i < links.length; i++){
      let regExp = /\((.+)\)/g; 
      let match = regExp.exec(links[i]);
    urls.push({"path":path, "link":match[1]});
    }
  
    const promiseArr = []
    for (let i = 0; i < urls.length; i++) {
      promiseArr.push(validateUrl({"path":urls[i].path, "link":urls[i].link}))
    }
  
    Promise.all(promiseArr).then(console.log);  
}*/



fileOrDirectory("./prueba");   

Promise.all([].concat.apply([], promiseArrStore)).then(console.log)







