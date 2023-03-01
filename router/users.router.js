import express from "express";
// const express = require("express");
import { createusers, getuserbyname } from "../service/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function generatePassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;

  //   console.log(data);
  const userfromdp = await getuserbyname(username);
  if (userfromdp) {
    response.status(400).send({ message: "username alredy exists" });
  } else if (password.lenght < 8) {
    response.status(400).send({ message: "password must 8" });
  } else {
    const hashedPassword = await generatePassword(password);

    const result = await createusers({
      username: username,
      password: hashedPassword,
    });
    response.send(result);
  }
});
//lodin-message
router.post("/login", async function (request, response) {
  const { username, password } = request.body;

  //   console.log(data);
  const userfromdp = await getuserbyname(username);
  if (!userfromdp) {
    response.status(401).send({ message: "Invalid credentials" });
  } else {
    const storedppassword = userfromdp.password;
    const ispasswordcheck = await bcrypt.compare(password, storedppassword);
    console.log(ispasswordcheck);
    if (ispasswordcheck) {
      const token = jwt.sign({ id: userfromdp._id }, process.env.SECRET_KEY);
      response.send({ message: "successful lodin", token: token });
    } else {
      response.status(401).send({ message: "Invalid credentials" });
    }
  }
});

export default router;
