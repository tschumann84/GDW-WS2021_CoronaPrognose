function getStartDatesVar(mindate){
    const getDate = require('./getDate');

        let x = Math.round((new Date()-new Date(`${mindate}T00:00:00`))/60/60/24/1000);
        let daten = [];

        for(let i = 0; i<x; i++){
            daten[i] = getDate((i*-1));
        }
        return(daten);
}
module.exports = getStartDatesVar;