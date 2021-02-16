const express = require('express');
const router = express.Router()
const ST = require('stjs');


const contenttype = 'application/hal+json';


router.get('/',(req,res)=>{
    res.header("Content-Type", contenttype);

    function Inhalt(titel, link) {
        this.titel = titel;
        this.link = link;
    }
    let inhalt = [];

    inhalt.push(new Inhalt('Retrospektive Bundesweit', 'bundesweit'));
    inhalt.push(new Inhalt('Retrospektive Bundesland', 'bundesland'));
    inhalt.push(new Inhalt('Retrospektive Landkreis', 'landkreis'));

    const parsed = ST.select({"items": inhalt})
        .transformWith({
            "{{#each items}}": {
                "Titel": "{{this.titel}}",
                "_links": {
                    "self": {"href": "/retro/{{this.link}}"}
                }
            }
        })
        .root();
    res.send(parsed);
});

router.get('/landkreis',(req,res)=>{
    res.header("Content-Type", contenttype);
    const getLandkreise = require('../modules/rkiapimodules/getLandkreise');

    getLandkreise((array)=>{

        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Landkreis": "{{this.Landkreis}}", "IDLandkreis": "{{this.IdLandkreis}}",
                    "_links": {
                        "self": {"href": "/retro/landkreis/{{IdLandkreis}}"}
                    }
                }
            })
            .root();
        res.send(parsed);

    });
});


router.get('/bundesland',(req,res)=>{
    res.header("Content-Type", contenttype);
    const getBundeslaender = require('../modules/rkiapimodules/getBundeslaender');

    getBundeslaender((array)=>{

        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Bundesland": "{{this.Bundesland}}", "IDBundesland": "{{this.IdBundesland}}",
                    "_links": {
                        "self": {"href": "/retro/bundesland/{{IdBundesland}}"}
                    }
                }
            })
            .root();
        res.send(parsed);

    });
});

module.exports = router;