const ST = require('stjs');

function parsedLandkreisIndex(array){
    return new Promise((resolve,reject)=>{
        try {
            const parsed = ST.select({"items": array})
                .transformWith({
                    "{{#each items}}": {
                        "Landkreis": "{{this.Landkreis}}", "IDLandkreis": "{{this.IdLandkreis}}",
                        "_links": {
                            "self": {"href": "/retro/landkreis/{{IdLandkreis}}"},
                            "parent": {"href": "/retro"}
                        }
                    }
                })
                .root();
            resolve(parsed);
        }catch {
            reject(new Error('500 Internal Server Error (parsedLandkreisIndex)'));
        }
    })
}
module.exports = parsedLandkreisIndex;