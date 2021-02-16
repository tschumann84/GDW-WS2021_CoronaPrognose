// Abfrage ans RKI zu den Infektionszahlen pro Tag pro Landkreis oder Stadt zum Überprüfen der Prognoserechnung

const getNewZombies = require('./rkiapimodules/getNewZombies');
const getDate = require('./getDate');
//for ( let i=1; i<=9; i++) {
//    getNewZombies(1, '2021-01-0'+i, '2021-01-0'+i, '12071', (intValue) => {console.log(intValue)});
//}
// OBK=05374, Köln=05315, Dresden=14612

(async function() {
    for(let i = -350; i <-308; i++){
        await new Promise(next => {
            getNewZombies(1, getDate(i), getDate(i), '13003', (intValue) =>{
                console.log(getDate(i)+' '+intValue);
                next();
            });
        })
    }
})()
