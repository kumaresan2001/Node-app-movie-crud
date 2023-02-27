import { client } from "../index.js";

export async function updatemovie(id, data) {
  return await client
    .db("mogodp1")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deletemovie(id) {
  return await client.db("mogodp1").collection("movies").deleteOne({ id: id });
}
export async function postmovie(data) {
  return await client.db("mogodp1").collection("movies").insertMany(data);
}
export async function idbymovie(id) {
  return await client.db("mogodp1").collection("movies").findOne({ id: id });
}
export async function allmovie() {
  return await client.db("mogodp1").collection("movies").find({}).toArray();
}
