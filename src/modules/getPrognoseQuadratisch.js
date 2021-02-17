const dateCalc = require('./calcModules/calcDate');
const getNewZombies = require('./rkiapimodules/getNewZombies');
const getInzidenz = require('./calcModules/calcInzidenz');

async function getPrognoseQuadratisch(typ, date, typID) {
    const m = 4;
    let inf = [];
    let inz = [];
    const x = new Date(date);
    console.log(x);
    let j = 0;

    function Datumspaar(anfangsdatum, enddatum){
        this.anfangsdatum = anfangsdatum;
        this.enddatum = enddatum;
    }

    let arrayDatumspaare = [];
    //initialisierung der arrays

    for(let i = 0; i<=12; i++){
        await arrayDatumspaare.push(await new Datumspaar(await new Date(x), await new Date(x)));
        console.log("erzeugt")
    }

    for ( let i=-84; i<=-7; i=(i+7)){
        await subtractDays(x, i)
            .then(date => addToArray(j, arrayDatumspaare, date))
        j++
    }

    function addToArray(j, arrayDatumspaare, date){
        return new Promise((resolve, reject)=> {
            arrayDatumspaare[j].anfangsdatum.setDate(date)
            arrayDatumspaare[j].enddatum.setDate(date+6)
            resolve(arrayDatumspaare[j])
        })
    }

    function subtractDays(date, i){
        return new Promise((resolve, reject)=> {
            resolve(date.getDate()+i)
        })
    }

    console.log(arrayDatumspaare.length);
    console.log(arrayDatumspaare);

    for(let i=0; i<12;i++) {
        inf[i] = await getNewZombies(typ, dateCalc(arrayDatumspaare[i].anfangsdatum), dateCalc(arrayDatumspaare[i].enddatum), typID);
        inz[i] = await getInzidenz(inf[i], typ, typID);

    }

    let tcinf = [];
    tcinf[1]= m/2*(inf[0]+inf[4]);
    tcinf[2]= m/4*(inf[0]+inf[4])+m/2*inf[2];
    tcinf[3]= m/8*(inf[0]+inf[4])+m/4*(inf[1]+inf[2]+inf[3]);
    tcinf[4]= (m*(tcinf[2]-tcinf[1]))/3;
    tcinf[5]= (m*(tcinf[3]-tcinf[2]))/3;
    tcinf[6]= (m*m*(tcinf[5]-tcinf[4]))/((m*m)-1);
    tcinf[0] = tcinf[6]/2;
    let tsinf = [];
    tsinf[1] = m/2*(inf[0]+inf[1]);
    tsinf[2] = m/4*(inf[0]+inf[1])+m/2*inf[2];
    tsinf[3] = m/8*(inf[0]+inf[1])+m/4*(inf[2]+inf[3]+inf[4]);
    tsinf[4] = (m*(tsinf[1]-tsinf[2]))/3;
    tsinf[5] = (m*(tsinf[2]-tsinf[3]))/3;
    tsinf[6] = (m*m*(tsinf[4]-tsinf[5]))/((m*m)-1);
    tsinf[0] = tsinf[6]/2;

    let infizierte;

    if ( tsinf[6] > 0) {
        infizierte = (Math.abs(tcinf[0]) + Math.abs(tsinf[6]))/2
    } else {
        infizierte = (Math.abs(tcinf[0]) + Math.abs(tsinf[0]))/2
    }


    let tcinz = [];
    tcinz[1]= m/2*(inz[0]+inz[4]);
    tcinz[2]= m/4*(inz[0]+inz[4])+m/2*inz[2];
    tcinz[3]= m/8*(inz[0]+inz[4])+m/4*(inz[1]+inz[2]+inz[3]);
    tcinz[4]= (m*(tcinz[2]-tcinz[1]))/3;
    tcinz[5]= (m*(tcinz[3]-tcinz[2]))/3;
    tcinz[6]= (m*m*(tcinz[5]-tcinz[4]))/((m*m)-1);
    tcinz[0] = tcinz[6]/2;
    let tsinz = [];
    tsinz[1] = m/2*(inz[0]+inz[1]);
    tsinz[2] = m/4*(inz[0]+inz[1])+m/2*inz[2];
    tsinz[3] = m/8*(inz[0]+inz[1])+m/4*(inz[2]+inz[3]+inz[4]);
    tsinz[4] = (m*(tsinz[1]-tsinz[2]))/3;
    tsinz[5] = (m*(tsinz[2]-tsinz[3]))/3;
    tsinz[6] = (m*m*(tsinz[5]-tsinz[4]))/((m*m)-1);
    tsinz[0] = tsinz[6]/2;

    let inzidenz;

    if (tsinz[6] > 0) {
        inzidenz = (Math.abs(tcinz[0]) + Math.abs(tsinz[6]))/2;
    } else {
        inzidenz = (Math.abs(tcinz[0]) + Math.abs(tsinz[0]))/2;
    }

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

    console.log('### Infizierte: ');
    console.log('#Wochensummen: ');
    console.log(inf);
    console.log('#Tableu Classic: ');
    console.log(tcinf);
    console.log('#Tableu Schumann: ');
    console.log(tsinf);
    console.log('#Prognose Infizierte:')
    console.log(infizierte)
    console.log('### Inzidenz: ');
    console.log('#Wocheninzidenz: ');
    console.log(inz);
    console.log('#Tableu Classic: ');
    console.log(tcinz);
    console.log('#Tableu Schumann: ')
    console.log(tsinz);
    console.log('#Prognoze Inzidenz:')
    console.log(inzidenz);

    function Back(infizierte, inzidenz, ampel) {
        this.infizierte = infizierte
        this.inzidenz = inzidenz
        this.ampel = ampel
    }

    let array = []
    array.push(new Back(Math.round(infizierte), Math.round(inzidenz), ampel))
    return(array);
}
getPrognoseQuadratisch(1,'2021-01-30','13003')
    .then(ergebnis => {console.log(ergebnis)})

module.exports = getPrognoseQuadratisch