const https = require('https');


function getPopulation(typ, suchbefehl, callback){
    // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
    const https = require('https');
    let fertigeUri;
    const URIBundeslaender = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query?';
    const bundeslaenderDiverse = `&outFields=*&returnGeometry=false&outSR=4326&f=json`;

    switch (typ){
        case 1:
            const URILandkreise = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?';
            const landkreiseDiverse= '&outFields=EWZ&outSR=4326&f=json&resultRecordCount=1&returnGeometry=false';
            const filterLandkreise=`where=RS = '${suchbefehl}'`;
            fertigeUri = URILandkreise+encodeURI(filterLandkreise+landkreiseDiverse);
            break;
        case 2:
            const filterBundeslaender = `where=OBJECTID_1 = '${suchbefehl}'`;
            fertigeUri = URIBundeslaender+encodeURI(filterBundeslaender+bundeslaenderDiverse);
            console.log(fertigeUri)
            break;
        case 3:
            const filterDeutschlandweit = 'where=1=1'
            fertigeUri = URIBundeslaender+encodeURI(filterDeutschlandweit+bundeslaenderDiverse);
            console.log(fertigeUri)
            break;
    }

    https.get(fertigeUri,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            let parsedData = JSON.parse(body);
            switch (typ){
                case 1: callback(parsedData.features[0].attributes.EWZ); break;
                case 2: callback(parsedData.features[0].attributes.LAN_ew_EWZ); break;
                case 3:
                    let ergebnis=0;
                    for (let i = 0; i< 16; i++){
                        ergebnis += parseInt(parsedData.features[i].attributes.LAN_ew_EWZ);
                    }
                    callback(ergebnis);
                    break;
            }
        });
    });
}
module.exports = getPopulation;