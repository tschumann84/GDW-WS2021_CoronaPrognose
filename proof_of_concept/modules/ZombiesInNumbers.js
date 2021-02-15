// Abfrage ans RKI zu den Infektionszahlen pro Tag pro Landkreis oder Stadt zum Überprüfen der Prognoserechnung

const getNewZombies = require('./getNewZombies');

//for ( let i=1; i<=9; i++) {
//    getNewZombies(1, '2021-01-0'+i, '2021-01-0'+i, '12071', (intValue) => {console.log(intValue)});
//}



const forLoop = async _ => {
    for ( let i=1; i<=14; i++) {
        setTimeout(function() {
            getNewZombies(1, '2021-02-'+i, '2021-02-'+i, '12071', (intValue) =>{console.log(i+' '+intValue)});}, 5000);
        }

        //   let newZombie = getNewZombies(1, '2021-01-0'+i, '2021-01-0'+i, '12071', (intValue) => {console.log(intValue)});
    }

forLoop();