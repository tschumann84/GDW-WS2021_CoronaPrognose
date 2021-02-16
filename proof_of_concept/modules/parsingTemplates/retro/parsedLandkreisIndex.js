const ST = require('stjs');

function parsedLandkreisIndex(array){
    return new Promise((resolve,reject)=>{
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
    })
}
module.exports = parsedLandkreisIndex;