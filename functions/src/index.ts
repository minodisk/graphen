import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";

const app = express();

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const graphs = db.collection("graphs");

// type Graph = {
//   id: string;
//   code: string;
// };

app.post("/graphs", async (req, res) => {
  console.log("create:", req.body);

  const graph = await graphs.add({});
  res.json({
    id: graph.id,
    code: "digraph {a -> b}",
  });
});

app.get("/graphs/:graphId", async (req, res) => {
  console.log("read:", req.body);

  const graph = await graphs.doc(req.params.graphId).get();
  res.json(graph);
});

app.put("/graphs/:graphId", async (req, res) => {
  console.log("update:", req.body);
  res.json({
    id: "xxx",
  });
});

app.delete("/graphs/:graphId", async (req, res) => {
  console.log("delete:", req.body);
  res.send();
});

export const api = functions.https.onRequest(app);
