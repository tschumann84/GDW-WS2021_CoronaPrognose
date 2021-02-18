//Home Ressource
function getHome(){
    return new Promise((resolve, reject)=> {
        try{
            function Inhalt(titel, link) {
                this.titel = titel;
                this.link = link;
            }

            let inhalt = [];

            inhalt.push(new Inhalt('Prognose', 'prog'));
            inhalt.push(new Inhalt('Retrovision', 'retro'));
            resolve(inhalt);
        }catch {
            reject(new Error('500 Internal Server Error (getHome)'));
        }
    })
}
module.exports = getHome;