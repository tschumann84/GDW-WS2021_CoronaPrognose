//Gibt ein Array mit allen nachfolgenden Daten, bis zum heutigen Tag aus.
function getStartDatesVar(mindate){
    const getDayCalc = require('./getDayCalc');

        let x = Math.round((new Date()-new Date(`${mindate}T00:00:00`))/60/60/24/1000);
        let daten = [];

        for(let i = 1; i<x; i++){
            daten[i] = getDayCalc((i*-1));
        }
    daten.shift();
    return(daten);
}
module.exports = getStartDatesVar;