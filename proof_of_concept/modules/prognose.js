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
function prognose (typ, typID) {

    const getDate = require('./getDate');
    const getNewZombies = require('./rkiapimodules/getNewZombies')
    const getINFuINZ = require('./calcModules/getINFuINZ')
    const startdatum = getDate(0);

    const m = 4;
    let enddatum = [getDate(-35),getDate(-28),getDate(-21),getDate(-14),getDate(-7),getDate(0)];
    let inf = [4,3,2,1,0];
    let inz = [4,3,2,1,0];

    function INFuINZ() {
        for (let i = 0; i < 5; i++) {
               // inf[i] = getINFuINZ(typ, enddatum[i], enddatum[i + 1], typID);
               // inz[i] = getINFuINZ(typ, enddatum[i], enddatum[i + 1], typID);


                inf[i] = getNewZombies(typ, enddatum[i], enddatum[i+1], typID)
                    .then(ergebnis => )

                inz[i] = inz[i]/272022*100000;
                console.log(inf[i]+' '+inz[i])
            }
        }
        return inf + inz;


    INFuINZ();
    console.log(inf);
    console.log(inz);

    return inf + inz;
}
var prog = prognose(1, '05374');
console.log(prog)

