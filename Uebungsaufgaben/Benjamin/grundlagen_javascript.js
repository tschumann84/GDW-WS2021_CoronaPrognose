/*
  Aufgabenblatt 1 fertiggestellt von Benjamin Salamon am 06.12.2020
 */

// Aufgabe 1 Den eigenen Namen auf der Konsole ausgeben
console.log("Benjamin Salamon");

// Aufgabe 2 Deklarieren der Variablen und Konstanten
const maxSterne = 5;
let aktuelleAnzahlBewertungen = 0;
let bewertung=0;

//Initialisieren des readLine
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Aufgabe 3 Nutzer soll in der Kommandozeile bewerten können. Falsche Eingaben sollen abgefangen werden.
//manuelleBewertung()
function manuelleBewertung(){
rl.question(`Welche Bewertung würden Sie der App geben? (0 - schlechteste Bewertung bis ${maxSterne} Sterne): `, (answer) => {
  answer = Number(answer)
  if (answer > maxSterne || answer < 0) {
    console.log(new Error("Eingegebener Wert zu groß oder zu klein"));
  } else if (isNaN(answer) === true) {
    console.log(new Error("Eingegebener Wert nicht vom Datentyp Number"));
  } else if (typeof answer === "number" && answer >= 0 && answer <= maxSterne) {
    aktuelleAnzahlBewertungen++;
    bewertung = berechnungDerBewertung(answer,bewertung,aktuelleAnzahlBewertungen);
    console.log(`Ihre Bewertung von ${answer} Sternen wurde gespeichert.`);
  } else {
    console.log(new Error("Unbekannter Fehler."));
  }
  rl.close()
});
}

//Aufgabe 4 Bewertung soll n-Mal berechnet werden. Jeder Berechnung wird eine neue zufällige Bewertung hinzugefügt.
zufaelligeBewertung()
function zufaelligeBewertung(){
  rl.question('Wie oft soll eine zufällige Bewertung erzeugt werden? :',(answer) => {
    answer = Number(answer)
    let randomNumber;
    for (i = 0; i<answer; i++){
      aktuelleAnzahlBewertungen++;
      randomNumber = Math.floor(Math.random() * (maxSterne+1))
      bewertung = berechnungDerBewertung(randomNumber,bewertung,aktuelleAnzahlBewertungen);
      console.log(`Abgegebene Bewertung: ${randomNumber}`)
      console.log(`Durchschnitt Bewertung: ${bewertung}`)
      console.log(`Anzahl der Bewertungen: ${aktuelleAnzahlBewertungen}\n`)
    }
    rl.close();
  });
}

// Aufgabe 5 Berechnung der Bewertung in eine Funktion packen
function berechnungDerBewertung (abgegebeneBewertung, aktuelleBewertung, aktuelleAnzahlBewertungen){
  return ((((aktuelleAnzahlBewertungen-1)* aktuelleBewertung) + abgegebeneBewertung)/aktuelleAnzahlBewertungen);
}