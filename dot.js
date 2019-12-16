var matrixMultiply = require('./MatrixMultiply.js');

var dot=function(){
    function dot(A,B){
        if((A!=null || B!=null) && (A.length==0 || B.length==0)){
            throw new Error("Invalid inputs.");
        }else if(typeof(A[0])=="number" && typeof(B[0])=="number"){
            //inner product.
            let product=0;
            for(let i=0;i<A.length;i++){
                    product=product+A[i]*B[i];
            }
            return product;

        }else{
            return matrixMultiply.matrixMultiply(A,B);
        }
    }
}
module.exports = dot();
