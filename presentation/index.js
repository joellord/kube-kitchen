const express = require("express");
const expressWs = require("express-ws");
const path = require("path");
const pty = require("node-pty");
const os = require("os");
const exec = require("child_process").exec;
const api = require("./api");

const app = express();
const ws = expressWs(app);

const PORT = process.env.PORT || 8080;

const DEFAULT_PATH = "../k8s/";

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
let ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: DEFAULT_PATH,
  env: process.env
});

app.use(express.static(path.join(__dirname, "./build")));

app.get("/health", (req, res) => {
  res.send("Feeling good").status(200);
});

app.get("/minikubeIp", (req, response) => {
  exec("minikube ip", (err, stdout, stdin) => {
    let ip = stdout.replace("\n", "");
    response.send({ip}).status(200);
  });
});

ws.app.ws("/shell", (ws, req) => {
  ptyProcess.on("data", data => {
    try {
      ws.send(data);
    } catch(e) {
      console.log(e);
    }
  }); 

  ws.on("message", msg => {
    ptyProcess.write(msg);
  });
});

app.get("/system", (req, res) => {
  api().then(snap => res.send(snap).status(200));
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
