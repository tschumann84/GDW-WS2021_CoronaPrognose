const ST = require('stjs');

function parsedSimpleIndex(array, callback){
    const parsed = ST.select({"items": array})
        .transformWith({
            "{{#each items}}": {
                "Titel": "{{this.titel}}",
                "_links": {
                    "self": {"href": "/prog/{{this.link}}"},
                    "parent": {"href": "/"}
                }
            }
        })
        .root();
    callback(parsed);
}
module.exports = parsedSimpleIndex;