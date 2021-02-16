const getPopulation = require('../rkiapimodules/getPopulation')

function getInzidenz(inf, typ, typID) {
    return new Promise ((resolve, reject) => {
        getPopulation(typ, typID)
            .then(ergebnis =>  {
                resolve (inf / ergebnis * 100000);
            })
        // let inzidenz = (inf / getPopulation(typ, typID) * 100000)
        // // let inzidenz = (inf / 272022 * 100000)
        // console.log(inzidenz);
        // resolve(inzidenz);
    })
}
// let wert = getInzidenz(300, 1, '05374');
// console.log(wert);

// function getInzidenz(population){
//     return new Promise ((resolve, reject) => {
//         let inzidenz = ((parseInt(parsedData.features[0].attributes.summiertAnzahlFall)) / population) * 100000
//         resolve(inzidenz);
//     })
// }
module.exports = getInzidenz;