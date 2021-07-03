"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientService_1 = __importDefault(require("../services/patientService"));
const patient_1 = require("../utils/patient");
const router = express_1.Router();
router.get("/", (_req, res) => {
    res.json(patientService_1.default.getAll());
});
router.post("/", (req, res) => {
    try {
        if (patient_1.verifyPatient(req.body)) {
            const { name, dateOfBirth, ssn, gender, occupation } = req.body;
            const patient = patientService_1.default.add({
                name,
                dateOfBirth,
                ssn,
                gender,
                occupation,
                entries: []
            });
            res.status(200).json(patient);
        }
    }
    catch (error) {
        const message = error.message;
        res.status(400).json({ error: message });
    }
});
router.get("/:id", (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(400).json({ error: "Invalid ID" });
    }
});
router.post("/:id/entries", (req, res) => {
    let patient = patientService_1.default.findById(req.params.id);
    if (!patient) {
        res.status(400).json({ error: "Invalid patient" });
    }
    else {
        try {
            if (patient_1.verifyEntry(req.body)) {
                const { type, description, date, specialist, diagnosisCodes } = req.body;
                switch (type) {
                    case "Hospital":
                        const { discharge } = req.body;
                        patient = patientService_1.default.addEntry(patient.id, {
                            type, description, date, specialist, diagnosisCodes, discharge
                        });
                        break;
                    case "OccupationalHealthcare":
                        const { employerName, sickLeave } = req.body;
                        patient = patientService_1.default.addEntry(patient.id, {
                            type, description, date, specialist, diagnosisCodes, employerName, sickLeave
                        });
                        break;
                    case "HealthCheck":
                        const { healthCheckRating } = req.body;
                        patient = patientService_1.default.addEntry(patient.id, {
                            type, description, date, specialist, diagnosisCodes, healthCheckRating
                        });
                        break;
                }
                res.status(200).json(patient);
            }
        }
        catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }
});
exports.default = router;
