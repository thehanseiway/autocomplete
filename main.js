const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const COMMENTS_FILE = path.join(__dirname, 'comments.json');
console.log(COMMENTS_FILE);
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


app.get('/api/comments', function (req, res) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if(err) {
            console.log(err);
            process.exit(1);
        }

        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', function (req, res, next) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if(err) {
            console.log(err);
            process.exit(1);
        }

        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };

        console.log( req.body );
        comments.push(newComment);

        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments), function (err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            res.json(comments);
        });
    });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
