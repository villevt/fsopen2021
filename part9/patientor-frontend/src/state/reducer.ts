import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {id: string, data: Entry};
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: action.payload
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries = patient.entries.concat(action.payload.data);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};

export const updatePatient = (data: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: data
  };
};

export const setDiagnosis = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload: data
  };
};

export const addEntry = (id: string, data: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {id, data}
  };
};