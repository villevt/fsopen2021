import { Router } from "express";

import patientService from "../services/patientService";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { verifyEntry, verifyPatient } from "../utils/patient";

const router = Router();

router.get("/", (_req, res) => {
  res.json(patientService.getAll());
});

router.post("/", (req, res) => {
  try {
    if (verifyPatient(req.body)) {
      const {name, dateOfBirth, ssn, gender, occupation} = req.body;
      const patient = patientService.add({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries: []
      });
      res.status(200).json(patient);
    }
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

router.post("/:id/entries", (req, res) => {
  let patient = patientService.findById(req.params.id);
  if (!patient) {
    res.status(400).json({error: "Invalid patient"});
  } else {
    try {
      if (verifyEntry(req.body)) {
        const {type, description, date, specialist, diagnosisCodes} = req.body;
        switch(type) {
          case "Hospital":
            const {discharge} = req.body as HospitalEntry;
            patient = patientService.addEntry(patient.id, {
              type, description, date, specialist, diagnosisCodes, discharge
            });
            break;
          case "OccupationalHealthcare":
            const {employerName, sickLeave} = req.body as OccupationalHealthcareEntry;
            patient = patientService.addEntry(patient.id, {
              type, description, date, specialist, diagnosisCodes, employerName, sickLeave
            });
            break;
          case "HealthCheck":
            const {healthCheckRating} = req.body as HealthCheckEntry;
            patient = patientService.addEntry(patient.id, {
              type, description, date, specialist, diagnosisCodes, healthCheckRating
            });
            break;
        }
        res.status(200).json(patient);
      }
    } catch (error) {
      const message = error.message as string;
      res.status(400).json({error: message});
    }
  }
});

export default router;