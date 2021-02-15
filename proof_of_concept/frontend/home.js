const express = require('express');
const router = express.Router()
const contenttype = 'application/hal+json';
const ST = require('stjs');

function erstelleInhaltsverzeichnis(callback){
    let arrayInhaltsverzeichnis = [
        ['Prognose','prog'],
            ['Retrovision','retro']
    ];
    callback(arrayInhaltsverzeichnis)
}

router.get('/',(req,res)=>{
    res.header("Content-Type", contenttype);

    function Inhalt(titel, link) {
        this.titel = titel;
        this.link = link;
    }
    let inhalt = [];

    inhalt.push(new Inhalt('Prognose', 'prog'));
    inhalt.push(new Inhalt('Retrovision', 'retro'));

    const parsed = ST.select({"items": inhalt})
            .transformWith({
                "{{#each items}}": {
                    "Titel": "{{this.titel}}",
                    "_links": {
                        "self": {"href": "/{{this.link}}"}
                    }
                }
            })
            .root();
        res.send(parsed);
    console.log(arrayInhaltsverzeichnis[0][1])

});

module.exports = router;