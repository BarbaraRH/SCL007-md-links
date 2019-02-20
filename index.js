/* module.exports = () => {
  // ...
};
 */

const readline = require('readline');
const fs = require('fs');

let settings = {
  input: fs.createReadStream('README.md')
};

const myInterface = readline.createInterface(settings); 

const printUrl = (line) => {
  let linkMd = line.match(/\[.+\]\(.+\)/g);  
  if (line.includes(linkMd)){
    console.log(linkMd[0]);  
  }     
};

myInterface.on('line', printUrl);   

