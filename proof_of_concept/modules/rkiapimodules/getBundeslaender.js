
function getBundeslaender(){
    return new Promise((resolve, reject) => {
        const https = require('https');
        /*
            Erstellen der URI für die Anfrage an die RKI API
         */
        //Diverse URI bestandteile
        const URI = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query?where=1%3D1&outFields=LAN_ew_GEN,OBJECTID_1&returnGeometry=false&outSR=4326&f=json'

        function Bundesland(IdBundesland, Bundesland) {
            this.IdBundesland = IdBundesland;
            this.Bundesland = Bundesland;
        }

        let arrayBundeslaender = [];

        https.get(URI,(res) => {
            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                let parsedData = JSON.parse(body);

                let i=0;
                while(parsedData.features[i] != null){
                    arrayBundeslaender.push(new Bundesland(parsedData.features[i].attributes.OBJECTID_1, parsedData.features[i].attributes.LAN_ew_GEN))
                    i++;
                }
                resolve(arrayBundeslaender);
            });
        });
    })
}
getBundeslaender((array)=>{array})
module.exports = getBundeslaender;