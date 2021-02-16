const getNewZombies = require('./getNewZombies');
const getDate = require('../getDate');

async function berechnung(){

        let array = [];
        console.log("Halllo")

        for(let i = 1; i <10; i++){
                array[i] = await getNewZombies(1, getDate(i*-1), getDate(i*-1), '13003');
                console.log(getDate(i*-1)+' '+array[i]);
        }



        console.log(array);
        console.log("Dumm");
}
berechnung();