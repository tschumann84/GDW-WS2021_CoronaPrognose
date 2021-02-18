const ST = require('stjs');

function parsedHome(array){
    return new Promise((resolve, reject)=> {
        try {
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
        }catch {
            reject(new Error('500 Internal Server Error (parsedHome)'));
        }
    })
}
module.exports = parsedHome;