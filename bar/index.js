const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
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
  }
  res.end();
}).listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
