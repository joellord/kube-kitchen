const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  let url = req.url;
  let responseObject = {
    served_by: process.env.HOSTNAME
  };
  console.log(`Requesting ${url}`);
  switch(url) {
    case "/health":
      responseObject.status = "healthy";
      responseObject.time = (new Date()).getTime();
      break;
    case "/fries":
      responseObject.food = "French Fries";
      break;
    case "/cheese":
      responseObject.food = "Fresh Cheese Curds";
      break;
    case "/garnish":
      responseObject.food = "Duck Confit";
      break;
    case "/sauce":
      responseObject.food = "Demi Glace Au Poivre";
      break;
  }
  res.write(JSON.stringify(responseObject));
  res.end();
}).listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
