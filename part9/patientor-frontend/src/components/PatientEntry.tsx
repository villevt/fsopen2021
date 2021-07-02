import React from "react";

import { useStateValue } from "../state";
import { Entry } from "../types";

const PatientEntry = ({entry} : {entry: Entry}) => {
  const [{diagnosis}] = useStateValue();

  if (!diagnosis) {
    return (
      <div>
      </div>
    );
  }

  return (
    <div>
      {entry.date} <i>{entry.description}</i>
      <ul className="ui list">
        {entry.diagnosisCodes?.map(e => {
          return (
            <li key={e}>{e} {diagnosis[e]}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientEntry;