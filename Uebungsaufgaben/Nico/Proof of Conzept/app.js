`use strict`

const http = require(`http`);
const https = require('https');
const express = require('express');

const app = express();

const server = http.createServer(app);

server.listen(3000, ()=> {
    console.log('Server is listening on Port 3000.');
});

let url = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
let json;

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            json = JSON.parse(body);
            console.log(json);
            // do something with JSON
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});
app.get('/', (req, res) => {
    res.send(json.features[1].attributes.anzahl);
});
