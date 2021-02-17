function getStartDates(){
    const getDayCalc = require('./getDayCalc');

    let x = Math.round((new Date()-new Date('2020-04-01T00:00:00'))/60/60/24/1000);
    let daten = [];

    for(let i = 0; i<x; i++){
        daten[i] = getDayCalc((i*-1));
    }
    daten.shift();
    return daten;
}
module.exports = getStartDates;
