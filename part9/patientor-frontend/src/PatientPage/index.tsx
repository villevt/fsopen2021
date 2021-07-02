import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Divider, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";
import PatientEntry from "../components/PatientEntry";

const PatientPage = () => {
  const {id} = useParams<{id: string}>();
  const [{patients}, dispatch] = useStateValue();
  
  const patient = patients[id];

  useEffect(() => {
    if (!patient || !patient.ssn) {  
      const fetchPatient = async () => {
        try {
          const {data: patientFromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          dispatch(updatePatient(patientFromApi));
        } catch(error) {
          console.error(error);
        }
      };
      void fetchPatient();
    }
  }, [patient]);

  if (!patient) {
    return (
      <div>
        <h2>Invalid Patient ID</h2>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <h2>{patient.name} <Icon color="black" className={patient.gender === "male"
          ? "man"
          : patient.gender === "female"
          ? "woman"
          : "other gender"
        }></Icon></h2>
        <Divider />
        ssn: {patient.ssn}
        <Divider />
        occupation: {patient.occupation}
        <Divider />
        <h3>Entries</h3>
        {patient.entries.map(e => {
          return (
            <PatientEntry key={e.id} entry={e} />
          );
        })}
      </Container>
    </div>
  );
};

export default PatientPage;