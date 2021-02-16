const express = require('express');
const router = express.Router();

//Templates
const parsedSimpleIndex = require('../modules/parsingTemplates/retro/parsedSimpleIndex');
const parsedLandkreisIndex = require('../modules/parsingTemplates/retro/parsedLandkreisIndex');
const parsedBundeslandIndex = require('../modules/parsingTemplates/retro/parsedBundeslandIndex');
const parsedDatenIndex = require('../modules/parsingTemplates/retro/parsedDatenIndex');

//Ressourcen
const getRetroHome = require('../modules/getRetroHome');
const getLandkreise = require('../modules/rkiapimodules/getLandkreise');
const getBundeslaender = require('../modules/rkiapimodules/getBundeslaender');
const getStartDates = require('../modules/getStartDates');
const getStartDatesVar = require('../modules/getStartDatesVar');
let daten = getStartDates();

//Vaildation
const checkBundeslandID = require('../modules/validation/checkBundeslandID');
const checkDatumID = require('../modules/validation/checkDatumID');
const checkLandkreisID = require('../modules/validation/checkLandkreisID');

router.get('/',(req,res)=>{
    getRetroHome()
        .then(array => parsedSimpleIndex(array))
        .then(parsedObjects => res.send(parsedObjects))
});

router.get('/landkreis',(req,res)=>{
    getLandkreise()
        .then(array => parsedLandkreisIndex(array))
        .then(parsedObjects => res.send(parsedObjects))
});

router.get('/landkreis/:id',(req,res)=>{
    checkLandkreisID(req.params.id)
        .then(landkreisExisting => parsedDatenIndex(daten, `/retro/landkreis/${req.params.id}/`,'/retro/landkreis'))
        .then(parsedObjects => res.send(parsedObjects))
        .catch(err => res.send(err.toString()))
});
/*
router.get('/landkreis/:id/:Startdatum',(req,res)=> {
    checkLandkreisID(req.params.id)
        .then(landkreisExisting => checkDatumID(req.params.Startdatum, daten))
        .then(datumscheck => res.send("Hier fehlt Thomas."))
        .catch(err => res.send(err.toString()))
});
*/
router.get('/landkreis/:id/:Startdatum',(req,res)=> {
    let neuesArray = getStartDatesVar(req.params.Startdatum)
    console.log(neuesArray);
    checkLandkreisID(req.params.id)
        .then(datumscheck2 => checkDatumID(req.params.Startdatum, daten))
        .then(diesdas => parsedDatenIndex(neuesArray, `/retro/landkreis/${req.params.id}/${req.params.Startdatum}/`,`/retro/landkreis/${req.params.id}`))
        .then(parsedObjects => res.send(parsedObjects))
        .catch(err => res.send(err.toString()))
});

router.get('/landkreis/:id/:Startdatum/:Enddatum',(req,res)=> {
    let neuesArray = getStartDatesVar(req.params.Startdatum)
    console.log(neuesArray);
    checkLandkreisID(req.params.id)
        .then(datumscheck2 => checkDatumID(req.params.Startdatum, daten))
        .then(datumscheck2 => checkDatumID(req.params.Enddatum, neuesArray))
        .then(diesdas => parsedDatenIndex(neuesArray, `/retro/landkreis/${req.params.id}/${req.params.Startdatum}/${req.params.Enddatum}/`,`/retro/landkreis/${req.params.id}/${req.params.Startdatum}`))
        .then(parsedObjects => res.send("Hier fehlt Thomas"))
        .catch(err => res.send(err.toString()))
});

router.get('/bundesland',(req,res)=>{
    getBundeslaender()
        .then(array => parsedBundeslandIndex(array))
        .then(parsedObjects => res.send(parsedObjects))
});

router.get('/bundesland/:id',(req,res)=>{
    checkBundeslandID(req.params.id)
        .then(bundeslandExisting => parsedDatenIndex(daten, `/retro/bundesland/${req.params.id}/`,'retro/bundesland'))
        .then(parsedObjects => res.send(parsedObjects))
        .catch (err => res.send(err.toString()))
});

router.get('/bundesland/:id/:Startdatum',(req,res)=> {
    checkBundeslandID(req.params.id)
        .then(bundeslandExisting => checkDatumID(req.params.Startdatum, daten))
        .then(datumscheck => res.send("Hier fehlt Thomas."))
        .catch(err => res.send(err.toString()))
});

router.get('/bundesweit',(req,res)=>{
    parsedDatenIndex(daten, `/retro/bundesweit/`,'/retro')
        .then (parsedObjects => res.send(parsedObjects))
});

router.get('/bundesweit/:id',(req,res)=>{
    checkDatumID(req.params.id,daten)
        .then(datumscheck => res.send("Hier fehlt Thomas."))
        .catch(err => res.send(err.toString()))
});

module.exports = router;