const dateCalc = require('./calcModules/calcDate');
const getNewZombies = require('./rkiapimodules/getNewZombies');
const getInzidenz = require('./calcModules/calcInzidenz');
const getDateArray = require('./dateModules/getDateArray');
const calcQuadro = require('./calcModules/calcQuadro');

async function getPrognose(typ, date, typID) {
    const deep = 12;
    let inf = [];
    let inz = [];

    let arrayDatumspaare = await getDateArray(date)

    for(let i=0; i<12;i++) {
        inf[i] = await getNewZombies(typ, dateCalc(arrayDatumspaare[i].anfangsdatum), dateCalc(arrayDatumspaare[i].enddatum), typID);
        inz[i] = await getInzidenz(inf[i], typ, typID);
    }

    let infizierte = await calcQuadro(inf, deep);

    let inzidenz = await calcQuadro(inz, deep);

    let ampel;
    let ampelWert = [35,50,75];

    if (inzidenz <= ampelWert[0]) {
        ampel = '#00ff00';
        } else if (inzidenz <= ampelWert[1]) {
            ampel = '#ffff00';
        } else if (inzidenz <= ampelWert[2]){
            ampel = '#ffa500';
        } else{
            ampel = '#ff0000';
    }


    // console.log('### Infizierte: ');
    // console.log('#Wochensummen: ');
    // console.log(inf);
    // console.log('#Prognose Infizierte:');
    // console.log(infizierte);

    // console.log('### Inzidenz: ');
    // console.log('#Wocheninzidenz: ');
    // console.log(inz);
    // console.log('#Prognoze Inzidenz:');
    // console.log(inzidenz);

    function Back(infizierte, inzidenz, ampel) {
        this.infizierte = infizierte
        this.inzidenz = inzidenz
        this.ampel = ampel
    }

    let array = []
    array.push(new Back(Math.round(infizierte), Math.round(inzidenz), ampel))
    return(array);
}
// getPrognoseQuadratisch(1,'2020-12-28','05374')
//     .then(ergebnis => {console.log(ergebnis)})

module.exports = getPrognose