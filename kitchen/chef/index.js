const express = require("express");
const axios = require("axios");
const glob = require("glob");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;
const COOK_URL = `${process.env.COOK_SERVICE_SERVICE_HOST}:${process.env.COOK_SERVICE_SERVICE_PORT}`;
let PASTRY_FRIDGE = process.env.PASTRY_FRIDGE;

if (PASTRY_FRIDGE.substr(-1) !== "/") PASTRY_FRIDGE += "/";

app.get("/main", (req, res) => {
  console.log("Sending requests");
  Promise.all([
    axios.get(`http://${COOK_URL}/fries`),
    axios.get(`http://${COOK_URL}/cheese`),
    axios.get(`http://${COOK_URL}/sauce`),
    axios.get(`http://${COOK_URL}/garnish`)
  ]).then((data) => {
    console.log("Heard back from the cooks");
    console.log(data);
    let plate = {
      fries: data[0].data,
      cheese: data[1].data,
      sauce: data[2].data,
      garnish: data[3].data,
      assembled_by: process.env.HOSTNAME
    };
    console.log("Sending the plate!");
    console.log(plate);
    res.status(200).send(plate);
  }).catch(e => {
    console.log("Error fetching items from cooks");
    console.log(e);
    res.status(500).send(e);
  });
});

app.get("/dessert", (req, res) => {
  glob(`${PASTRY_FRIDGE}dessert-*.txt`, (err, files) => {
    if (err || files.length === 0) {
      return res.status(200).send({dessertsLeft: -1});
    }

    let timestamp = files[0]
      .split("")
      .reverse()
      .join("")
      .substr(4, files[0].split("").reverse().join("").indexOf("-")-4)
      .split("")
      .reverse()
      .join("");
    let date = new Date(parseInt(timestamp));

    fs.unlinkSync(files[0]);
    res.status(200).send({
      dessert: "Creme brulee", 
      preparedAt: date.toString(),
      preparedAtTimestamp: timestamp, 
      dessertsLeft: files.length - 1,
      assembled_by: process.env.HOSTNAME
    });
  })
});

app.get("*", (req, res) => {
  res.status(404).send("I don't understand what you need");
});

app.listen(PORT, () => console.log(`Chef listening on port ${PORT}`));
