"use strict";
// Node Modules
const express = require("express");
const bodyParser = require("body-parser");

// App Modules
const routes = require("./Routes");

// Set up app
const app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
app.use("/api/v1", routes);

app.listen(3000, () => console.log(`Swagger That API listening on port 3000!`));
