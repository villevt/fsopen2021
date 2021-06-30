import {v4 as uuid} from "uuid";

import { Patient, NewPatient } from "../types";
import patients from "../data/patients.json";

const getAll = (): Omit<Patient, "ssn">[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const add = (patient: NewPatient): Patient => {
  const id = uuid();
  patients.push({...patient, id});
  return {...patient, id};
};

const patientService = {
  getAll,
  add
};

export default patientService;