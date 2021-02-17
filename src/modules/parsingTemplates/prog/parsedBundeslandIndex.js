const ST = require('stjs');

function parsedBundeslandIndex(array) {
    return new Promise((resolve, reject) => {
        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Bundesland": "{{this.Bundesland}}", "IDBundesland": "{{this.IdBundesland}}",
                    "_links": {
                        "self": {"href": "/prog/bundesland/{{IdBundesland}}"},
                        "parent": {"href": "/prog"}
                    }
                }
            })
            .root();
        resolve(parsed);
    })
}
module.exports = parsedBundeslandIndex;