const getPopulation = require('../rkiapimodules/getPopulation')

function calcInzidenz(inf, typ, typID) {
    return new Promise ((resolve, reject) => {
        try {
            getPopulation(typ, typID)
                .then(ergebnis =>  {
                    resolve (inf / ergebnis * 100000);
                })
        }catch {
            reject(new Error('500 Internal Server Error (calcInzidenz)'));
        }
        // let inzidenz = (inf / getPopulation(typ, typID) * 100000)
        // // let inzidenz = (inf / 272022 * 100000)
        // console.log(inzidenz);
        // resolve(inzidenz);
    })
}
// let wert = calcInzidenz(300, 1, '05374');
// console.log(wert);

// function calcInzidenz(population){
//     return new Promise ((resolve, reject) => {
//         let inzidenz = ((parseInt(parsedData.features[0].attributes.summiertAnzahlFall)) / population) * 100000
//         resolve(inzidenz);
//     })
// }
module.exports = calcInzidenz;