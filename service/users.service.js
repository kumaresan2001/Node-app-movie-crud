import { client } from "../index.js";

export async function createusers(data) {
  return await client.db("mogodp1").collection("users").insertOne(data);
}
