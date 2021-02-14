// Abfrage ans RKI zu den Infektionszahlen pro Tag pro Landkreis oder Stadt zum Überprüfen der Prognoserechnung

const getNewZombies = require('links');

for ( let i=1; i<=9; i++) {
    console.log(i)
        getNewZombies(1, '2021-01-0'+i, '2021-01-0'+i, 'SK Köln', (intValue) => {console.log(intValue)});
}
