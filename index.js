const fs = require("fs");

module.exports = function (source) {

  if (this.cacheable) this.cacheable();

  var inc = [];

  var arr = source.match(/<\/?include(.|\r|\n)*?>/g);

  if(arr){

    function getAttr(node,attr){
      if(node.node){
        var reg = new RegExp(attr + '=("|\')?(.*?)("|\'|\\s+|>)');
        var attrVal = node.node.match(reg);
        if(attrVal){
          return attrVal[0].replace(/("|'|\s+|>|\/>)/g,'').replace(attr+'=','');
        }
      }
      return null;
    }


    var root = {content:source,node:'root',name:'root',index:0,id:'root'};
    var parentNode = root;
    var temp = source,cut = 0;
    arr.forEach(function(v,i){
      var index = temp.indexOf(v);
      temp = temp.substring(index + v.length);
      var node = {content:temp,node:v,name:i,index:index + cut};
      if(v.indexOf('/>') != -1){
        node.content = v;
        node.parent = parentNode;
        node.src = getAttr(node,'src');
        node.name = getAttr(node,'name') || i;
        node.id = getAttr(node,'id') || i;
        parentNode.children = parentNode.children || [];
        parentNode.children.push(node);
      }else if(v.indexOf('</') == 0){

        parentNode.content = parentNode.node + parentNode.content.substring(0,node.index - parentNode.index - parentNode.node.length) + v;
        parentNode.node += v;
        parentNode.src = getAttr(parentNode,'src');
        parentNode.name = getAttr(parentNode,'name') || i;
        parentNode.id = getAttr(parentNode,'id') || i;

        parentNode = parentNode.parent;
      }else{
        node.parent = parentNode;
        parentNode.children = parentNode.children || [];
        parentNode.children.push(node);
        parentNode = node;
      }
      cut += index + v.length;
    });

    // print
    var narr = [root];
    while(narr.length > 0){
      var n = narr.pop();
      n.deep = n.deep || 0;
      var dp = '';
      for (var i = 0; i < n.deep; i++) {
        dp += '-';
      }
      dp += '|';
      console.log(dp,n.src,n.deep,n.name,n.id);//,n.node);

      if(n.children){
        for (var i = n.children.length - 1; i >= 0; i--) {
          n.children[i].deep = n.deep + 1;
          narr.push(n.children[i]);
        }
      }
    }
  }



  var value = source;

  return value.replace(/<\/?include(.|\r|\n)*?>/g,'@@@');
}
