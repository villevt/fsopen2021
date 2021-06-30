import { Gender, Patient } from "../types";
import patientService from "../services/patientService";

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

export const verifyPatient = ({name, dateOfBirth, ssn, gender, occupation}:Fields): Patient | undefined => {
  if (!name || typeof(name) != "string") {
    throw new Error("Incorrect or missing name");
  } else if (!dateOfBirth || typeof(dateOfBirth) != "string" || !Date.parse(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  } else if (!ssn || typeof(ssn) != "string") {
    throw new Error("Incorrect or missing social security number");
  } else if (!gender || typeof(gender) != "string" || !Object.values(Gender).includes(gender as Gender)) {
    throw new Error("Incorrect or missing gender");
  } else if (!occupation || typeof(occupation) != "string") {
    throw new Error("Incorrect or missing occupation");
  } else {
    return patientService.add({
      name,
      dateOfBirth,
      ssn,
      gender: gender as Gender,
      occupation
    });
  }
};