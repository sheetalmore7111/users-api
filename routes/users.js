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
app.get("/getUsers", (req, res) => {
  const querry = "select * from users";
  connection.query(querry, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// Post Users:
app.post("/addUser", (req, res) => {
  const { firstName, lastName, role } = req.body;
  const values = [firstName, lastName, role];
  const querry =
    "insert into users (firstName, lastName, role) values (?, ?, ?)";
  connection.query(querry, values, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// Update User:
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const querry = "update users set firstName=?, lastName=?, role=? where id=?";
  const { firstName, lastName, role } = req.body;
  const values = [firstName, lastName, role, id];
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
