const include = require('./include');

module.exports = function (source) {

  if (this.cacheable) this.cacheable();

  var outvalue = include(source);

  return outvalue;
}

module.exports.include = include;
