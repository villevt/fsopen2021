import express from "express";

import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const weight= parseInt(String(req.query.weight));
    const height = parseInt(String(req.query.height));
    const bmi = calculateBmi(height, weight);

    res.json({weight, height, bmi});
  } catch(error) {
    res.json({error: "malformatted parameters"});
  }
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});