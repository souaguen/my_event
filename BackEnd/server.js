let app = require("express")();
let fetch = require("node-fetch");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.post("/login", jsonParser, (req, res) => {
    console.log(req.body);
});

app.post("/signup", jsonParser, (req, res) => {
    console.log(req.body);
});

app.get("/:location", (req, res) => {
    fetch("http://api.eventful.com/json/events/search?app_key=HkgwXkPs5xHpDpR2&" + req.params.location).then((response) => {
        return response.json();
    }).then((data) => {
        res.send({data});
    });
});

app.get("/address/:address", (req, res) => {
    fetch("https://api-adresse.data.gouv.fr/search/?" + req.params.address).then((response) => {
        return response.json();
    }).then((data) => {
        res.send({data});
    });
});

app.get("/categories/:parameter", (req, res) => {
    fetch("http://api.eventful.com/json/categories/list/?app_key=HkgwXkPs5xHpDpR2&" + req.params.parameter).then((response) => {
        return response.json();
    }).then((data) => {
        res.send({data});
    });
});

app.listen(8000);