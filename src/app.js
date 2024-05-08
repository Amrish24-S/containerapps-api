var express = require("express");
var path = require("path");
var logger = require("morgan");

var router = require("./routes/index");
var app = express();

let appInsights = require("applicationinsights");
appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "api";
appInsights.setup("InstrumentationKey=15bf10dc-4d16-4cd6-85ac-7de4018b0a78;IngestionEndpoint=https://canadacentral-1.in.applicationinsights.azure.com/;LiveEndpoint=https://canadacentral.livediagnostics.monitor.azure.com/;ApplicationId=a4d0504e-849f-42c2-af20-0d1f1fbcbad6")
    .setAutoDependencyCorrelation(true)
    .enableWebInstrumentation(true)
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
