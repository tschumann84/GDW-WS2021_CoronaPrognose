//Gibt die in Deutschland existierenden Landkreise aus.
function getLandkreise(){
    return new Promise((resolve, reject)=>{
    // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
    const https = require('https');
    /*
        Erstellen der URI für die Anfrage an die RKI API
     */
    //Diverse URI bestandteile
    const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=1%3D1&outFields=IdLandkreis%2C%20Landkreis&outSR=4326&f=json&returnDistinctValues=true'

    function Landkreis(IdLandkreis, Landkreis) {
        this.IdLandkreis = IdLandkreis;
        this.Landkreis = Landkreis;
    }

    let arrayLandkreise = [];

    https.get(URI,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            let parsedData = JSON.parse(body);

            let i=0;
            while(parsedData.features[i] != null){
                arrayLandkreise.push(new Landkreis(parsedData.features[i].attributes.IdLandkreis, parsedData.features[i].attributes.Landkreis))
                i++;
            }
            //console.log(parsedData.features[0].attributes.summiertAnzahlFall)
            resolve(arrayLandkreise);
        });
    });
});
}

module.exports = getLandkreise;