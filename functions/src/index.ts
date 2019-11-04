import * as functions from "firebase-functions";

export const createGraph = functions.https.onRequest((req, res) => {
  console.log("read:", req.body);
  res.json({
    id: "xxx",
    code: "digraph {a -> b}",
  });
});

export const readGraph = functions.https.onRequest((req, res) => {
  console.log("read:", req.body);
  res.json({
    id: "xxx",
    code: "digraph {a -> b}",
  });
});

export const updateGraph = functions.https.onRequest((req, res) => {
  console.log("update:", req.body);
  res.json({
    id: "xxx",
  });
});

export const deleteGraph = functions.https.onRequest((req, res) => {
  console.log("delete:", req.body);
  res.send();
});
