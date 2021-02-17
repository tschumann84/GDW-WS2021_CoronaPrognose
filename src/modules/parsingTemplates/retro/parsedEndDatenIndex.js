const ST = require('stjs');

function parsedEndDatenIndex(array, link, parent) {
    return new Promise((resolve, reject) => {
        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Enddatum": "{{this}}",
                    "_links": {
                        "self": {"href": link + "{{this}}"},
                        "parent": {"href": parent}
                    }
                }
            })
            .root();
        resolve(parsed);
    })
}
module.exports = parsedEndDatenIndex;