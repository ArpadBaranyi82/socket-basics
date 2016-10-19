var moment = require("moment");
var now = moment();

//console.log(now.format());
//console.log(now.format("X"));

var timestamp = 1476865247821;
var timestampMoment = moment.utc(timestamp);



console.log(timestampMoment.local().format("h:mma"));

//console.log(now.format("MMM Do YYYY, h:mma"));