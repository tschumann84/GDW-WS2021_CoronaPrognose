const express = require('express');
const router = express.Router();

//Templates
const parsedSimpleIndex = require('../modules/parsingTemplates/prog/parsedSimpleIndex');
const parsedLandkreisIndex = require('../modules/parsingTemplates/prog/parsedLandkreisIndex');
const parsedBundeslandIndex = require('../modules/parsingTemplates/prog/parsedBundeslandIndex');
const parsedDatenIndex = require('../modules/parsingTemplates/prog/parsedDatenIndex');
const parsedPrognose = require('../modules/parsingTemplates/prog/parsedPrognose');

//Ressourcen
const getProgHome = require('../modules/getProgHome');
const getLandkreise = require('../modules/rkiapimodules/getLandkreise');
const getBundeslaender = require('../modules/rkiapimodules/getBundeslaender');
const getStartDates = require('../modules/getStartDates');
const prognose = require('../modules/prognose');
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
        .then(() => parsedDatenIndex(daten, `/prog/landkreis/${req.params.id}/`,'/prog/landkreis'))
        .then(parsedObjects => res.send(parsedObjects))
        .catch(err => res.status(404).send(err.toString() + ' Ressource not found'))
});

router.get('/landkreis/:id/:Startdatum',(req,res)=> {
    checkLandkreisID(req.params.id)
        .then(() => checkDatumID(req.params.Startdatum, daten))
        .then(() => prognose(1,req.params.Startdatum,req.params.id))
        .then(prognose => parsedPrognose(prognose,`/prog/landkreis/${req.params.id}/${req.params.Startdatum}`,`/prog/landkreis/${req.params.id}/`))
        .then(parsedPrognose => res.send(parsedPrognose))
        .catch(err => res.status(404).send(err.toString() + ' Ressource not found'))
});

router.get('/bundesland',(req,res)=>{
    getBundeslaender()
        .then(array => parsedBundeslandIndex(array))
        .then(parsedObjects => res.send(parsedObjects))
});

router.get('/bundesland/:id',(req,res)=>{
    checkBundeslandID(req.params.id)
        .then(() => parsedDatenIndex(daten, `/prog/bundesland/${req.params.id}/`,'/prog/bundesland'))
        .then(parsedObjects => res.send(parsedObjects))
        .catch (err => res.status(404).send(err.toString() + ' Ressource not found'))
});

router.get('/bundesland/:id/:Startdatum',(req,res)=> {
    checkBundeslandID(req.params.id)
        .then(() => checkDatumID(req.params.Startdatum, daten))
        .then(() => prognose(2,req.params.Startdatum,req.params.id))
        .then(prognose => parsedPrognose(prognose,`/prog/bundesland/${req.params.id}/${req.params.Startdatum}`,`/prog/bundesland/${req.params.id}/`))
        .then(parsedPrognose => res.send(parsedPrognose))
        .catch(err => res.status(404).send(err.toString() + ' Ressource not found'))
});

router.get('/bundesweit',(req,res)=>{
    parsedDatenIndex(daten, `/prog/bundesweit/`,'/prog')
        .then (parsedObjects => res.send(parsedObjects))
});

router.get('/bundesweit/:Startdatum',(req,res)=>{
    checkDatumID(req.params.Startdatum,daten)
        .then(() => prognose(3,req.params.Startdatum,null))
        .then(prognose => parsedPrognose(prognose,`/prog/bundesweit/${req.params.Startdatum}`,`/prog/bundesweit/`))
        .then(parsedPrognose => res.send(parsedPrognose))
        .catch(err => res.status(404).send(err.toString() + ' Ressource not found'))
});

module.exports = router;