'use strict';

//Legacy Code
const today = function (filename, zahl) {
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd>1) {
        dd-=zahl;
    }
    if(dd<10) {
        dd='0'+dd;
    }
    if(mm<10) {
        mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    
    return today+filename;
        
};

module.exports = today;

// console.log(today(".json", 1));
