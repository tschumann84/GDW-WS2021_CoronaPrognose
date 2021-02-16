const express = require('express');
const router = express.Router();

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
    getProgHome()
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
        .then(landkreisExisting => parsedDatenIndex(daten, `/prog/landkreis/${req.params.id}/`,'/prog/landkreis'))
        .then(parsedObjects => res.send(parsedObjects))
        .catch(err => res.send(err.toString()))
});

router.get('/landkreis/:id/:Startdatum',(req,res)=> {
    checkLandkreisID(req.params.id)
        .then(landkreisExisting => checkDatumID(req.params.Startdatum, daten))
        .then(datumscheck => res.send("Hier fehlt Thomas."))
        .catch(err => res.send(err.toString()))
});

router.get('/bundesland',(req,res)=>{
    getBundeslaender()
        .then(array => parsedBundeslandIndex(array))
        .then(parsedObjects => res.send(parsedObjects))
});

router.get('/bundesland/:id',(req,res)=>{
    checkBundeslandID(req.params.id)
        .then(bundeslandExisting => parsedDatenIndex(daten, `/prog/bundesland/${req.params.id}/`,'prog/bundesland'))
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
    parsedDatenIndex(daten, `/prog/bundesweit/`,'/prog')
        .then (parsedObjects => res.send(parsedObjects))
});

router.get('/bundesweit/:id',(req,res)=>{
    checkDatumID(req.params.id,daten)
        .then(datumscheck => res.send("Hier fehlt Thomas."))
        .catch(err => res.send(err.toString()))
});

module.exports = router;