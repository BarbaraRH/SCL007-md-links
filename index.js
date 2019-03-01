#!/usr/bin/env node


/* module.exports = () => {
  // ...
};
 */


const fs = require('fs');
const fetch = require('node-fetch')
const forExtension = require('path');

let path = process.argv[2];
let options = process.argv[3];


const mdLinks = (path, options) => {
  if (options === "--validate"){
    fileOrDirectory(path, "--validate");
    Promise.all([].concat.apply([], promiseArrStore)).then(console.log);
  } else if (options === "--stats"){
    console.log("aún no me programan");
  } else {
    fileOrDirectory(path, options);
    Promise.all([].concat.apply([], promiseArrStore)).then(console.log);
  }
}


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
        return resolve({...url, status:'failed connection'})
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
    promiseArrStore.push(extractLink(path, options));
  }
}



const extractLink = (path, options) => {
  let links = fs.readFileSync(path).toString().match(/\[.+\]\(.+\)/gm);
  let urls = []
  for (let i = 0; i < links.length; i++){
    let regExp = /\((.+)\)/g; 
    let regExpName = /\[(.+)\]/g;
    let match = regExp.exec(links[i]);
    let linkName = regExpName.exec(links[i]);
    urls.push({"path":path, "name": linkName[1], "link":match[1]}); 
  }

  if (options === "--validate"){
    const promiseArr = []
    for (let i = 0; i < urls.length; i++) {
      promiseArr.push(validateUrl({"path":urls[i].path, "name": urls[i].name, "link":urls[i].link}))
    }
    return promiseArr; 
  } else {
    return urls;
  } 
} 

mdLinks(path, options);





