const express = require('express');
const router = express.Router()
const contenttype = 'application/hal+json';

//Templates
const parsedSimpleIndex = require('../modules/parsingTemplates/prog/parsedSimpleIndex');
const parsedLandkreisIndex = require('../modules/parsingTemplates/prog/parsedLandkreisIndex');
const parsedBundeslandIndex = require('../modules/parsingTemplates/prog/parsedBundeslandIndex');
const parsedDatenIndex = require('../modules/parsingTemplates/prog/parsedDatenIndex');

//Ressourcen
const getProgHome = require('../modules/getProgHome');
const getLandkreise = require('../modules/rkiapimodules/getLandkreise');
const getBundeslaender = require('../modules/rkiapimodules/getBundeslaender');
const getStartDates = require('../modules/getStartDates');
let daten = getStartDates();

//Vaildation
const checkBundeslandID = require('../modules/validation/checkBundeslandID');
const checkDatumID = require('../modules/validation/checkDatumID');
const checkLandkreisID = require('../modules/validation/checkLandkreisID');

router.get('/',(req,res)=>{
    res.header("Content-Type", contenttype);
    getProgHome((inhalt)=>{
        parsedSimpleIndex(inhalt, (parsed)=>{res.send(parsed);})
    })
});

router.get('/landkreis',(req,res)=>{
    res.header("Content-Type", contenttype);
    getLandkreise((array)=>{
        parsedLandkreisIndex(array, (parsed)=>{res.send(parsed);})
    });
});

router.get('/landkreis/:id',(req,res)=>{
    res.header("Content-Type", contenttype);

    checkLandkreisID(req.params.id, (landkreisExisting)=>{
        if(landkreisExisting){
            parsedDatenIndex(daten, `/prog/landkreis/${req.params.id}/`,'/prog/landkreis',(parsed)=>{res.send(parsed);})
        }
        else {
            res.status(400).send('Error 400');
        }
    })
});

router.get('/landkreis/:id/:Startdatum',(req,res)=> {
    checkLandkreisID(req.params.id, (landkreisExisting)=>{
        if(landkreisExisting && checkDatumID(req.params.Startdatum,daten)){
            res.send("Hier fehlt Thomas. ");
        }
        else {
            res.status(400).send('Ressource nicht vorhanden.');
        }
    })
});

router.get('/bundesland',(req,res)=>{
    res.header("Content-Type", contenttype);

    getBundeslaender((array)=>{
        parsedBundeslandIndex(array, (parsed)=>{res.send(parsed);})
    });
});

router.get('/bundesland/:id',(req,res)=>{
    res.header("Content-Type", contenttype);

    checkBundeslandID(req.params.id, (bundeslandExisting)=>{
        if(bundeslandExisting){
            parsedDatenIndex(daten, `/prog/bundesland/${req.params.id}/`,'prog/bundesland',(parsed)=>{res.send(parsed);})
        }
        else {
            res.status(400).send('Ressource nicht verfügbar.');
        }
    })
});

router.get('/bundesland/:id/:Startdatum',(req,res)=> {
    checkBundeslandID(req.params.id, (bundeslandExisting)=>{
        if(bundeslandExisting && checkDatumID(req.params.Startdatum,daten)){
            res.send("Hier fehlt Thomas. ");
        }
        else {
            res.status(400).send('Ressource nicht vorhanden.');
        }
    })
});

router.get('/bundesweit',(req,res)=>{
    res.header("Content-Type", contenttype);
    parsedDatenIndex(daten, `/prog/bundesweit/`,'/prog',(parsed)=>{res.send(parsed);})
});

router.get('/bundesweit/:id',(req,res)=>{
    res.header("Content-Type", contenttype);

    if(checkDatumID(req.params.id,daten)){
        res.send("Hier fehlt Thomas.");
    }
    else {
        res.status(400).send('Ressource nicht vorhanden.');
    }
});

module.exports = router;