'use strict';

const logger = function (opt) {
    if (!opt) {
        throw new Error('Keine Optionen angegeben.');
    }
    if (!opt.level) {
        throw new Error('Logginglevel fehlt.');
    }

    return function (req, res, next) {
        console.log(`(${opt.level}) ${req.method} Path:"${req.path}"`);
        next();
    };
};


// const logger = function (req, res, next) {
//     console.log(`${req.method} ${req.path}`);
//     next();
// };

module.exports = logger;

// Middelware, wird immer aufgerufen
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`);
//     next();
// });
