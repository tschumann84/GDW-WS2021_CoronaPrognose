function getInzidenz(population){
    return new Promise ((resolve, reject) => {
        let inzidenz = ((parseInt(parsedData.features[0].attributes.summiertAnzahlFall)) / population) * 100000
        resolve(inzidenz);
    })
}
module.exports = getInzidenz;