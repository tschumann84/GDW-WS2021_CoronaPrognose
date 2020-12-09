const getmodule = function(req){
    const fs = require('fs');
    const https = require('https');

    https.get(req,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                // write JSON string to a file
               let today = new Date();
               let dd = String(today.getDay());
               let mm = String(today.getMonth()+1);
               let yyyy = today.getFullYear();

               console.log(dd);

                fs.writeFile(`${yyyy}${mm}${dd}.json`, JSON.stringify(body), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
            } catch (error) {
                console.error(error.message);
            };
        });
    });
}
module.exports = getmodule;