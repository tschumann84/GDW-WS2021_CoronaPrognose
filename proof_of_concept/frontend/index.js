const express = require('express');
const app = express();

const home = require('./home');
const prog = require('./prog');
const retro = require('./retro');

app.use('/',home);
app.use('/prog', prog);
app.use('/retro', retro);

//Port
const port = process.env.PORT || 80;
app.listen(port, ()=> console.log(`Listening on Port ${port}`));