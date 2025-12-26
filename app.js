const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async function(req, res) {
    let covidStats = null;
    try {
        const response = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
        if (response.ok) {
            const data = await response.json();
            if (data && data.data && data.data.summary) {
                covidStats = {
                    total: data.data.summary.total,
                    confirmedCasesIndian: data.data.summary.confirmedCasesIndian,
                    confirmedCasesForeign: data.data.summary.confirmedCasesForeign,
                    discharged: data.data.summary.discharged,
                    deaths: data.data.summary.deaths,
                    active: data.data.summary.total - data.data.summary.discharged - data.data.summary.deaths,
                    lastRefreshed: data.lastRefreshed
                };
            }
        }
    } catch (err) {
        covidStats = null;
    }
    res.render("home", { covidStats });
});
app.get("/about",function(req,res)
{
    res.render("about");
});
app.get("/ourSupport",function(req,res)
{
    res.render("ourSupport");
});
app.get("/contact",function(req,res)
{
    res.render("contact");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000.");
});








