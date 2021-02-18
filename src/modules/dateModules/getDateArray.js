// Gibt ein Array mit Daten aus

async function getDateArray(date){
        const x = new Date(date);
        x.setHours(2)
        let j = 0;

        //Objekt Datumspaar
        function Datumspaar(anfangsdatum, enddatum){
            this.anfangsdatum = anfangsdatum;
            this.enddatum = enddatum;
        }

        //initialisierung der arrays
        let arrayDatumspaare = [];

        //Initialbefüllung des Arrays mit Date Objekten
        for(let i = 0; i<=12; i++){
            await arrayDatumspaare.push(new Datumspaar(new Date(x),new Date(x)));
        }

        for ( let i=-84; i<=-7; i=(i+7)){
            await subtractDays(x, i)
                .then(date => addToArray(j, arrayDatumspaare, date))
            j++
        }
        return arrayDatumspaare;
}

function addToArray(j, arrayDatumspaare, date){
    return new Promise((resolve, reject)=> {
        try{
            arrayDatumspaare[j].anfangsdatum.setDate(date)
            arrayDatumspaare[j].enddatum.setDate(date+6)
            resolve(arrayDatumspaare[j])
        } catch{
            reject(new Error('500 Internal Server Error (addToArray)'));
        }
    })

}

function subtractDays(date, i){
    return new Promise((resolve, reject)=> {
        try{
            resolve(date.getDate()+i)
        } catch{
            reject(new Error('500 Internal Server Error (subtractDays)'));
        }
    })
}

//getDateArray(new Date('2020-12-28'))
//    .then(result => console.log(result))
module.exports = getDateArray