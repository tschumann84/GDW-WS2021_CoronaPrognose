// Funktion gibt das übergebene Datum +/- Tage im Format YYYY-mm-dd zurück.
function dateCalc(datum, tage){
    let MyDate = datum;
    let MyDateString;

    MyDate.setDate(MyDate.getDate()+tage);

    MyDateString = (
        (MyDate.getFullYear() + '-')
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
        + ('0' + MyDate.getDate()).slice(-2))
    ;
    return(MyDateString);
}
module.exports = dateCalc;