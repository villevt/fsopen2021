import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosesRouter);
app.get("/api/ping", (_req, res) => {
  res.send("ping");
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});