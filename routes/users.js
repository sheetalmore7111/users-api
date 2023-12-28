// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
const express = require("express");
const connection = require("../db.config");

let app = express();

// Get All Users
app.get("/getUsers", async (req, res) => {
  const querry = "select * from users";
  await connection
    .query(querry)
    .then((response) => {
      const [result] = response;
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post Users:
app.post("/addUser", (req, res) => {
  const { firstName, lastName, userRole } = req.body;
  const values = [firstName, lastName, userRole];
  const querry =
    "insert into users (firstName, lastName, userRole) values (?, ?, ?)";
  connection.query(querry, values, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// Update User:
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const querry =
    "update users set firstName=?, lastName=?, userRole=? where id=?";
  const { firstName, lastName, userRole } = req.body;
  const values = [firstName, lastName, userRole, id];
  connection.query(querry, values, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// Delete User;
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const querry = "delete from users where id = ?";
  connection.query(querry, id, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

module.exports = app;
