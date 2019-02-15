require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//require express routes
const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

//Handle production
if (process.env.NODE_ENV === "production") {
    //Static folder
    app.use(express.static(__dirname + "/public"));

    //Handle single page application (SPA)
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

//Set the port to listen on
const port = process.env.PORT || 3000;

//Start the server
app.listen(port, () => console.log(`server started on port: ${port}`));