/* module.exports = () => {
  // ...
};
 */

// imprime links y valida url, pero da falsos positivos y da desordenado. no imprime linea
const readline = require('readline');
const fs = require('fs');
const urlExists = require('url-exists');

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
    urlExists(match[1], function(err, exists) { 
    console.log(lineNumber+" "+match[1]  +" "+exists ); 
     });   
  }      
};

myInterface.on('line', printUrl);  



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

/* var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

function doesFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();
   
  if (xhr.status == "404") {
      console.log("false");
  } else {
    console.log("true");
  }
}

doesFileExist("www.googlefalsofalso.com"); */

 





 


 

