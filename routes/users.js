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
app.post("/addUser", async (req, res) => {
  const { firstName, lastName, userRole } = req.body;
  if (!firstName || !lastName || !userRole) {
    return res
      .status(400)
      .json({ error: "firstName, lastName, and userRole are required fields" });
  }
  const values = [firstName, lastName, userRole];
  const querry =
    "insert into users (firstName, lastName, userRole) values (?, ?, ?)";
  await connection
    .query(querry, values)
    .then((response) => {
      const [result] = response;
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update User:
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  if (/^[0-9]/.test(id)) {
    const querry =
      "update users set firstName=?, lastName=?, userRole=? where id=?";
    const { firstName, lastName, userRole } = req.body;
    const values = [firstName, lastName, userRole, id];
    await connection
      .query(querry, values)
      .then((response) => {
        const [result] = response;
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("Invalid id");
  }
});

// Delete User;
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const querry = "delete from users where id = ?";
  await connection
    .query(querry, id)
    .then((response) => {
      const [result] = response;
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
