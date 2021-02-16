// Modul zum Speichern der Daten aus der API in eine JSON Datei.
// Datei wird nach Datum benannt.
const save_data = function(req, dest){
    const fs = require('fs');
    const https = require('https');
    const today = require('./today');

    https.get(req,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            let parsedData = JSON.parse(body);
            try {
                fs.writeFile(__dirname+`/../${dest}/${today('.json', 0)}`, JSON.stringify(parsedData), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
            } catch (error) {
                console.error(error.message);
            }
        });
    });
}
module.exports = save_data;