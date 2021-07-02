import React from "react";
import { Entry } from "../types";

const PatientEntry = ({entry} : {entry: Entry}) => (
  <div>
    {entry.date} <i>{entry.description}</i>
    <ul className="ui list">
      {entry.diagnosisCodes?.map(e => {
        return (
          <li key={e}>{e}</li>
        );
      })}
    </ul>
  </div>
);

export default PatientEntry;