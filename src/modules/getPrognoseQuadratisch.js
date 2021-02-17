const dateCalc = require('./calcModules/calcDate');
const getNewZombies = require('./rkiapimodules/getNewZombies');
const getInzidenz = require('./calcModules/calcInzidenz');
const getDateArray = require('./dateModules/getDateArray');
const calcQuadro = require('./calcModules/calcQuadro');

async function getPrognoseQuadratisch(typ, date, typID) {
    const m = 4;
    let inf = [];
    let inz = [];
    const x = new Date(date);
    x.setHours(2);
    // console.log(x);
    let j = 0;

    let arrayDatumspaare = await getDateArray(date)
    // function Datumspaar(anfangsdatum, enddatum){
    //     this.anfangsdatum = anfangsdatum;
    //     this.enddatum = enddatum;
    // }
    //
    // let arrayDatumspaare = [];
    //initialisierung der arrays

    // for(let i = 0; i<=12; i++){
    //     await arrayDatumspaare.push(await new Datumspaar(await new Date(x), await new Date(x)));
    //     console.log("erzeugt")
    // }
    //
    // for ( let i=-84; i<=-7; i=(i+7)){
    //     await subtractDays(x, i)
    //         .then(date => addToArray(j, arrayDatumspaare, date))
    //     j++
    // }
    //
    // function addToArray(j, arrayDatumspaare, date){
    //     return new Promise((resolve, reject)=> {
    //         arrayDatumspaare[j].anfangsdatum.setDate(date)
    //         arrayDatumspaare[j].enddatum.setDate(date+6)
    //         resolve(arrayDatumspaare[j])
    //     })
    // }
    //
    // function subtractDays(date, i){
    //     return new Promise((resolve, reject)=> {
    //         resolve(date.getDate()+i)
    //     })
    // }

    // console.log(arrayDatumspaare.length);
    // console.log(arrayDatumspaare);

    for(let i=0; i<12;i++) {
        inf[i] = await getNewZombies(typ, dateCalc(arrayDatumspaare[i].anfangsdatum), dateCalc(arrayDatumspaare[i].enddatum), typID);
        inz[i] = await getInzidenz(inf[i], typ, typID);

    }

    let infizierte = await calcQuadro(inf, 12);

    let inzidenz = await calcQuadro(inz, 12);

    let ampel;
    let ampelWert = [35,70,105];

    if (inzidenz <= ampelWert[0]) {
        ampel = '#00FF00';
    } else {
        if (inzidenz <= ampelWert[1]) {
            ampel = '#ffff00';
        } else {
            if (inzidenz <= ampelWert[2]) {
                ampel = '#ffa500';
            } else {
                ampel = '#ff0000';
            }
        }
    }

    // console.log('### Infizierte: ');
    // console.log('#Wochensummen: ');
    // console.log(inf);
    // console.log('#Tableu Classic: ');
    // console.log(tcinf);
    // console.log('#Tableu Schumann: ');
    // console.log(tsinf);
    // console.log('#Prognose Infizierte:');
    // console.log(infizierte);
    // console.log('### Inzidenz: ');
    // console.log('#Wocheninzidenz: ');
    // console.log(inz);
    // console.log('#Tableu Classic: ');
    // console.log(tcinz);
    // console.log('#Tableu Schumann: ');
    // console.log(tsinz);
    // console.log('#Prognoze Inzidenz:');
    // console.log(inzidenz);

    // console.log('\n### quadratische Abweichung');
    // console.log(summeXt);
    // console.log(summeXtt);
    // console.log(b1);
    // console.log(b2);
    // console.log(b);
    // console.log(a);

    function Back(infizierte, inzidenz, ampel) {
        this.infizierte = infizierte
        this.inzidenz = inzidenz
        this.ampel = ampel
    }

    let array = []
    array.push(new Back(Math.round(infizierte), Math.round(inzidenz), ampel))
    return(array);
}
getPrognoseQuadratisch(1,'2020-12-28','05374')
    .then(ergebnis => {console.log(ergebnis)})

module.exports = getPrognoseQuadratisch