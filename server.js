const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const health_bot = require('./index.js');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/');
app.set('view engine', 'html');
app.use('/thyro-health/', express.static(__dirname+'/dist'));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
   res.header('Pragma', 'no-cache');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/thyro-health/', health_bot);

/*app.get('/thyro-health/home/*', function(req, res) {
 res.sendFile(path.join(__dirname + '/dist/index.html'));
});*/
let port = process.env.PORT || 1851;
const server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException',(err)=>{
        console.error(err, 'Uncaught Exception thrown');
    });