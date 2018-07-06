const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const health_bot = require('./index.js');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/');
app.set('view engine', 'html');
app.use('/health/', express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/health/', health_bot);

const port = process.env.PORT || 9090;
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