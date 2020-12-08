`use strict`;

const http = require(`http`),
    path = require(`path`);

const bodyParser = require(`body-parser`);
const express = require(`express`);

const app = express();


//cors() ist eine Funtion die aufgerufen wird
app.use(cors());

app.use(bodyParser.json({
    //limit: `100kb`,
    //strict: false
}));
//Middelware ist sogesehen das hier
app.use((req, res, next) => {
   //...
    next();
});


app.use(`/`, express.static(path.join(__dirname, `client`)));
//app.use(`/`, express.static(path.join(__dirname, `someOtherClient`)));
//Cookies dürfen nur by https mitgesendet werden
app.get('/hello', (req, res) =>{
  res.cookie(`user`, `jane.doe`, {
      maxAge: 24 * 60 * 60 * 1000,
      //secure: true
    }).send(`Hallo World!`);
});

app.get(`/articles`,(req, res) =>{
    res.send([
        { id: 1, titel: `foo` }
        ]);
});
app.get(`/articles`,(req, res) =>{
   res.send(`Hallo ${req.body.user}!`);
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server listening on port 3000.`);
});