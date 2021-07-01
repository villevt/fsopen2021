import { Router } from "express";

import patientService from "../services/patientService";
import { verifyPatient } from "../utils/patient";

const router = Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAll());
});

router.post("/", (req, res) => {
  try {
    res.status(200).json(verifyPatient(req.body));
  } catch (error) {
    const message = error.message as string;
    res.status(400).json({error: message});
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(400).json({error: "Invalid ID"});
  }
});

export default router;