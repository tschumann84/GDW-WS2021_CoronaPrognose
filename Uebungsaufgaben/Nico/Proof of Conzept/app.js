`use strict`

const http = require(`http`);
const https = require('https');
const express = require('express');
const fs = require('fs');


const app = express();

const server = http.createServer(app);

server.listen(3000, ()=> {
    console.log('Server is listening on Port 3000.');
});

let url = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/Coronaf%C3%A4lle_in_den_Bundesl%C3%A4ndern/FeatureServer/0/query?where=1%3D1&outFields=OBJECTID_1,LAN_ew_AGS,LAN_ew_GEN,LAN_ew_EWZ,OBJECTID,Fallzahl,Aktualisierung,AGS_TXT,GlobalID,faelle_100000_EW,Death,cases7_bl_per_100k,cases7_bl,death7_bl,cases7_bl_per_100k_txt,LAN_ew_BEZ&outSR=4326&returnGeometry=false&f=json";
//let url = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=15000&f=json";
let json;
let anzahlFall=0;


https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            json = JSON.parse(body);
            console.log(json);
            for(i = 0; i<json.features.length; i++) {
                anzahlFall += json.features[i].attributes.Fallzahl;
            }
            console.log(anzahlFall)

// write JSON string to a file
            fs.writeFile('user.json', JSON.stringify(json), (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            });

        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

app.get('/', (req, res) => {
    res.send(json.features[1].attributes);
});

