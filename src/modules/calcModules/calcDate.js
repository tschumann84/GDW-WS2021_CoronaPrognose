// Funktion gibt ein Datum Objekt im Format YYYY-mm-dd zurück.
function calcDate(datum){
    let MyDate = datum;
    let MyDateString;

    MyDateString = (
        (MyDate.getFullYear() + '-')
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
        + ('0' + MyDate.getDate()).slice(-2))
    ;
    return(MyDateString);

}
module.exports = calcDate;