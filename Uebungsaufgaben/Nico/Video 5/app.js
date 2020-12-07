`use strict`;

const http = require(`http`),
    path = require(`path`);

const express = require(`express`);

const app = express();

app.use(`/`, express.static(path.join(__dirname, `client`)));
//app.use(`/`, express.static(path.join(__dirname, `someOtherClient`)));

app.get(`/articles`,(req, res) =>{
    res.send([
        { id: 1, titel: `foo` }
        ]);
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server listening on port 3000.`);
});