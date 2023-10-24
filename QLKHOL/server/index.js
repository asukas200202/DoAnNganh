const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require("./routes/index");
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors')
const cookieParser = require('cookie-parser');


// Database connect
const db = require("./config/db");
db.connect();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());  // Sử dụng cookie-parser middleware
app.use(cors());


route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})