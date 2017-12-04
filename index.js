const fs = require("fs");

module.exports = function (source) {

  if (this.cacheable) this.cacheable();

  var inc = [];

  var arr = source.match(/<\/?include(.|\r|\n)*?>/g);

  if(arr){

  var temp = source;

  var darr = [],oarr = [];

  let i = 0,deep = 0;;
  while(i < arr.length){
    var v = arr[i];
    var index = temp.indexOf(v);


    if(v.indexOf('/>') != -1){
      deep++;
    }else if(v.indexOf('</') == 0){
      //deep--;
    }else{
      deep++;
    }

    darr.push({deep:deep,start:index,node:v,i:i});

    if(v.indexOf('/>') != -1){
      deep--;
    }else if(v.indexOf('</') == 0){
      deep--;
    }else{
      //deep++;
    }
    // cutLen += index;
    //
    //
    // if(v.indexOf('/>') != -1){
    //   oarr.push({node:v,start:cutLen});
    // }else{
    //   var node = {node:v,start:cutLen};
    //   darr.push(node);
    // }
    //
    // cutLen += v.length;
    temp = temp.substring(index + v.length);
    i++;
  }

    console.log(arr.length,inc);
  }



  var value = source;

  return value.replace(/<\/?include(.|\r|\n)*?>/g,'@@@');
}
