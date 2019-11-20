const fs = require("fs");

let PASTRY_FRIDGE = process.env.PASTRY_FRIDGE || "./";
if (PASTRY_FRIDGE.substr(-1) !== "/") PASTRY_FRIDGE += "/";

const filename = `dessert-${(new Date()).getTime()}.txt`;

fs.closeSync(fs.openSync(PASTRY_FRIDGE + filename, 'w'));
console.log(`Creating dessert at ${PASTRY_FRIDGE}${filename}`);
