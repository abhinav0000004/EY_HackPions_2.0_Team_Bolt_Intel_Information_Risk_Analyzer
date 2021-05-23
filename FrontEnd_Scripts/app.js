const express = require("express");
const app = express();
const path = require("path");
module.exports = path.dirname(process.mainModule.filename);

app.use(express.static(path.join(__dirname)));

app.use("/", (req, res, next) => {
  console.log("enter /");
  res.sendFile(path.join(__dirname, "/index.htm"));
});
app.listen(3000);
