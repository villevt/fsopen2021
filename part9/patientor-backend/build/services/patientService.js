"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
}));
const getAll = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const add = (patient) => {
    const id = uuid_1.v4();
    patients.push(Object.assign(Object.assign({}, patient), { id }));
    return Object.assign(Object.assign({}, patient), { id });
};
const findById = (id) => {
    return patients.find(e => e.id === id);
};
const addEntry = (patientId, entry) => {
    const patient = patients.find(e => e.id === patientId);
    const id = uuid_1.v4();
    patient === null || patient === void 0 ? void 0 : patient.entries.push(Object.assign(Object.assign({}, entry), { id }));
    return patient;
};
const patientService = {
    getAll,
    add,
    findById,
    addEntry
};
exports.default = patientService;
