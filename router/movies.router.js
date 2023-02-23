import express from "express";
import {
  allmovie,
  idbymovie,
  postmovie,
  deletemovie,
  updatemovie,
} from "../service/movies.service.js";
const router = express.Router();

router.get("/", async function (request, response) {
  const movies = await allmovie();
  response.send(movies);
});
// movies id
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  //db.movies.findOne({id:"100"})
  const movie = await idbymovie(id);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie is not" });
});

//express.json(-middleware)
router.post("/movies", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await postmovie(data);
  response.send(result);
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
router.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  console.log(id);
  // db.movies.updatedOne({id:id},{$set:data})
  const result = await updatemovie(id, data);

  response.send(result);
});

export default router;
