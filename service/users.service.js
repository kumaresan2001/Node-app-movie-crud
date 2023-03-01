import { client } from "../index.js";

export async function createusers(data) {
  return await client.db("mogodp1").collection("users").insertOne(data);
}
export async function getuserbyname(username) {
  return await client
    .db("mogodp1")
    .collection("users")
    .findOne({ username: username });
}
