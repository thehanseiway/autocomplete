const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Get full path to coutries.json file
const COUNTRIES = path.join(__dirname, 'countries.json');
app.set('port', (process.env.PORT || 4000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/countries', function (req, res) {
    fs.readFile(COUNTRIES, function (err, data) {
        if(err) {
            console.log(err);
            process.exit(1);
        }

        res.json(JSON.parse(data));
    });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
