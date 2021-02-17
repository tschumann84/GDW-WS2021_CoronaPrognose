const ST = require('stjs');

function parsedPrognose(array, link, parent) {
    return new Promise((resolve, reject) => {
        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Warnung": "Bei der folgenden Ressource handelt es sich um eine selbst erstellte Prognose. Grundlage der Berechnung ist die Romberg Integration.",
                    "Infizierte": "{{this.infizierte}}",
                    "Inzidenz": "{{this.inzidenz}}",
                    "Ampel": "{{this.ampel}}",
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
module.exports = parsedPrognose;