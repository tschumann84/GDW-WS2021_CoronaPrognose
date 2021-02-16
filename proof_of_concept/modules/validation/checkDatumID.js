function checkDatumID(datum, daten){
    return new Promise ((resolve, reject)=>{
        let res = false;
        let loop = false;
        for (let i = 0; i < daten.length; i++){
            if (datum === daten[i]){
                resolve('true')
            }
            if((i+1) === daten.length && res===false){loop = true}
        }
        if(res === false && loop === true){
            reject(new Error ('404'));
        }
    })
}
module.exports = checkDatumID;