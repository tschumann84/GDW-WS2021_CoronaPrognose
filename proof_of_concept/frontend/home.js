const express = require('express');
const router = express.Router();
const contenttype = 'application/hal+json';

//templates
const parsedHome = require('../modules/parsingTemplates/home/parsedHome');
const getHome = require('../modules/getHome.js');

router.get('/',(req,res)=>{
    res.header("Content-Type", contenttype);
    getHome((inhalt)=>{
        parsedHome(inhalt,(parsed)=>{res.send(parsed);});
    })
});

module.exports = router;