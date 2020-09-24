const path = require("path");
const express = require("express");
const app = express(); // create express app

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("build"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get('*', (req,res)=> {
    res.sendFile(path.resolve())
})

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
