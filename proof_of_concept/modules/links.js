const getNewZombies = function(typ, datumVon, datumBis, suchbefehl){
    // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
    const https = require('https');
    const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?'
    const anwSUM=`&outStatistics=[{"statisticType": "sum","onStatisticField": "AnzahlFall","outStatisticFieldName": "summiertAnzahlFall"}]`;
    const anwDiverse= '&outFields=*&f=json';
    const anwFilter= `where=Meldedatum >= TIMESTAMP '${datumVon} 00:00:00' AND Meldedatum <= TIMESTAMP '${datumBis} 23:59:59'`
    let filterZusammengesetzt;

    switch (typ){
        case 1:
            filterZusammengesetzt = anwFilter + ` AND Landkreis = '${suchbefehl}'`
            break;
        case 2:
            filterZusammengesetzt = anwFilter + ` AND Bundesland = '${suchbefehl}'`
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
            console.log(parseInt(parsedData.features[0].attributes.summiertAnzahlFall));
            return(parseInt(parsedData.features[0].attributes.summiertAnzahlFall));
        });
    });
}
getNewZombies(1,'2021-02-13','2021-02-13','LK Oberbergischer Kreis');
module.exports = getNewZombies;