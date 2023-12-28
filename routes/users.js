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
  const {
    firstName,
    userRole,
    imageUrl,
    emailId,
    contact,
    designation,
    company,
  } = req.body;
  if (
    !firstName ||
    !userRole ||
    !imageUrl ||
    !emailId ||
    !contact ||
    !designation ||
    !company
  ) {
    return res.status(400).json({ error: "All fields are Compulsory to fill" });
  }
  const values = [
    firstName,
    userRole,
    imageUrl,
    emailId,
    contact,
    designation,
    company,
  ];
  const querry =
    "insert into users (firstName, userRole, imageUrl, emailId, contact, designation, company) values (?, ?, ?, ?, ?, ?,?)";
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
      "update users set firstName=?, userRole=?, imageUrl=?, emailId=?, contact=?, designation=?, company=? where id=?";
    const {
      firstName,
      userRole,
      imageUrl,
      emailId,
      contact,
      designation,
      company,
    } = req.body;
    const values = [
      firstName,
      userRole,
      imageUrl,
      emailId,
      contact,
      designation,
      company,
      id,
    ];
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
