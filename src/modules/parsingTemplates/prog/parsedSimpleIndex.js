const ST = require('stjs');

function parsedSimpleIndex(array){
    return new Promise((resolve, reject)  => {
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
        resolve(parsed);
    })
}
module.exports = parsedSimpleIndex;