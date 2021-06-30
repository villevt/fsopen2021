import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
app.get("/api/ping", (_req, res) => {
  res.send("ping");
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});