var zeroes=function(){
  function zeroes(shape=null){
      if(shape==null || shape.length==0){
        return [];
      }else{
        if(shape.length==1){
          return new Array(shape[0]).fill(0);
        }else{
          if(shape.length==2){
            let mat=new Array(shape[0]);
            for(let i=0;i<shape[1].length;i++){
                mat[i]=new Array(shape[1]).fill(0);
            }
            return mat;
          }else{
            throw new Error("INVALID SHAPE.");
          }
        }
      }
  }
}
module.exports = zeroes();
