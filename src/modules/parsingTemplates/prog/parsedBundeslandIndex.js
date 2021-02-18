const ST = require('stjs');

function parsedBundeslandIndex(array) {
    return new Promise((resolve, reject) => {
        try {
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
        }catch {
            reject(new Error('500 Internal Server Error (parsedBundeslandIndex)'));
        }
    })
}
module.exports = parsedBundeslandIndex;