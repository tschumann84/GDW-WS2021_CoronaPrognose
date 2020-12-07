/*
  Aufgabenblatt 1 fertiggestellt von Benjamin Salamon am 06.12.2020
 */

// Aufgabe 1 Den eigenen Namen auf der Konsole ausgeben
console.log("Benjamin Salamon");

// Aufgabe 2 Deklarieren der Variablen und Konstanten
const maxSterne = 5;
let aktuelleAnzahlBewertungen = 0;
let bewertung=0;
let ratings = [];

//Initialisieren des readLine
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
let ergebnis = Ratings("Hallo", 2, 3);

console.log(ergebnis[0], ergebnis[1], ergebnis[2]);
console.log(ergebnis2[0], ergebnis2[1], ergebnis2[2]);
*/

// Freiwillig: Ausführen eines Menüs zum auswählen der Funktionen
menu();


// Aufgabe 3 Nutzer soll in der Kommandozeile bewerten können. Falsche Eingaben sollen abgefangen werden.
function manuelleBewertung(){
rl.question(`Welche Bewertung würden Sie der App geben? (0 - schlechteste Bewertung bis ${maxSterne} Sterne): `, (answer) => {
  answer = Number(answer)
  if (answer > maxSterne || answer < 0) {
    console.log(new Error("Eingegebener Wert zu groß oder zu klein"));
  } else if (isNaN(answer) === true) {
    console.log(new Error("Eingegebener Wert nicht vom Datentyp Number"));
  } else if (typeof answer === "number" && answer >= 0 && answer <= maxSterne) {
    aktuelleAnzahlBewertungen++;
    newRatingInArray(`Bewertung Nr. ${aktuelleAnzahlBewertungen}`, aktuelleAnzahlBewertungen, answer)
    console.log(`Ihre Bewertung von ${answer} Sternen wurde gespeichert.`);
  } else {
    console.log(new Error("Unbekannter Fehler."));
  }
  rl.close()
});
}

//Aufgabe 4 Bewertung soll n-Mal berechnet werden. Jeder Berechnung wird eine neue zufällige Bewertung hinzugefügt.
function zufaelligeBewertung(){
  rl.question('Wie oft soll eine zufällige Bewertung erzeugt werden?: ',(answer) => {
    answer = Number(answer)
    let randomNumber;
    for (i = 0; i<answer; i++){
      aktuelleAnzahlBewertungen++;
      randomNumber = Math.floor(Math.random() * (maxSterne+1));
      bewertung = berechnungDerBewertung(randomNumber,bewertung,aktuelleAnzahlBewertungen);
      console.log(`Abgegebene Bewertung: ${randomNumber}`);
      console.log(`Durchschnitt Bewertung: ${bewertung}`);
      console.log(`Anzahl der Bewertungen: ${aktuelleAnzahlBewertungen}\n`);
    }
    rl.close();
  });
}

// Aufgabe 5 Berechnung der Bewertung in eine Funktion packen
function berechnungDerBewertung (abgegebeneBewertung, aktuelleBewertung, aktuelleAnzahlBewertungen){
  return ((((aktuelleAnzahlBewertungen-1)* aktuelleBewertung) + abgegebeneBewertung)/aktuelleAnzahlBewertungen);
}

/*
Aufgabenblatt 2
 */
function menu(){
  rl.question(`\nMenü\nTippe 1: um Bewertung manuell abzugeben\nTippe 2: um Bewertung automatisch abzugeben\n\n`, (answer)=>{
    answer = Number(answer);
    switch(answer){
        case 1:
          manuelleBewertung();
          break;
        case 2:
          zufaelligeBewertung();
          break;
      default:
        console.log('\nEingabe nicht erkannt probieren Sie es noch einmal.');
        menu();
        break;
      }
  }
)}

// Aufgabenblatt 2 Übung 1 Speichern der Bewerungen in einem Array

function newRatingInArray(nameDerBewertung, anzahlAbgegebeneBewertungen, zuletztEingetrageneBewertung){
  ratings.push([nameDerBewertung, anzahlAbgegebeneBewertungen, zuletztEingetrageneBewertung])
  console.log(`Länge des Arrays: ${ratings.length}`);
  console.log(`Folgende Bewertung wurde in das Array gespeichert: ${ratings[anzahlAbgegebeneBewertungen-1]}`)
}

function Ratings(nameDerBewertung,anzahlAbgegebeneBewertungen, zuletztEingetrageneBewertung){
  this.nameDerBewertung = nameDerBewertung;
  this.anzahlAbgegebeneBewertungen = anzahlAbgegebeneBewertungen;
  this.zuletztEingetrageneBewertung = zuletztEingetrageneBewertung;
  this.durchschnitt = () => {

  }

  return [nameDerBewertung,anzahlAbgegebeneBewertungen,zuletztEingetrageneBewertung];
}