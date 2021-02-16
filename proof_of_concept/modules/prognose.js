// Funktion zum ermitteln der Prognose


/* Rechenschritte:
    - Erfassen von Infektionen der letzten 5 Wochen ab $startdatum
    - Aufsummieren der Infektionen alle 7 Tage (Woche)
    - Ermitteln der Inzidenzwerte alle 7 Tage (Woche)
    - Summen der Infektion alle 7 Tage:
        - inf-4
        - inf-3
        - inf-2
        - inf-1
        - inf-0
    - Inzidenzwerte alle 7 Tage:
        - inz-4
        - inz-3
        - inz-2
        - inz-1
        - inz-0
    - Tableu Classic
        Anzahl der Intervale: m = 4
        tc1 = m/2 *( inf-4 + inf-0 )
        tc2 = m/4 *( inf-4 + inf-0 ) + m/2 * inf-2
        tc3 = m/8 *( inf-4 + inf-0 ) + m/4 * ( inf-3 + inf-2 + inf-1 )
            tc1u2 = ( m*( tc2 - tc3 ) ) /3
            tc2u3 = ( m*( tc3 - tc2 ) ) /3
                tc1u2u3 = ( m*m ( tc2u3 - tc1u2 ) ) / ( ( m*m ) -1 )
        tc = tc1u2u3 /2

    - Tableu Schumann
        Anzahl Intervalle: m = 4
        ts1 = m/2 *( inf-4 + inf-3 )
        ts2 = m/4 *( inf-4 + inf-3 ) + m/2 * inf-2
        ts3 = m/8 *( inf-4 + inf-3 ) + m/4 * ( inf-2 + inf-1 + inf-0 )
            ts1u2 = ( m*( ts1 - ts2 ) ) /3
            ts2u3 = ( m*( ts2 - ts3 ) ) /3
                ts1u2u3 = ( m*m ( ts2u3 - ts1u2 ) ) / ( ( m*m ) -1 )
        ts = ts1u2u3 /2

    - Mittelwerte für Prog
        Mittelwert ermittlung für positives ts1u2u3 Zwischenergebnis
        mwp = |tc| + |ts1u2u3|

        Mittelwert ermittlung für negatives ts1u2u3 Zwischenergebnis
        mwn = |tc| + |ts|

     - Prognosewert:
            prog = wenn ts1u2u3 <=0 dann mwn sonst mwp
*/

//const dateCalc = require('./calcModules/dateCalc');
const getNewZombies = require('./rkiapimodules/getNewZombies');
const getPopulation = require('./rkiapimodules/getPopulation');
const getInzidenz = require('./calcModules/getInzidenz');
const getDate = require('./getDate');
//const getINFuINZ = require('./calcModules/getINFuINZ');
// const m = 4;

    //Function call with "typ" of Region, startdatum, typID = ID of Region
async function prognose(typ, date, typID) {
    const m = 4;
    let inf = [];
    let inz = [];
  //  let enddatum = [dateCalc(date,-35), dateCalc(date,-28),dateCalc(date,-21),dateCalc(date,-14),dateCalc(date,-7),dateCalc(date,0)];
    let enddatum = [getDate(-35),
                    getDate(-28),
                    getDate(-21),
                    getDate(-14),
                    getDate(-7),
                    getDate(+0)]

    // for(let i = 1; i <10; i++){
    //     inf[i] = await getNewZombies(1, getDate(i*-1), getDate(i*-1), '13003');
    //     console.log(getDate(i*-1)+' '+inf[i]);
    // }
    for(let i=0; i<5;i++) {
       inf[i] = await getNewZombies(typ, enddatum[i], enddatum[i+1],typID);
       // let population = await getPopulation(typ, typID);
       // inz[i] = inf[i] * population / 100000;
       inz[i] = await getInzidenz(inf[i], typ, typID);

       // inz[i] = inf[i] / getPopulation(typ, typID) * 100000;
    }

    //Tableu Classic
    //tc1u2 = tc4
    //tc2u3 = tc5
    //tc1u2u3 = tc6
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
    // if ( tsinf[6] > 0) {
    //     infizierte = tcinf[0] + tsinf[6]
    // } else {
    //     infizierte = tcinf[0] + tsinf[0]
    // }
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
    // if (tsinz[6] > 0) {
    //     inzidenz = tcinz[0] + tsinz[6]
    // } else {
    //     inzidenz = tcinz[0] + tsinz[0]
    // }
    if (tsinz[6] > 0) {
        inzidenz = (Math.abs(tcinz[0]) + Math.abs(tsinz[6]))/2
    } else {
        inzidenz = (Math.abs(tcinz[0]) + Math.abs(tsinz[0]))/2
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

}
prognose(1,'2021-02-16','13003')

modules.exports = prognose