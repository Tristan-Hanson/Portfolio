const express = require('express');
const routes = require('./controllers');
const engine = require('express-handlebars');
const path = require('path')
const sequelize = require('./config/connect');
const Project = require('./models/project')
const s3Project = require('./s3Project')
//const session = require('express-session');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join('views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*
not needed yet
app.use(session({
  secret: 'krabbyPattySecretFormula',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
*/

app.engine('handlebars', engine.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(routes);

// sync sequelize models to the database, then turn on the server
async function start(){
  await sequelize.sync({alter: true});
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT} !`);
  });
  }
start();