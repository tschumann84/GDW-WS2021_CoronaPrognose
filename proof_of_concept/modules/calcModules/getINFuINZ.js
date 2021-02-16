/*
getINFuINZperDate gibt die Anzahl der Infizierten und den Inzidenz Wert für die Region und den vergangenen Zeitraum zurück.

    Erwartet:
        -typ: Landkreis(1) oder Bundesland(1) oder Bundesweit(3)
        -typID: ID der Region für typ 1 oder 2
        -Startdatum YYYY.mm.dd
        -Enddatum YYYY.mm.dd

    Rückgabe:
        -INF: Anzahl der neu Infizierten im Zeitraum
        -INZ: Inzidenzwert für dem Zeitraum

    Ablauf:
        -Übergabetyp festlegen
        -Start und Enddatum festlegen
        -Abfrage der Infizierten für Zeitraum nach Region
        -Anzahl infizierte aufsummieren = inf
        -population der Region abfragen = pop
        -Inzidenzwert ermitteln inz = inf / pop * 100000
        -Rückgabe von inf und inz

 */

function getINFuINZ(typ, startdatum, enddatum, typID) {

    const https = require('https');
    const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?'
    const sum = `&outStatistics=[{"statisticType": "sum","onStatisticField": "AnzahlFall","outStatisticFieldName": "sumAnzahlFall"}]`;
    const date = `where=Meldedatum >= TIMESTAMP '${startdatum} 00:00:00' AND Meldedatum <= TIMESTAMP '${enddatum} 23:59:59'`
    const out = '&outFields=*&f=json';

    let filters;

    switch (typ) {
        case 1:
            filters = date + ` AND IdLandkreis = '${typID}'`
            break;
        case 2:
            filters = date + ` AND IdBundesland = '${typID}'`
            break;
        case 3:
            filters = date
            break;
    }

    const request = URI+encodeURI(filters+sum+out)


    https.get(request, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            let parsedData = JSON.parse(body);
            let summe = parseInt(parsedData.features[0].attributes.sumAnzahlFall);
            console.log('returnwert: '+summe)
            return summe;
        });
    });
}

let summe = getINFuINZ(1,'2021-02-08','2021-02-14','05374');
console.log('Letzte Summe: '+summe)

module.exports = getINFuINZ;