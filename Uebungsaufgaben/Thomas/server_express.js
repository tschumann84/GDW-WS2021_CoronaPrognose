const http = require('http');

/* Express per require einbinden "https://www.expressjs.com"
* express install per npm aus node.js mit "npm install express", beachte das aktuelle Verzeichnis der Installation
* Installation erzeugt "node_modules" Ordner unter dem alle Module die express benötigt und sich selbst installiert werden.
*/ 
const express = require('express');
const app = express();

// Logging Funktion aus module importieren
const logger = require('./module/server_express_logger');
app.use(logger({level: 'info'}));

/* STATIC
*/
const path = require('path');
const static_data_directory = path.join(__dirname, 'static_data');

// app.use((req, res, next) => {
//     express.static('/', express.static(static_data_directory));
//     next();
// });
app.use('/', express.static(static_data_directory));

/* ROUTEN:
* Funktionen für GET, POST, PUT, DELETE
**
* res.status()
* Statuscodes bsp.:
* 200 OK
* 201 CREATED
* 202 ACCEPTED
* 204 NO CONTENT
* 301 MOVED PERMANENTLY
* 302 MOVED TEMPORARILY
* 303 SEE OTHER
* 400 BAD REQUEST
* 401 UNAUTHORIZED
* 403 FORBIDDEN
* 404 NOT FOUND
* 405 METHOD NOT ALLOWED
* ...
*/

app.get('/', (req, res) => {
    res.send('Hallo Node.js! [mit express]');
});

app.get('/janedoe', (req, res) => {
    const person = {
        firstName: "Jane",
        lastName: "Doe"
    };
    res.send(person);
});

app.get('/500', (req, res) => {
    res.status('500').send('Interner Serverfehler').end();
});

// Optionale Angaben der URL können mit ? deklariert werden
app.get('/date/:year/:month/:day?', (req, res) => {
/*    
    const   year = req.params.year,
            month = req.params.month,
            day = req.params.day || 1;
*/
    if (req.query.format === 'html') {
        res.send(`<h1>${req.params.day}.${req.params.month}.${req.params.year}</h1>`);
    } else { // oder return
/* URL wird als String interpretiert, durch mathop lässt es sich in eine Zahl wandeln
* [NUMBER] +- [STRING] = STRING
* [STRING] +- [NUMBER] = NUMBER
*/
        res.send({
            year: req.params.year - 0,
            month: req.params.month - 0,
            day: req.params.day - 0 || 0 //Wenn nicht angegeben dann || fallback 0
        });
    }

});


const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server lauscht auf Port 3000');
});