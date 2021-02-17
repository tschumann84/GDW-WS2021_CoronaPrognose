// Funktion gibt das übergebene Datum +/- Tage im Format YYYY-mm-dd zurück.
function calcDate(datum){
    let MyDate = datum;
    let MyDateString;

    // console.log(MyDate)

    // MyDate.setDate(datum+tage);

    // console.log(MyDate)

    MyDateString = (
        (MyDate.getFullYear() + '-')
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
        + ('0' + MyDate.getDate()).slice(-2))
    ;
    return(MyDateString);

}
// console.log(calcDate('16.02.2021', -3));
module.exports = calcDate;