const getLandkreise = require('../rkiapimodules/getLandkreise');

function checkLandkreisID(landkreisID) {
    return new Promise((resolve, reject) => {
        getLandkreise()
            .then(array => {
                let res = false;
                let loop = false;
                for (let i = 0; i < array.length; i++) {
                    if (landkreisID === array[i].IdLandkreis) {
                        res=true;
                        resolve(true);
                    }
                    if((i+1) === array.length && res===false){loop = true}
                }
                if(res === false && loop === true){
                    reject(new Error ('400'));
                }
            })
    });
}
module.exports = checkLandkreisID;