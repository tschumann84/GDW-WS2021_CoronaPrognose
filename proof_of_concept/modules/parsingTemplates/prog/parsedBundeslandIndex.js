const ST = require('stjs');

function parsedBundeslandIndex(array, callback){
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
    callback(parsed);
}
module.exports = parsedBundeslandIndex;