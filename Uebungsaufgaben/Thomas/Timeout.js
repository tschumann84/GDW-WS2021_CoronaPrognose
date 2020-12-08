/* Funktion Timeout:
* Ist keine Halte funktion, dient eher als Wecker.
* Funktion nutzbar um Ausführungen auf einen späteren Zeitpunkt zu verschieben.
* Node Wartet mit Programmende bis alle Timer abgelaufen sind.
*/
setTimeout(function () {
    console.log('Hallo Welt!');
}, 2*1000);

console.log("Hallo Welt! [ohne Timeout]");

// Lambda schreibweise

setTimeout( () => {
    console.log("Hallo Welt! [Timeoutfunktion mit Lambda");
}, 1*1000);