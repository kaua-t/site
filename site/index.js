const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const Filestore = require("session-file-store")(session);
const flash = require("express-flash");
const port = 4000

const app = express();

const conn = require("./db/conn");

const User = require("./models/User");
const Comp = require("./models/Companies");

const authRouters = require("./routes/authRoutes");
const homePage = require('./routes/homePage')

const HomeController = require("./controllers/HomeController");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "session",
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
    store: new Filestore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),

    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(flash());

app.use(express.static("public"));

app.use((request, response, next) => {
  if (request.session.userId) {
    response.locals.session = request.session;
  }
  next();
});

app.use('/screens',homePage);

app.use("/", authRouters);

app.get("/", HomeController.showHome);

conn
  .sync()
  .then(() => {
    app.listen(port, () => console.log("Server Only"));
  })
  .catch((error) => console.log(`Erro: ${error}`));
