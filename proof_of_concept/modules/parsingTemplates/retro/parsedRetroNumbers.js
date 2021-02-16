const ST = require('stjs');

function parsedRetroNumbers(array, link, parent){
    return new Promise((resolve, reject)  => {
        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Anzahl Fälle": "{{this.anzahlFall}}",
                    "Anzahl Todesfall": "{{this.anzahlTodesfall}}",
                    "Anzahl Genesen": "{{this.anzahlGenesen}}",
                    "7-Tage-Inzidenz (Bei weniger als 7 Tagen hochgerechnet)": "{{this.inzidenz}}",
                    "_links": {
                        "self": {"href": link},
                        "parent": {"href": parent}
                    }
                }
            })
            .root();
        resolve(parsed);
    })
}
module.exports = parsedRetroNumbers;