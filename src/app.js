var express = require("express");
var path = require("path");
var logger = require("morgan");

var router = require("./routes/index");
var app = express();

let appInsights = require("applicationinsights");
appInsights.setup("")
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .start();

//enable cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(logger("dev"));
app.use(express.json({ type: ["applicaton/json"] }));
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

console.log("Container Apps Node Sample");
module.exports = app;
