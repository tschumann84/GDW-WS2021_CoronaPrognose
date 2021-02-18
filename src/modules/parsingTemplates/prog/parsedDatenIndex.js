const ST = require('stjs');

function parsedDatenIndex(array, link, parent) {
    return new Promise((resolve, reject) => {
        try {
            const parsed = ST.select({"items": array})
                .transformWith({
                    "{{#each items}}": {
                        "Startdatum": "{{this}}",
                        "_links": {
                            "self": {"href": link + "{{this}}"},
                            "parent": {"href": parent}
                        }
                    }
                })
                .root();
            resolve(parsed);
        }catch {
            reject(new Error('500 Internal Server Error (parsedDatenIndex)'));
        }
    })
}
module.exports = parsedDatenIndex;