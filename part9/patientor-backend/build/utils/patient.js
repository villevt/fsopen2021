"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEntry = exports.verifyPatient = void 0;
const types_1 = require("../types");
const verifyPatient = (patient) => {
    const { name, dateOfBirth, ssn, gender, occupation } = patient;
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
        return true;
    }
};
exports.verifyPatient = verifyPatient;
const isDiagnosisCodes = (diagnosisCodes) => {
    return Array.isArray(diagnosisCodes) && diagnosisCodes.every(e => typeof (e) === "string");
};
const isDischarge = (discharge) => {
    return discharge != null && typeof (discharge) === "object"
        && discharge.date != null && !isNaN(Date.parse(discharge.date))
        && discharge.criteria != null && typeof discharge.criteria === "string";
};
const isSickLeave = (sickLeave) => {
    return sickLeave != null && typeof (sickLeave) === "object"
        && sickLeave.startDate != null && !isNaN(Date.parse(sickLeave.startDate))
        && sickLeave.endDate != null && !isNaN(Date.parse(sickLeave.endDate));
};
const isHealthCheckRating = (healthCheckRating) => {
    return healthCheckRating != null && healthCheckRating in types_1.HealthCheckRating;
};
const verifyEntry = (entry) => {
    const { description, date, specialist, diagnosisCodes, type, discharge, employerName, sickLeave, healthCheckRating } = entry;
    if (!type || typeof (type) != "string") {
        throw new Error("Incorrect or missing type");
    }
    else if (!description || typeof (description) != "string") {
        throw new Error("Incorrect or missing description");
    }
    else if (!date || typeof (date) != "string" || !Date.parse(date)) {
        throw new Error("Incorrect or missing date");
    }
    else if (!specialist || typeof (specialist) != "string") {
        throw new Error("Incorrect or missing specialist");
    }
    else if (diagnosisCodes && !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error("Incorrect diagnosis codes");
    }
    switch (type) {
        case "Hospital":
            if (!isDischarge(discharge)) {
                throw new Error("Incorrect or missing discharge");
            }
            break;
        case "OccupationalHealthcare":
            if (!employerName || typeof (employerName) != "string") {
                throw new Error("Incorrect or missing employer name");
            }
            else if (sickLeave && !isSickLeave(sickLeave)) {
                throw new Error("Incorrect or missing sick leave");
            }
            break;
        case "HealthCheck":
            if (!isHealthCheckRating(healthCheckRating)) {
                throw new Error("Incorrect or missing health check rating");
            }
            break;
        default:
            throw new Error("Incorrect or missing entry type");
    }
    return true;
};
exports.verifyEntry = verifyEntry;
