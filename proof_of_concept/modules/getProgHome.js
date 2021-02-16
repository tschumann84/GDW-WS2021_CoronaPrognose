function getProgHome(callback){
    function Inhalt(titel, link) {
        this.titel = titel;
        this.link = link;
    }
    let inhalt = [];

    inhalt.push(new Inhalt('Prognose Bundesweit', 'bundesweit'));
    inhalt.push(new Inhalt('Prognose Bundesland', 'bundesland'));
    inhalt.push(new Inhalt('Prognose Landkreis', 'landkreis'));
    callback(inhalt);
}
module.exports = getProgHome;