const express = require('express');
const router = express.Router()
const contenttype = 'application/hal+json';


router.get('/', (req, res) => {
    res.header("Content-Type", contenttype);
    res.send('Hello World');
});

module.exports = router;