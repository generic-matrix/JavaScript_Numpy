let complexMatrixOperations = require('./ComplexMatrixOperation.js');

let hstack=function hstack(arr1=null,arr2=null){
        if((arr1!=null || arr2!=null) && (arr1.length!=0 || arr2.length!=0)){
            if(typeof(arr1[0])=="object" && typeof(arr2[0])=="object"){
                //2D array
                let mat=[];
                mat[0]=arr2;
                mat[1]=arr1;
                return complexMatrixOperations.transpose(mat);
            }else if(typeof(arr1[0])=="number" && typeof(arr2[0])=="number"){
                //1D array..
                return arr1.concat(arr2);
            }else{
                throw new Error("Hybrid dimensions are currently not supported. ");
            }
        }
}

module.exports = hstack;
