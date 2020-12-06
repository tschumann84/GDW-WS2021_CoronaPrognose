const handle = function (req, res){
    res.writeHead(200, {
        'content-type': 'text/html'
    });

    res.write('Hallo Node.js!');
    res.end();
};

module.exports = handle;