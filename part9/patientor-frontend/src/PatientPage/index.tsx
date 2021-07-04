import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Divider, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { addEntry, setDiagnosis, updatePatient, useStateValue } from "../state";
import { Diagnosis, Entry, Patient } from "../types";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const {id} = useParams<{id: string}>();
  const [{patients, diagnosis}, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  
  const patient = patients[id];

  useEffect(() => {
    if (!diagnosis) {
      const fetchDiagnosis = async () => {
        try {
          const {data: diagnosisFromApi} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
          dispatch(setDiagnosis(diagnosisFromApi));
        } catch(error) {
          console.error(error);
        }
      };
      void fetchDiagnosis();
    }
  }, [diagnosis]);

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

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      setOpen(false);
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      //setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
            <EntryDetails key={e.id} entry={e} />
          );
        })}
      <Button floated="right" onClick={() => setOpen(true)}>Add Entry</Button>
      {diagnosis != null && <AddEntryModal onClose={() => setOpen(false)} onSubmit={submitNewEntry} open={open}/>}
      </Container>
    </div>
  );
};

export default PatientPage;