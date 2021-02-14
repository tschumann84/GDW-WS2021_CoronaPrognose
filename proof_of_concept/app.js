const http = require(`http`);
const fs = require('fs');
const express = require('express');
const save_data = require('./modules/save_data');
const today = require('./modules/today');
const logd = require('./modules/logd');

const app = express();
const kza = "kennzahlenarchiv";
app.use(logd({level: 'info'}));

// Link zur RKI API
let url = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID_1,LAN_ew_AGS,LAN_ew_GEN,LAN_ew_EWZ,OBJECTID,Fallzahl,Aktualisierung,AGS_TXT,GlobalID,faelle_100000_EW,Death,cases7_bl_per_100k,cases7_bl,death7_bl,cases7_bl_per_100k_txt,LAN_ew_BEZ&outSR=4326&returnGeometry=false&f=json";


// Daten der RKI werden mit dem heutigen Datum gespeichert.
save_data(url, kza);

//Daten welche ins Archiv gespeichert wurden, werden wieder ausgelesen.
let rawData = fs.readFileSync(__dirname+`/${kza}/${today('.json', 1)}`);
let kennzahl = JSON.parse(rawData);

// Beispielalgorithmus - Berechnung der gesamt Infizierten in Deutschland.
let anzahlFall=0;
for(let i = 0; i<kennzahl.features.length; i++) {
    anzahlFall += kennzahl.features[i].attributes.Fallzahl;
}

// Darstellung des Ergebnisses via HTML
app.get('/', (req, res) => {
    if(req.query.format === 'html'){
        return res.send(`<h1>Corona Ampel - PoC</h1>
                            <h2>Grundlagen des Web WS2020/2021</h2>
                            Gesamtinfizierte in Deutschland: ${anzahlFall}
`);
    }else{
        res.send(anzahlFall);
    }
});

// Starten des Webdienstes
const server = http.createServer(app);

// Server lauscht auf Port 3000
server.listen(3000, ()=> {
    console.log('Server is listening on Port 3000.');
});