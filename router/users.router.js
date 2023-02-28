import express from "express";
// const express = require("express");
import { createusers } from "../service/users.service.js";
import bcrypt from "bcrypt";
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
  const hashedPassword = await generatePassword(password);
  //   console.log(data);

  const result = await createusers({
    username: username,
    password: hashedPassword,
  });
  response.send(result);
});

export default router;
