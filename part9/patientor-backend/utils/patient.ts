import { Diagnose, Discharge, Entry, Gender, HealthCheckRating, Patient, SickLeave } from "../types";

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

export const verifyPatient = (patient:Fields):patient is Patient => {
  const {name, dateOfBirth, ssn, gender, occupation} = patient;
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
    return true;
  }
};

const isDiagnose = (diagnose: unknown): diagnose is Diagnose => {
  return diagnose != null && typeof(diagnose) === "object" 
    && (diagnose as Diagnose).code != null && typeof((diagnose as Diagnose).code) === "string"
    && (diagnose as Diagnose).name != null && typeof((diagnose as Diagnose).name) === "string"
    && (diagnose as Diagnose).latin == null || typeof((diagnose as Diagnose).latin) === "string";
};

const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnose['code']> => {
  return Array.isArray(diagnosisCodes) && diagnosisCodes.every(isDiagnose);
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return discharge != null && typeof(discharge) === "object"
    && (discharge as Discharge).date != null && !isNaN(Date.parse((discharge as Discharge).date))
    && (discharge as Discharge).criteria != null && typeof(discharge as Discharge).criteria === "string";
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return sickLeave != null && typeof(sickLeave) === "object"
    && (sickLeave as SickLeave).startDate != null && !isNaN(Date.parse((sickLeave as SickLeave).startDate))
    && (sickLeave as SickLeave).endDate != null && !isNaN(Date.parse((sickLeave as SickLeave).endDate));
};

const isHealthCheckRating = (healthCheckRating: unknown): healthCheckRating is HealthCheckRating => {
  return healthCheckRating != null && healthCheckRating as HealthCheckRating in HealthCheckRating;
};

type EntryFields = {description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, 
  discharge?: unknown, employerName?: unknown, sickLeave?: unknown, healthCheckRating?: unknown};

export const verifyEntry = (entry: EntryFields):entry is Entry => {
  const {description, date, specialist, diagnosisCodes, type, discharge, employerName, sickLeave, healthCheckRating} = entry;
  if (!type || typeof(type) != "string") {
    throw new Error("Incorrect or missing type");
  } else if (!description || typeof(description) != "string") {
    throw new Error("Incorrect or missing description");
  } else if (!date || typeof(date) != "string" || !Date.parse(date)) {
    throw new Error("Incorrect or missing date");
  } else if (!specialist || typeof(specialist) != "string") {
    throw new Error("Incorrect or missing specialist");
  } else if (diagnosisCodes && isDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect diagnosis codes");
  }

  switch(type) {
    case "Hospital":
      if (!isDischarge(discharge)) {
        throw new Error("Incorrect or missing discharge");
      } break;
    case "OccupationalHealthcare":
      if (!employerName || typeof(employerName) != "string") {
        throw new Error("Incorrect or missing employer name");
      } else if (sickLeave && !isSickLeave(sickLeave)) {
        throw new Error("Incorrect or missing sick leave");
      } break;
    case "HealthCheck":
      if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing health check rating");
      } break;
    default:
      throw new Error("Incorrect or missing entry type");
  }

  return true;
};