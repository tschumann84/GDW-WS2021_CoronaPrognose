const ST = require('stjs');

function parsedDatenIndex(array, link, parent, callback){
    const parsed = ST.select({"items": array})
        .transformWith({
            "{{#each items}}": {
                "Startdatum": "{{this}}",
                "_links": {
                    "self": {"href": link+ "{{this}}"},
                    "parent": {"href": parent}
                }
            }
        })
        .root();
    callback(parsed);
}
module.exports = parsedDatenIndex;