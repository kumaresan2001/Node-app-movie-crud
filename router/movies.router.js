import express from "express";
// const express = require("express");
import { auth } from "../middleware/auth.js";
import {
  allmovie,
  idbymovie,
  postmovie,
  deletemovie,
  updatemovie,
} from "../service/movies.service.js";
const router = express.Router();

// express.json(-middleware);
router.post("/", async function (request, response) {
  const data = request.body;
  // console.log("hi");
  // console.log(data);
  // return res.status(200).json(req.body);
  const result = await postmovie(data);
  result
    ? response.send({ message: "post movie is successful" })
    : response.status(404).send({ message: "movie is not" });
});

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await allmovie(request.query);
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  response.send(movies);
});
// movies id
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  //db.movies.findOne({id:"100"})
  const movie = await idbymovie(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie is not" });
});

// movies deleted by id
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  //db.movies.deleteOne({id:"100"})
  const result = await deletemovie(id);
  result.deletedCount >= 1
    ? response.send({ message: "delete movie is successful" })
    : response.status(404).send({ message: "movie is not" });
});

// update
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  console.log(id);
  // db.movies.updatedOne({id:id},{$set:data})
  const result = await updatemovie(id, data);

  response.send(result);
});

export default router;
