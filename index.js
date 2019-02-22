/* module.exports = () => {
  // ...
};
 */

// imprime links y valida url, pero da falsos positivos y da desordenado. no imprime linea

/* const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');

let settings = {
  input: fs.createReadStream('README.md')
};

const myInterface = readline.createInterface(settings); 

let lineNumber = 0
const printUrl = (line) => {
  lineNumber++;
  let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
  let match = regExp.exec(line);
  if (match != null){ 
    console.log(lineNumber+" "+match[1]); 
    fetch(match[1])
      .then(res => {
        console.log(res.ok);
        console.log(res.status)
      })
      .catch(error => console.error(error))  
  }      
};

myInterface.on('line', printUrl);  */  

const readline = require('readline');
const fs = require('fs');
const fetch = require('node-fetch');

let settings = {
  input: fs.createReadStream('README.md')
};

const myInterface = readline.createInterface(settings); 

/* let lineNumber = 0

const printUrl = (line) => {    
  lineNumber++;
  let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
  let match = regExp.exec(line);
  if (match != null){    
    fetch(match[1])
      .then(function(response){
        console.log(lineNumber, match[1], response.ok, response.status);      
      })
      .catch(error => console.error(error))   
  }      
}; */

  

/* let lineNumber = 0

let printUrl = (line) => {
  let promisePrintUrl = new Promise (function(resolve){
    lineNumber++;
    let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
    let match = regExp.exec(line);
    if (match != null){
      resolve(lineNumber + " " + match[1]);
    }
  })
  
  promisePrintUrl
  .then(function(fromResolve){
    console.log(fromResolve)
  })
}

myInterface.on('line', printUrl);  */



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

myInterface.on('line', printUrl); 




 

/* const getStatus = () => {
  return fetch('https://www.google.com')
    .then(res => console.log(res.status))
}

const getOk = () => {
  return fetch('https://www.google.com')
    .then(res => console.log(res.ok))
}

console.log(getStatus() + getOk());   */



  /* fetch('https://github.com/')
  .then(res => {
      console.log(res.ok);
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.headers.raw());
      console.log(res.headers.get('content-type'));
  }); */









// const readline = require('readline');
// const fs = require('fs');
// const urlExists = require('url-exists');

// let settings = {
//   input: fs.createReadStream('README.md')
// };

// const myInterface = readline.createInterface(settings); 


// let lineNumber = 0
// const printUrl = (line) => {
//   lineNumber++;  
//   let regExp = /\[.+\]\((.+)\)/g; //let regExp = /\[.+\]\((.+)\)/g;
//   let match = regExp.exec(line);
//   if (match != null){ 
//     /* process.stdout.write(lineNumber.toString()+ " " + match[1]+"\n"); */
//     urlExists(match[1], function(err, exists) {
//     process.stdout.write(lineNumber.toString()+ " " + match[1]+ " " + exists + "\n");
//     /* console.log(lineNumber+" "+match[1] +" "+exists); */ 
//     }); 
//   }      
// };

// myInterface.on('line', printUrl);  



 





 







