import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function updatemovie(id, data) {
  return await client
    .db("mogodp1")
    .collection("movies")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function deletemovie(id) {
  return await client
    .db("mogodp1")
    .collection("movies")
    .deleteOne({ _id: new ObjectId(id) });
}
export async function postmovie(data) {
  return await client.db("mogodp1").collection("movies").insertOne(data);
}
export async function idbymovie(id) {
  return await client.db("mogodp1").collection("movies").findOne({ _id: id });
}
export async function allmovie(query) {
  return await client.db("mogodp1").collection("movies").find(query).toArray();
}
