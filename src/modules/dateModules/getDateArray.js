
async function getDateArray(date){
        const x = new Date(date);
        let j = 0;

        //Objekt Datumspaar
        function Datumspaar(anfangsdatum, enddatum){
            this.anfangsdatum = anfangsdatum;
            this.enddatum = enddatum;
        }

        //initialisierung der arrays
        let arrayDatumspaare = [];

        //Initialbefüllung des Arrays mit Date Objekten
        for(let i = 0; i<=5; i++){
            await arrayDatumspaare.push(new Datumspaar(new Date(x),new Date(x)));
        }

        for ( let i=-42; i<=-7; i=(i+7)){
            await subtractDays(x, i)
                .then(date => addToArray(j, arrayDatumspaare, date))
            j++
        }
        return arrayDatumspaare;
}

function addToArray(j, arrayDatumspaare, date){
    return new Promise((resolve, reject)=> {
        arrayDatumspaare[j].anfangsdatum.setDate(date)
        arrayDatumspaare[j].enddatum.setDate(date+6)
        resolve(arrayDatumspaare[j])
    })
}

function subtractDays(date, i){
    return new Promise((resolve, reject)=> {
        resolve(date.getDate()+i)
    })
}
module.exports = getDateArray