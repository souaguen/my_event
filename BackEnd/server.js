let app = require("express")();
let fetch = require("node-fetch");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/:location", (req, res) => {
    fetch("http://api.eventful.com/json/events/search?app_key=HkgwXkPs5xHpDpR2&l=" + req.params.location).then((response) => {
        return response.json();
    }).then((data) => {
        res.send({data});
    });
});

app.listen(8000);