import express from "express";

const app = express();

app.get("/ping", (_req, res) => {
  res.send("ping");
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});