function getRetroHome(){
    return new Promise((resolve, reject)=> {

        function Inhalt(titel, link) {
            this.titel = titel;
            this.link = link;
        }

        let inhalt = [];

        inhalt.push(new Inhalt('Retrospektive Bundesweit', 'bundesweit'));
        inhalt.push(new Inhalt('Retrospektive Bundesland', 'bundesland'));
        inhalt.push(new Inhalt('Retrospektive Landkreis', 'landkreis'));
        resolve(inhalt);
    })
}
module.exports = getRetroHome;