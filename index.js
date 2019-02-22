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
        resolve(lineNumber + " " + match[1]);
      }
    })  
  }

  let getStatus = (printUrlResolve) => {
    return fetch(match[1])
      .then(res => console.log(printUrlResolve + " " + res.status)) 
  }
  
  promisePrintUrl()
  .then(function(result){
    return getStatus(result)
  })
}

myInterface.on('line', printUrl);  */






const readline = require('readline');
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

myInterface.on('line', printUrl); 




 





  












 



 





 







