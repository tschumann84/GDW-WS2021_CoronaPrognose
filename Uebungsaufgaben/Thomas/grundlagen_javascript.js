// Diese Konstante wird für die Berechnung eines Kreisumfangs benötigt
const PI = 3.144592653589793;
const message = "Die Nachricht";
/*
* Nimmt die Variable message entgegen
* und gibt diese auf der Konsole aus
*/

console.log(message);

let radius = 10; // Diese Variable ist nun eine Zahl
radius = "10"; //Jetzt ist diese Variable ein String

/* Variablen
* var = globale Variablen
* let = lokale Variable
* const = lokale Variable, unveränderbar
*/

var x=0;

if(x == 0) {
    console.log(x); // gibt 0 aus

    let a = 5;

    console.log(a); // gibt 5 aus

}

/*
console.log(a);
Diese Ausgabe erzeugt Fehler, da a eine lokale Variable der if(x == 0)
*/

/* Datentypen:
* Boolean
* Null
* Undefined
* Number
* String

weiter Datentypen:
* Symbol
* Object
*/

/* Bedingungen
* if
* else
* else if
*/

/* Schleife
* for 
* while
*/

for (let x=0; x < 10; x++) {
    console.log(x);
}

let y = 0;
while (y < 10) {
    console.log(y);
    y++;
}

/* Funktionen
* function

weiter Funktionen
* Arrow Functions
*/

const log=function(message) {
    console.log(message);
};

const min = function(a, b, callback) {
    if (a > b) {
        callback("a ist größer b");
    } else if (a < b) {
        callback("b ist größer a");
    } else {
        callback("die Werte sind gleich");
    }
}

min(5, 5, log); // gibt aus: "die Werte sind gleich"

// Einbinden des readline moduls
const readline = require(`readline`);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Was ist der Radius des Kreises?", function(answer) {
    console.log(`Answer: ${answer}`); //Ausgabe der eingegebene answer
    rl.close();
});