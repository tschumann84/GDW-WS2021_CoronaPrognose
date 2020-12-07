'use strict';
//Objekt reverenz
const http = require('http');
const path = require(`path`);
/*
GET, POST, PUT, DELETE
 */


//Funktion
const express = require('express');

const logger = require(`./logger`);

const clientDirectory = path.join(__dirname, `client`);
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
/*//Logging
const log = function (req){
    console.log(`${req.method} ${req.path}`);
};*/

//Logging
//Reihenfolge ist wichtig!
/*app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});*/
//app.use(logger);
app.use(logger({
    level: `info`
}));

app.use(`/`, express.static(clientDirectory));

app.get('/blog/:year/:month/:day?', (req, res) => {
    //log();//vergisst man schnell wenn man es so löst

    if(req.query.format === 'html'){
        return res.send(`<h1>${req.params.day}.${req.params.month}.${req.params.year} </h1>`);
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
