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

const printUrl = (data) => {
  splittedData = data.split(' ');
  for (let i = 0; i<splittedData.length; i++) {
    if (splittedData[i].includes("http") === true){
      console.log(splittedData[i])
    }    
  }    
};

myInterface.on('line', printUrl);   



