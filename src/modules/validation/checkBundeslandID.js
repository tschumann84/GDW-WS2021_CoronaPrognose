// Diese Funktion prüft, ob die gegebene Bundesland-ID existiert.
const getBundeslaender = require('../rkiapimodules/getBundeslaender');
function checkBundeslandID(IdBundesland){
    return new Promise ((resolve, reject) =>{
        getBundeslaender()
            .then(array => {
                    let res = false;
                    let loop = false;
                    for (let i = 0; i < array.length; i++) {
                        if (IdBundesland == array[i].IdBundesland) {
                            res = true;
                            resolve(true)
                        }
                        if ((i + 1) === array.length && res === false) {
                            loop = true
                        }
                    }
                    if (res === false && loop === true) {
                        reject(new Error('404'));
                    }
                }
            )

})}
module.exports = checkBundeslandID;