require("dotenv").config();

const initOptions = {
  capSQL: true,
};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  max: 30,
};
const db = pgp(cn);

module.exports = db;
