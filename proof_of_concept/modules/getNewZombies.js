const https = require('https');

function getNewZombies(typ, datumVon, datumBis, suchbefehl, callback){
    // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
    const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?'
    const anwSUM=`&outStatistics=[{"statisticType": "sum","onStatisticField": "AnzahlFall","outStatisticFieldName": "summiertAnzahlFall"}]`;
    const anwDiverse= '&outFields=*&f=json';
    const anwFilter= `where=Meldedatum >= TIMESTAMP '${datumVon} 00:00:00' AND Meldedatum <= TIMESTAMP '${datumBis} 23:59:59'`
    let filterZusammengesetzt;

    switch (typ){
        case 1:
            filterZusammengesetzt = anwFilter + ` AND IdLandkreis = '${suchbefehl}'`
            break;
        case 2:
            filterZusammengesetzt = anwFilter + ` AND IdBundesland = '${suchbefehl}'`
            break;
        case 3:
            filterZusammengesetzt = anwFilter
            break;
    }
    const abfrageURI = URI+encodeURI(filterZusammengesetzt+anwSUM+anwDiverse);
    https.get(abfrageURI,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            let parsedData = JSON.parse(body);
            //console.log(parsedData.features[0].attributes.summiertAnzahlFall)
            callback(parseInt(parsedData.features[0].attributes.summiertAnzahlFall));
        });
    });
}
module.exports = getNewZombies;
