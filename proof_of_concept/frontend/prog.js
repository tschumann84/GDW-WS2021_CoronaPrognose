const express = require('express');
const router = express.Router()
const contenttype = 'application/hal+json';

const beispielsarray = [
    {id: 1, name: 'coruse1'},
    {id: 3, name: 'coruse3'}
];

router.get('/',(req,res)=>{
    res.header("Content-Type", contenttype);
    res.send(beispielsarray);
});

router.get('/landkreis',(req,res)=>{
    res.header("Content-Type", contenttype);
    const getLandkreise = require('../modules/getLandkreise');

    getLandkreise((array)=>{

        res.send(array);
    });
});

router.get('/:tage',(req,res)=>{
    res.header("Content-Type", contenttype);
    const beispiel = beispielsarray.find(c => c.id === parseInt(req.params.tage));
    if(!beispiel) res.status(404).send('Beispiel nicht gefunden.')
    res.send(beispiel);
});

router.get('/:tage/:IdBundesland',(req,res)=>{
    res.header("Content-Type", contenttype);
    res.send(beispielsarray);
});

router.get('/:tage/:IdLandkreis',(req,res)=>{
    res.header("Content-Type", contenttype);
    res.send(beispielsarray);
});

module.exports = router;