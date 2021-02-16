const getLandkreise = require('../rkiapimodules/getLandkreise');
function checkLandkreisID(landkreisID,callback){
getLandkreise((array) =>{
    let boolean;
    let call = false;
        for (let i = 0; i < array.length; i++){
            if (landkreisID === array[i].IdLandkreis){
                boolean = true;
                call = true;
                callback(boolean)
            }
    }
        if(call===false){
            callback(false);
        }
})}
module.exports = checkLandkreisID;