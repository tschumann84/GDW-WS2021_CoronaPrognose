const express = require('express');
const router = express.Router()
const contenttype = 'application/hal+json';
const ST = require('stjs');
const getStartDates = require('../modules/getStartDates');
let daten = getStartDates();




router.get('/',(req,res)=>{
    res.header("Content-Type", contenttype);

    function Inhalt(titel, link) {
        this.titel = titel;
        this.link = link;
    }
    let inhalt = [];

    inhalt.push(new Inhalt('Prognose Bundesweit', 'bundesweit'));
    inhalt.push(new Inhalt('Prognose Bundesland', 'bundesland'));
    inhalt.push(new Inhalt('Prognose Landkreis', 'landkreis'));

    const parsed = ST.select({"items": inhalt})
        .transformWith({
            "{{#each items}}": {
                "Titel": "{{this.titel}}",
                "_links": {
                    "self": {"href": "/prog/{{this.link}}"}
                }
            }
        })
        .root();
    res.send(parsed);
});

router.get('/landkreis',(req,res)=>{
    res.header("Content-Type", contenttype);
    const getLandkreise = require('../modules/getLandkreise');

    getLandkreise((array)=>{

        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Landkreis": "{{this.Landkreis}}", "IDLandkreis": "{{this.IdLandkreis}}",
                    "_links": {
                        "self": {"href": "/prog/landkreis/{{IdLandkreis}}"}
                    }
                }
            })
            .root();
        res.send(parsed);

    });
});
router.get('/landkreis/:id',(req,res)=>{
    res.header("Content-Type", contenttype);
    const parsed = ST.select({"items": daten})
        .transformWith({
            "{{#each items}}": {
                "Startdatum": "{{this}}",
                "_links": {
                    "self": {"href": "/prog/landkreis/{{this}}"}
                }
            }
        })
        .root();
    const getLandkreise = require('../modules/getLandkreise');
    getLandkreise((array) =>{
        let sended = false;
        for (let i = 0; i < array.length; i++){
            if (req.params.id == array[i].IdLandkreis){
                sended=true;
                let idLandkreis = array[i].IdLandkreis;
                const parsed = ST.select({"items": daten})
                    .transformWith({
                        "{{#each items}}": {
                            "Startdatum": "{{this}}",
                            "_links": {
                                "self": {"href": "/prog/landkreis/"+ idLandkreis +"/{{this}}"}
                            }
                        }
                    })
                    .root();
                res.send(parsed);
            }
        }
        if (sended === false){
            res.status(400).send('Error 400');
        }
    });
});

router.get('/landkreis/:id/:Startdatum',(req,res)=> {
    const getLandkreise = require('../modules/getLandkreise');
    getLandkreise((array) => {
        let sended = false;
        for (let i = 0; i < array.length; i++) {
            if (req.params.id == array[i].IdLandkreis) {
                sended = true;
                let sended2 = false;
                for (let i = 0; i < daten.length; i++){
                    if (req.params.Startdatum === daten[i]){
                        sended2=true;
                        res.send("richtig");
                    }
                }
                if (sended2 === false){
                    res.status(400).send('Error 400');
                }

                }
        }
        if (sended === false) {
            res.status(400).send('Error 400');
        }
    });
});



router.get('/bundesland',(req,res)=>{
    res.header("Content-Type", contenttype);
    const getBundeslaender = require('../modules/getBundeslaender');

    getBundeslaender((array)=>{

        const parsed = ST.select({"items": array})
            .transformWith({
                "{{#each items}}": {
                    "Bundesland": "{{this.Bundesland}}", "IDBundesland": "{{this.IdBundesland}}",
                    "_links": {
                        "self": {"href": "/prog/bundesland/{{IdBundesland}}"}
                    }
                }
            })
            .root();
        res.send(parsed);

    });
});

router.get('/bundesland/:id',(req,res)=>{
    res.header("Content-Type", contenttype);
    const parsed = ST.select({"items": daten})
        .transformWith({
            "{{#each items}}": {
                "Startdatum": "{{this}}",
                "_links": {
                    "self": {"href": "/prog/bundesland/{{this}}"}
                }
            }
        })
        .root();
    const getBundeslaender = require('../modules/getBundeslaender');
    getBundeslaender((array) =>{
        let sended = false;
        for (let i = 0; i < array.length; i++){
            if (req.params.id == array[i].IdBundesland){
                sended=true;
                let idBundesland = array[i].IdBundesland;
                const parsed = ST.select({"items": daten})
                    .transformWith({
                        "{{#each items}}": {
                            "Startdatum": "{{this}}",
                            "_links": {
                                "self": {"href": "/prog/bundesland/"+ idBundesland +"/{{this}}"}
                            }
                        }
                    })
                    .root();
                res.send(parsed);
            }
        }
        if (sended === false){
            res.status(400).send('Error 400');
        }
    });
});

router.get('/bundesland/:id/:Startdatum',(req,res)=> {
    const getBundeslaender = require('../modules/getBundeslaender');
    getBundeslaender((array) => {
        let sended = false;
        for (let i = 0; i < array.length; i++) {
            if (req.params.id == array[i].IdBundesland) {
                sended = true;
                let sended2 = false;
                for (let i = 0; i < daten.length; i++){
                    if (req.params.Startdatum === daten[i]){
                        sended2=true;
                        res.send("richtig");
                    }
                }
                if (sended2 === false){
                    res.status(400).send('Error 400');
                }

            }
        }
        if (sended === false) {
            res.status(400).send('Error 400');
        }
    });
});


router.get('/bundesweit',(req,res)=>{
    res.header("Content-Type", contenttype);
        const parsed = ST.select({"items": daten})
            .transformWith({
                "{{#each items}}": {
                    "Startdatum": "{{this}}",
                    "_links": {
                        "self": {"href": "/prog/bundesweit/{{this}}"}
                    }
                }
            })
            .root();
        res.send(parsed);
    });

router.get('/bundesweit/:id',(req,res)=>{
    res.header("Content-Type", contenttype);
    let sended = false;
    for (let i = 0; i < daten.length; i++){
        if (req.params.id === daten[i]){
            sended=true;
            res.send("richtig");
        }
    }
    if (sended === false){
        res.status(400).send('Error 400');
    }
});


module.exports = router;