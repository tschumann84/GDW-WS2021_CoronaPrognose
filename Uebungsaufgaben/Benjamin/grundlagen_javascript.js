// Aufgabe 1 Namen auf der Konsole ausgeben
//console.log("Benjamin Salamon");

// Aufgabe 2 

//  Initialisierung der Variablen und Ausgabe
const maxSterne = 5;
var aktuelleAnzahlBewertungen = 3;
var bewertung = "Was ein geiles Produkt!";



console.log(maxSterne)
console.log(aktuelleAnzahlBewertungen)
console.log(bewertung)



const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});