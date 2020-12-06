'use strict';
//Objekt reverenz
const http = require('http');
/*
GET, POST, PUT, DELETE
 */


//Funktion
const express = require('express');
//Funktion
const app = express();

/*app.get('/', (req, res) => {
    const person = {
        firstName: 'Jane',
        lastName: 'Doe'
    };


    res.send(person);


    res.status(500).send('Internal server error');
    res.end();

});*/

app.get('/blog/:year/:month/:day?', (req, res) => {
    if(req.query.format === 'html'){
        res.send(`<h1>${req.params.day}.${req.params.month}.${req.params.year} </h1>`);
    }

   res.send({
       //-0, damit die Zahlen nicht als String gesehen werden!
       //von Zahl zu String dann 23 + '' machen!
      year: req.params.year - 0,
       month: req.params.month - 0,
       day: req.params.day || '01' - 0
   });
});

const server = http.createServer(app);

server.listen(3000, ()=> {
    console.log('Server is listening on Port 3000.');
});
