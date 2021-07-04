import React from "react";
import { Field, Formik } from "formik";
import { Button, Form, Label, Segment } from "semantic-ui-react";

import { DiagnosisSelection, SelectField, TextField, TypeOption } from "../AddPatientModal/FormField";
import { Entry, EntryType, UnionOmit } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  {value: EntryType.HospitalEntry, label: "Hospital Stay"},
  {value: EntryType.OccupationalHealthcareEntry, label: "Occupational Healthcare"},
  {value: EntryType.HealthCheckEntry, label: "Health Check"}
];

const AddEntryForm = ({onCancel, onSubmit}: Props) => {
  const [{diagnosis}] = useStateValue();

  if (diagnosis == null) {
    return (
      <div></div>
    );
  }

  return (
    <Formik 
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        }
      }}
      onSubmit={onSubmit}
      validate={values => { 
        const requiredError = "Field is required";
        const errors: {[key: string]: string | {[key: string]: string}} = {};
        if (!values.type) {
          errors.type = "Select a type";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (isNaN(Date.parse(values.date))) {
          errors.date = "Enter a valid date";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case "Hospital":
            errors.discharge = {};
            if (!values.discharge.date) {
              errors.discharge.date = requiredError;
            } else if (isNaN(Date.parse(values.discharge.date))) {
              errors.discharge.date = "Enter a valid date";
            }
            if (!values.discharge.criteria) {
              errors.discharge.criteria = requiredError;
            }
            if (Object.keys(errors.discharge).length === 0) {
              delete errors.discharge;
            }
            break;
        }
        return errors;
      }}
    >
      {({values, dirty, isValid, setFieldValue, setFieldTouched}) => {
        return(
          <Form className="form ui">
            <SelectField
                label="Type of entry"
                name="type"
                options={typeOptions}
            />
            <Field label="Description" name="description" placeholder="Description" component={TextField}/>
            <Field label="Date" name="date" placeholder="YYYY-MM-DD " component={TextField}/>
            <Field label="Specialist" name="specialist" placeholder="Specialist" component={TextField}/>
            {values.type === EntryType.HospitalEntry && 
              <Field label="Discharge Date" name="discharge.date" placeholder="YYYY-MM-DD" component={TextField}/>
            }
            {values.type === EntryType.HospitalEntry &&
              <Field label="Discharge Criteria" name="discharge.criteria" placeholder="Discharge Criteria" component={TextField}/>
            }
            <Field label="Diagnosis Codes" name="diagnosisCodes" component={
              () => DiagnosisSelection({
                diagnoses: diagnosis,
                setFieldValue: (field, value) => {
                  if (values.diagnosisCodes?.some(e => e === value[0])) {
                    setFieldValue(field, values.diagnosisCodes.filter(e => e !== value[0]));
                  } else {
                    setFieldValue(field, values.diagnosisCodes?.concat(value));
                  }
                },
                setFieldTouched: setFieldTouched,
              })
            } />
            <Segment basic>
              {values.diagnosisCodes?.map(e => {
                return (
                  <Label key={e}>{e}</Label>
                );
              })}
            </Segment>
            <Button color="red" onClick={onCancel}>Cancel</Button>
            <Button color="green" disabled={!dirty || !isValid} floated="right" onClick={() => onSubmit(values)}>Add</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;