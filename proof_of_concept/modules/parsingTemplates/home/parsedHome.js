const ST = require('stjs');

function parsedHome(array, callback){
    const parsed = ST.select({"items": array})
        .transformWith({
            "{{#each items}}": {
                "Titel": "{{this.titel}}",
                "_links": {
                    "self": {"href": "/{{this.link}}"}
                }
            }
        })
        .root();
    callback(parsed);
}
module.exports = parsedHome;