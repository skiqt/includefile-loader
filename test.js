const index = require('./index');
const fs = require("fs");
var data = fs.readFileSync('test.html').toString();
index(data);
