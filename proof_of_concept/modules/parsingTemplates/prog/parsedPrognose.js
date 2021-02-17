const ST = require('stjs');

function parsedPrognose(array, link, parent) {
    return new Promise((resolve, reject) => {
        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
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