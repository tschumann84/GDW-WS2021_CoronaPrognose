/* Modul http laden und http [Variabel] zuweisen
* Server http erstellen 
*   - Header mit Statuscode und Objekt mit content-type 
*   - Ausgabe des Servers + Aufruf Methode + Aufgerufenen URL
*   - Beenden der Ausgabe
* Server Port öffnen
*/
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.write("Hallo HTTP!!! "  + req.method + ' ' + req.url);
    res.end();
});

server.listen(3000, function(){
    console.log("Server lauscht auf Port 3000.");
});