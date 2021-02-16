function getProgHome(){
    return new Promise((resolve, reject)=> {

        function Inhalt(titel, link) {
            this.titel = titel;
            this.link = link;
        }

        let inhalt = [];

        inhalt.push(new Inhalt('Prognose Bundesweit', 'bundesweit'));
        inhalt.push(new Inhalt('Prognose Bundesland', 'bundesland'));
        inhalt.push(new Inhalt('Prognose Landkreis', 'landkreis'));
        resolve(inhalt);
    })
}
module.exports = getProgHome;