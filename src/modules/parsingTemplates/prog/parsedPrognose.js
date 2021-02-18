const ST = require('stjs');

function parsedPrognose(array, link, parent) {
    return new Promise((resolve, reject) => {
        try {
            const parsed = ST.select({"items": array})
                .transformWith({
                    "{{#each items}}": {
                        "Warnung": "Bei der folgenden Ressource handelt es sich um eine selbst erstellte Prognose. Grundlage der Berechnung ist die Methode der kleinsten quadratischen Abweichung bei linearer Zeitabhängigkeit einer Größe",
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
        }catch {
            reject(new Error('500 Internal Server Error (parsedPrognose)'));
        }
    })
}
module.exports = parsedPrognose;