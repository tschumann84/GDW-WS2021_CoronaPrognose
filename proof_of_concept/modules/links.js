// Test URI generierung

const ersterUriPart = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?'

const getURI = function(typ, link, datumVon, datumBis, suchbereich){
    // Typ 1 = Landkreis, Typ 2 = Bundesland, Typ3 Deutschlandweit
    const letzterUriPart= '&outFields=*&f=json';
    const datumFilter= `where=Meldedatum >= TIMESTAMP '${datumVon} 00:00:00' AND Meldedatum <= TIMESTAMP '${datumBis} 23:59:59'`
    let filterKomplett;

    switch (typ){
        case 1:
            filterKomplett = datumFilter + ` AND Bundesland = '${suchbereich}'`
            break;
        case 2:
            filterKomplett = datumFilter + ` AND Landkreis = '${suchbereich}'`
            break;
        case 3:
            filterKomplett = datumFilter
            break;
    }
    console.log(ersterUriPart+encodeURI(filterKomplett+letzterUriPart));
}

//ersterTest
getURI(1, ersterUriPart, '2021-01-13', '2021-01-14', 'Nordrhein-Westfalen');
