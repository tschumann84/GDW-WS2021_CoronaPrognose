const ST = require('stjs');

function parsedHome(array){
    return new Promise((resolve, reject)=> {
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
        resolve(parsed);
    })
}
module.exports = parsedHome;