const http = require("http");

const PORT = process.env.PORT || 3000;
let readyToDie = false;
let serverReady = false;

let interval;

//setTimeout(() => {
//  interval = setInterval(() => {
//    if (!!Math.round(Math.random())) {
//      readyToDie = true;
//    }
//  }, 15000);
//  serverReady = true;
//}, 15000);


http.createServer((req, res) => {
  //if (readyToDie || !serverReady) {
  //  res.writeHead(500, {"Content-Type": "text/html"});
  //} else {
    res.writeHead(200, {"Content-Type": "text/html"});
  //}
  let url = req.url;
  switch(url) {
    case "/health":
      let healthCheck = {
        status: "healthy",
        time: (new Date()).getTime()
      };
      res.write(JSON.stringify(healthCheck));
      break;
    case "/drink":
      let drink = {
        drink: "Beer",
        served_by: process.env.HOSTNAME
      };
      res.write(JSON.stringify(drink));
      break;
    case "/ready":
      let ready = {
        ready: true
      };
      res.write(JSON.stringify(ready));
      break;
  }
  res.end();
}).listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
