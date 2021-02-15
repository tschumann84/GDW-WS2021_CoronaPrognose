/*
getINFuINZperDate gibt die Anzahl der Infizierten und den Inzidenz Wert für die Region und den vergangenen Zeitraum zurück.

    Erwartet:
        -Typ = Landkreis(1) oder Bundesland(1) oder Bundesweit(3)
        -Startdatum YYYY.mm.dd
        -Enddatum YYYY.mm.dd

    Rückgabe:
        -INF: Anzahl der neu Infizierten im Zeitraum
        -INZ: Inzidenzwert für dem Zeitraum

    Ablauf:
        -
        -Abfrage der Infizierten für Zeitraum nach Region
 */