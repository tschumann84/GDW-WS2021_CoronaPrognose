//Aufgabe 1
//Meinen Namen ausgeben
//const, da man es nicht ändern soll
const name = "Nico Justin Gerasch";
console.log(name);

//Aufgabe 2
const bewertung = 5;
let aktuellebewertung;
let anzahlvonbewerbung;
//Variabelen deklaiert
//konstante deklariert
aktuellebewertung = 3;
anzahlvonbewerbung = 12;
//Konsolenausgabe der Variabelen
console.log("Aktuelle Bewertung: " + aktuellebewertung + " von möglichen "+bewertung+" Sternen.");
console.log("Bei dieser Anzahl von Bewertungen: " + anzahlvonbewerbung);
//Simulation von einer neuen Bewertung
anzahlvonbewerbung++;
aktuellebewertung = 2.8;
//Egal welcher Typ es vorher war.
console.log("Aktuelle Bewertung: " + aktuellebewertung + " von möglichen "+bewertung+" Sternen.");
console.log("Bei dieser Anzahl von Bewertungen: " + anzahlvonbewerbung);
//bewertung = 6;
//Uncaught TypeError: Assignment to constant variable.
//Programm wird abgebrochen

//Aufgabe 3
const Sterne = 5;
let aktuelleSterne;
let anzahlvonSternen;
let answer = 0;

const readline = require(`readline`);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function nachBenutzernameFragen() {
    rl.question("Geben Sie ihren Benutzernamen an: ", (answer) => {
        let name = answer;
        console.log(name);
        rl.close();
    });
}
nachBenutzernameFragen();
nachSterneFragen();

function nachSterneFragen(){
rl.question("Geben Sie ihre Bewertung von 0 bis 5 Sternen an: ",(answer) => {
    console.log(typeof answer);
    if(answer <= Sterne && answer >= 0){
        anzahlvonSternen++;
        rl.close();
    }else{
        console.log(new Error("Ihre Bewertung lag au?erhalb des Wertebereiches! Versuchen Sie es erneut!"));
        nachSterneFragen();
    }
})
}

//console.log("Aktuelle Bewertung: " + aktuelleSterne + " von möglichen "+Sterne+" Sternen.");
//console.log("Bei dieser Anzahl von Bewertungen: " + anzahlvonSternen);