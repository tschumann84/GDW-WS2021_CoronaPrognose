const ST = require('stjs');

function parsedLandkreisIndex(array, callback){
    const parsed = ST.select({"items": array})
        .transformWith({
            "{{#each items}}": {
                "Landkreis": "{{this.Landkreis}}", "IDLandkreis": "{{this.IdLandkreis}}",
                "_links": {
                    "self": {"href": "/prog/landkreis/{{IdLandkreis}}"},
                    "parent": {"href": "/prog"}
                }
            }
        })
        .root();
    callback(parsed);
}
module.exports = parsedLandkreisIndex;