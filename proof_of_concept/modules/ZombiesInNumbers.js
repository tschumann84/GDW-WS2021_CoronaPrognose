// Abfrage ans RKI zu den Infektionszahlen pro Tag pro Landkreis oder Stadt zum Überprüfen der Prognoserechnung

const getNewZombies = require('./getNewZombies');
const getDate = require('./getDate');
//for ( let i=1; i<=9; i++) {
//    getNewZombies(1, '2021-01-0'+i, '2021-01-0'+i, '12071', (intValue) => {console.log(intValue)});
//}

(async function() {
    for(let i = -7; i <0; i++){
        await new Promise(next => {
            getNewZombies(1, getDate(i), getDate(i), '12071', (intValue) =>{
                console.log(getDate(i)+' '+intValue);
                next();
            });
        })
    }
})()
