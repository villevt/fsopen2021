import express from "express";

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json())

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
    res.status(400).json({error: "malformatted parameters"});
  }
});

app.post("/exercises", (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.json({error: "parameters missing"})
  } else {
    try {
      const dailyExercises: number[] = Array.isArray(req.body.daily_exercises) && req.body.daily_exercises.map((e: string) => parseInt(e))
      const target: number = parseInt(req.body.target)
      res.json(calculateExercises(dailyExercises, target))
    } catch(error) {
      res.json({error: "malformatted parameters"})
    }
  }
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});