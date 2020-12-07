`use strict`

const logger = function (options){
    if(!options){
        throw new Error(`Options are missing.`);
    };
    if(!options.level){
        throw new Error(`Level is missing.`);
    };



    //ab hier eigentliche logger
    return function (req, res, next){
        console.log(`(${options.level}) ${req.method} ${req.path}`);
        next();
    };
};

/*const logger = function (req, res, next){
    console.log(`${req.method} ${req.path}`);
    next();
};*/

module.exports = logger;
