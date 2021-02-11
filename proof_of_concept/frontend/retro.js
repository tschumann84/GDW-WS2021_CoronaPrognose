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

router.get('/:tage',(req,res)=>{
    res.header("Content-Type", contenttype);
    res.send(beispielsarray);
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