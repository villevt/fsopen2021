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
        res.status(200).json(patient_1.verifyPatient(req.body));
    }
    catch (error) {
        const message = error.message;
        res.status(400).json({ error: message });
    }
});
exports.default = router;
