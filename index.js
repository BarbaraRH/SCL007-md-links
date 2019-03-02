#!/usr/bin/env node


/* module.exports = () => {
  // ...
};
 */


const fs = require('fs');
const fetch = require('node-fetch')
const forExtension = require('path');
const resolve = require('path').resolve


const mdLinks = (path, options) => {
  let promiseArrStore = [];
  if (options === "--validate"){
    functionCluster(path, "--validate", promiseArrStore);
    Promise.all([].concat.apply([], promiseArrStore)).then(console.log);
  } else if (options === "--stats"){
    /* Promise.all([].concat.apply([], promiseArrStore))
      .then(res => res.json()) */

  } else {
    functionCluster(path, options, promiseArrStore);
    Promise.all([].concat.apply([], promiseArrStore)).then(console.log);
  }
}


const functionCluster = (path, options, promiseArrStore) => {

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
  
  const fileOrDirectory = (path) => { 
    path = resolve(path);
    console.log(path); 
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
    let urls = [];
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

  fileOrDirectory(path, options);
}

/* mdLinks(path, options); */
if(require.main === module){
  let path = process.argv[2];
  let options = process.argv[3];
  mdLinks(path, options);
}

module.exports = mdLinks; 




