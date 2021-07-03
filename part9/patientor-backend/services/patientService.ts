import {v4 as uuid} from "uuid";

import { Patient, NewPatient, Entry, UnionOmit } from "../types";
import patientData from "../data/patients";

const patients: Patient[] = patientData.map(({id, name, dateOfBirth, ssn, gender, occupation, entries}) => ({
  id,
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries
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

const addEntry = (patientId: string, entry: UnionOmit<Entry, "id">): Patient | undefined => {
  const patient = patients.find(e => e.id === patientId);
  const id = uuid();
  patient?.entries.push({...entry, id});
  return patient;
};

const patientService = {
  getAll,
  add,
  findById,
  addEntry
};

export default patientService;