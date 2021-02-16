const getPopulation = require('./getPopulation');

//Gibt die Anzahl neu gemeldeter, Infizierter in einem bestimmten Zeitraum, in einer bestimmten Region aus.
function getRetroNumbers(typ, datumVon, datumBis, regionID){
    return new Promise((resolve, reject) =>{
        // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
        const https = require('https');
        /*
            Erstellen der URI für die Anfrage an die RKI API
         */
        //Diverse URI bestandteile
        const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?'
        const anwSUM=`&outStatistics=[{"statisticType": "sum","onStatisticField": "AnzahlFall","outStatisticFieldName": "AnzahlFall"},{"statisticType": "sum","onStatisticField": "AnzahlTodesfall","outStatisticFieldName": "AnzahlTodesfall"},{"statisticType": "sum","onStatisticField": "AnzahlGenesen","outStatisticFieldName": "AnzahlGenesen"}]`;
        const anwDiverse= '&outFields=AnzahlFall,AnzahlTodesfall,AnzahlGenesen&f=json';
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

                let anzahlTage = Math.round((new Date(`${datumBis}T23:59:59`)-new Date(`${datumVon}T00:00:00`))/60/60/24/1000);
                let inzidenz;

                function RetroMeldung(anzahlFall, anzahlTodesfall, anzahlGenesen, inzidenz) {
                    this.anzahlFall = anzahlFall;
                    this.anzahlTodesfall = anzahlTodesfall;
                    this.anzahlGenesen = anzahlGenesen;
                    this.inzidenz = inzidenz;
                }

                getPopulation(typ, regionID)
                    .then(population => {(
                        inzidenz = (((((parsedData.features[0].attributes.AnzahlFall)/population)*100000)/anzahlTage)*7))
                        let inhalt = [];
                        inhalt.push(new RetroMeldung(parsedData.features[0].attributes.AnzahlFall, parsedData.features[0].attributes.AnzahlTodesfall, parsedData.features[0].attributes.AnzahlGenesen, inzidenz));
                        resolve(inhalt)
                    })
            });
        });
    })
}

module.exports = getRetroNumbers;