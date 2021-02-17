//Gibt ein String eines Datums aus, welches entweder +x Tage in der Zukunft liegt oder -x Tage in der Vergangenheit

function getDayCalc(tage){
    let MyDate = new Date();
    let MyDateString;

    MyDate.setDate(MyDate.getDate()+tage);

    MyDateString = (
        (MyDate.getFullYear() + '-')
        + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
        + ('0' + MyDate.getDate()).slice(-2))
    ;
    return(MyDateString);
}
module.exports = getDayCalc;
