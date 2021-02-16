
//Gibt die Anzahl neu gemeldeter, Infizierter in einem bestimmten Zeitraum, in einer bestimmten Region aus.
function getNewZombies(typ, datumVon, datumBis, regionID){
    return new Promise((resolve, reject) =>{
        // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
        const https = require('https');
        /*
            Erstellen der URI für die Anfrage an die RKI API
         */
        //Diverse URI bestandteile
        const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?'
        const anwSUM=`&outStatistics=[{"statisticType": "sum","onStatisticField": "AnzahlFall","outStatisticFieldName": "summiertAnzahlFall"}]`;
        const anwDiverse= '&outFields=*&f=json';
        const anwFilter= `where=Meldedatum >= TIMESTAMP '${datumVon} 00:00:00' AND Meldedatum <= TIMESTAMP '${datumBis} 23:59:59'`
        let filterZusammengesetzt;

        switch (typ){
            case 1:
                filterZusammengesetzt = anwFilter + ` AND IdLandkreis = '${regionID}'`
                break;
            case 2:
                filterZusammengesetzt = anwFilter + ` AND IdBundesland = '${regionID}'`
                break;
            case 3:
                filterZusammengesetzt = anwFilter
                break;
        }

        //Hier werden die einzelnen URI Bestandteile zu einer zusammgesetzt
        const abfrageURI = URI+encodeURI(filterZusammengesetzt+anwSUM+anwDiverse);
       // console.log(abfrageURI);

        /*
            Abfrage der RKI API
         */
        //Abfrage der URI und Ausgabe der Summierten Anzahl der neuen Zombies als INT
        https.get(abfrageURI,(res) => {
            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                let parsedData = JSON.parse(body);
                //console.log(parsedData.features[0].attributes.summiertAnzahlFall)
                resolve(parseInt(parsedData.features[0].attributes.summiertAnzahlFall));

                const getInzidenz = require('./spass/getInzidenz');


                getWerte(typ, regionID)
                    .then(Inzidenz => getInzidenz(population))
                    .then(NeueFälle => )

            });
        });
    })
}
module.exports = getNewZombies;
