const express = require("express");
const ejs = require("ejs");
const passport = require("passport");
const app = express();
app.listen(80);
const moment = require("moment");
moment.locale("tr");
const url = require("url");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.engine(".ejs", ejs.__express);
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.use(express.static(`${__dirname}/src/views/`));
app.use(session({ secret: "secret-session-thing", resave: false, saveUninitialized: false, }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index", { url: req.originalUrl, user: req.user });
});
