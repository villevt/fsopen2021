"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPatient = void 0;
const types_1 = require("../types");
const patientService_1 = __importDefault(require("../services/patientService"));
const verifyPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    if (!name || typeof (name) != "string") {
        throw new Error("Incorrect or missing name");
    }
    else if (!dateOfBirth || typeof (dateOfBirth) != "string" || !Date.parse(dateOfBirth)) {
        throw new Error("Incorrect or missing date of birth");
    }
    else if (!ssn || typeof (ssn) != "string") {
        throw new Error("Incorrect or missing social security number");
    }
    else if (!gender || typeof (gender) != "string" || !Object.values(types_1.Gender).includes(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    else if (!occupation || typeof (occupation) != "string") {
        throw new Error("Incorrect or missing occupation");
    }
    else {
        return patientService_1.default.add({
            name,
            dateOfBirth,
            ssn,
            gender: gender,
            occupation
        });
    }
};
exports.verifyPatient = verifyPatient;
