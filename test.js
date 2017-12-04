const index = require('./index');
const fs = require("fs");
var data = fs.readFileSync('test.html').toString();
var nData = index(data);
console.log(nData);
if(!fs.existsSync('dist')){
  fs.mkdirSync('dist');
}
fs.writeFileSync('dist/text.html',nData);
