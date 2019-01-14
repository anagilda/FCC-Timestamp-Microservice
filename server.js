// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint
app.get("/api/timestamp/:date_string?", function (req, res) {
  
  const date_string = req.params.date_string;

  // Values in case of invalid date_string
  let unix = null;
  let utc  = 'Invalid Date';
  
  // If data_string is empty
  if(!date_string) {
    unix = Date.now();
    utc  = new Date(unix).toUTCString();
    
  // If data_string is a number
    // or if we wanted non-decimal:
    // const reg = RegExp(/^[0-9]*$/);
    // if (date_string.match(reg))
  } else if(typeof(data_string) === "number"){
    unix = parseInt(date_string);
    utc  = new Date(unix).toUTCString();
    
  // If none of the above, but data_string can still be parsed by new Date()
  } else if (Date(date_string)) {
    utc  = new Date(date_string).toUTCString();
    unix = Date.parse(utc);
  }

  res.json({ unix , utc });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
