var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//Listener
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})