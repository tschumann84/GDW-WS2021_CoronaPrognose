// Prog Ressource
function getProgHome(){
    return new Promise((resolve, reject)=> {
        try {
            function Inhalt(titel, link) {
                this.titel = titel;
                this.link = link;
            }

            let inhalt = [];

            inhalt.push(new Inhalt('Prognose Bundesweit', 'bundesweit'));
            inhalt.push(new Inhalt('Prognose Bundesland', 'bundesland'));
            inhalt.push(new Inhalt('Prognose Landkreis', 'landkreis'));
            resolve(inhalt);
        }catch {
            reject(new Error('500 Internal Server Error (getProgHome)'));
        }
    })
}
module.exports = getProgHome;