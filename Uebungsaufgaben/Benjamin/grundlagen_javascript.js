// Aufgabe 1 Namen auf der Konsole ausgeben
console.log("Benjamin Salamon");

// Aufgabe 2 

//  Initialisierung der Variablen und Ausgabe
const maxSterne = 5;
var aktuelleAnzahlBewertungen = 0;
var bewertung;

//Initialisieren des readLine
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Abfrage nach Sternpunktzahl und Fehlerausgabe
rl.question(`Welche Bewertung würden Sie der App geben? (0 - schlechteste Bewertung bis ${maxSterne} Sterne): `, (answer) => {
  answer = Number(answer)
  if (answer > maxSterne || answer < 0) {
    console.log(new Error("Eingegebener Wert zu groß oder zu klein"));
  } else if (isNaN(answer) === true) {
    console.log(new Error("Eingegebener Wert nicht vom Datentyp Number"));
  } else if (typeof answer === "number" && answer >= 0 && answer <= maxSterne) {
    aktuelleAnzahlBewertungen++;
    bewertung = (bewertung + answer) / aktuelleAnzahlBewertungen;
    console.log(`Ihre Bewertung von ${answer} Sternen wurde gespeichert.`);
  } else {
    console.log(new Error("Unbekannter Fehler."));
  }
  rl.close();
})