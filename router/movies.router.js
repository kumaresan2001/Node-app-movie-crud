import express from "express";
// const express = require("express");
import {
  allmovie,
  idbymovie,
  postmovie,
  deletemovie,
  updatemovie,
} from "../service/movies.service.js";
const router = express.Router();

//express.json(-middleware)
router.post("/post", async function (request, response) {
  const data = request.body;
  // return res.status(200).json(req.body);
  const result = await postmovie(data);
  result
    ? response.send({ message: "post movie is successful" })
    : response.status(404).send({ message: "movie is not" });
});

router.get("/getall", async function (request, response) {
  const movies = await allmovie();
  response.send(movies);
});
// movies id
router.get("/getall/:id", async function (request, response) {
  const { id } = request.params;
  //db.movies.findOne({id:"100"})
  const movie = await idbymovie(id);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie is not" });
});

// movies deleted by id
router.delete("/delete/:id", async function (request, response) {
  const { id } = request.params;
  //db.movies.deleteOne({id:"100"})
  const result = await deletemovie(id);
  result.deletedCount >= 1
    ? response.send({ message: "delete movie is successful" })
    : response.status(404).send({ message: "movie is not" });
});

// update
router.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  console.log(id);
  // db.movies.updatedOne({id:id},{$set:data})
  const result = await updatemovie(id, data);

  response.send(result);
});

export default router;
