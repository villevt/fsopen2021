import diagnoses from "../data/diagnoses.json";
import { Diagnose } from "../types";

const getAll = (): Diagnose[] => {
  return diagnoses;
};

const diagnoseService = {
  getAll
};

export default diagnoseService;