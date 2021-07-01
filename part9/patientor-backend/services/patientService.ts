import {v4 as uuid} from "uuid";

import { Gender, Patient, NewPatient } from "../types";
import patientData from "../data/patients.json";

const patients: Patient[] = patientData.map(({id, name, dateOfBirth, ssn, gender, occupation}) => ({
  id,
  name,
  dateOfBirth,
  ssn,
  gender: gender as Gender,
  occupation,
  entries: []
}));

const getAll = (): Omit<Patient, "ssn">[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const add = (patient: NewPatient): Patient => {
  const id = uuid();
  patients.push({...patient, id});
  return {...patient, id};
};

const findById = (id: string): Patient | undefined => {
  return patients.find(e => e.id === id);
};

const patientService = {
  getAll,
  add,
  findById
};

export default patientService;