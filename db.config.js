const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "srv944.hstgr.io",
  user: "u904598717_sheetal",
  password: "Sheetal@#123",
  database: "u904598717_sheetal",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("connected");
});

module.exports = connection;
