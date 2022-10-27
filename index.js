import express from "express";
import CheckIfUsersIsEmpty from "./middleware/CheckIfUsersIsEmpty.js";
import CheckIfValidBodyEmail from "./middleware/CheckIfValidBodyEmail.js";
import CheckIfValidQueryEmail from "./middleware/CheckIfValidQueryEmail.js";
import CheckIfEmailExist from "./middleware/CheckIfEmailExist.js";
import CreateUser from "./middleware/CreateUser.js";
import FindUserValidator from "./middleware/FindUserValidator.js";

const app = express();
const port = 3000;

app.use(express.json());

const users = [];
const setUsersInfo = (users) => {

  return (req, res, next) => {
    req.requestUsersInfo = users;
    next();
  };
};

app.use(setUsersInfo(users));

app.get("/", (req, res) => {

  return res.send("Hello World!");
});

app.get("/users", CheckIfUsersIsEmpty, (req, res) => {

  return res.status(200).json(req.requestUsersInfo);
});

app.get("/users/:userId", FindUserValidator, (req, res) => {
  const userId = req.params.userId;
  const findUser = users.find((user) => user.id === parseInt(userId));

  return res.status(200).json(findUser);
})

app.post("/users", CheckIfValidBodyEmail, CheckIfEmailExist, CreateUser);

app.put("/users/:userId", FindUserValidator, CheckIfValidBodyEmail, (req, res) => {
  const {email} = req.body;
  const userId = req.params.userId;
  const findUser = users.find((user) => user.id === parseInt(userId));

  findUser.email = email;
  console.log("Account succesfully Updated");

  return res.status(200).json(findUser);
});

app.listen(port, () => {
  console.log(`Server is Listening on port ${port}`);
});
