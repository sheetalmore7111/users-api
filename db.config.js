const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "srv944.hstgr.io / 86.38.202.103",
  user: "sheetal",
  password: "Sheetal@#123",
  database: "sheetal",
});

connection.connect((err) => {
  if (err) throw err;
  else console.log("connected");
});

module.exports = connection;
