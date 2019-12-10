var oper = require('./Execute.js');

var multiplier = (
  function() {
    function multiplyFunction(a, b, replace) {
      function inner_multiplyFunction(a, b) {
        if(typeof(b)=="object"){
          return a* b[0];
        }else{
          return a * b;
        }
      }
      return oper.execute(a, b, replace, inner_multiplyFunction);
    }
    return{
      ElementMultiply:multiplyFunction
    }
  }
);
module.exports = multiplier();
