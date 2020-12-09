'use strict';

const logd = function (opt) {
    if (!opt) {
        throw new Error('[logd] Keine Optionen angegeben.');
    }
    if (!opt.level) {
        throw new Error('[logd] Logginglevel fehlt.');
    }

    return function (req, res, next) {
        console.log(`(${opt.level}) ${req.method} Path:"${req.path}"`);
        next();
    };
};

module.exports = logd;