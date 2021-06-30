"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_json_1 = __importDefault(require("../data/patients.json"));
const getAll = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender,
        occupation
    }));
};
const add = (patient) => {
    const id = uuid_1.v4();
    patients_json_1.default.push(Object.assign(Object.assign({}, patient), { id }));
    return Object.assign(Object.assign({}, patient), { id });
};
const patientService = {
    getAll,
    add
};
exports.default = patientService;
