const getBundeslaender = require('../rkiapimodules/getBundeslaender');
function checkBundeslandID(IdBundesland,callback){
    getBundeslaender((array) =>{
        let boolean;
        let call = false;
        for (let i = 0; i < array.length; i++){
            if (IdBundesland == array[i].IdBundesland){
                boolean = true;
                call = true;
                callback(boolean)
            }
        }
        if(call===false){
            callback(false);
        }
    })}
module.exports = checkBundeslandID;