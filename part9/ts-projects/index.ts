import express from "express";
import { Interface } from "readline";

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

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

app.post("/exercises", (req, res) => {
  const daily_exercises = Array.isArray(req.query.daily_exercises) && req.query.daily_exercises.every(e => e);
    ? 
  calculateExercises(daily_exercises, query.target);
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});