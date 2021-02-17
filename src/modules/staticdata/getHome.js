function getHome(){
    return new Promise((resolve, reject)=> {
        function Inhalt(titel, link) {
            this.titel = titel;
            this.link = link;
        }

        let inhalt = [];

        inhalt.push(new Inhalt('Prognose', 'prog'));
        inhalt.push(new Inhalt('Retrovision', 'retro'));
        resolve(inhalt);
    })
}
module.exports = getHome;