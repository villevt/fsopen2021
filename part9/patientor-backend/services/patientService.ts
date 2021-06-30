import { Patient } from "../types";
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

const patientService = {
  getAll
};

export default patientService;