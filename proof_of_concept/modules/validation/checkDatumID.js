function checkDatumID(datum, daten){
    for (let i = 0; i < daten.length; i++){
        if (datum === daten[i]){
            return true
        }
    }
}
module.exports = checkDatumID;