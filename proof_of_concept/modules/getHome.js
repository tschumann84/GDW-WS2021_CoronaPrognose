function getHome(callback){
    function Inhalt(titel, link) {
        this.titel = titel;
        this.link = link;
    }
    let inhalt = [];

    inhalt.push(new Inhalt('Prognose', 'prog'));
    inhalt.push(new Inhalt('Retrovision', 'retro'));
    callback(inhalt);
}
module.exports = getHome;