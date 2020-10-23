var express = require("express");
var app = express();
var path = require("path")
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req,res){
  res.json(path.join(__dirname, "public/index.html"))
})

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})