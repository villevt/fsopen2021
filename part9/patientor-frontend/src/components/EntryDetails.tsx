import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { assertNever } from "assert-never";

import { useStateValue } from "../state";
import { Entry } from "../types";

const EntryDetails = ({entry} : {entry: Entry}) => {
  const [{diagnosis}] = useStateValue();

  if (!diagnosis) {
    return (
      <div></div>
    );
  }

  let icon: string;
  let employer = "";
  let healthIcon = <div></div>;
  const diagnosisList = entry.diagnosisCodes
    ? <Card.Content>
        <ul className="ui list">
          {entry.diagnosisCodes.map(e => {
            return (
              <li key={e}>{e} {diagnosis.find(a => a.code === e)?.name}</li>
            );
          })}
        </ul>
      </Card.Content>
    : <div></div>;

  switch(entry.type) {
    case "Hospital":
      icon = "hospital";
      break;
    case "OccupationalHealthcare":
      icon = "suitcase";
      employer = entry.employerName;
      break;
    case "HealthCheck":
      icon = "stethoscope";
      switch (entry.healthCheckRating) {
        case 0:
          healthIcon = <Card.Content extra><Icon className="heart" color="green" /></Card.Content>;
          break;
        case 1:
          healthIcon = <Card.Content extra><Icon className="heart" color="yellow" /></Card.Content>;
          break;
        case 2:
          healthIcon = <Card.Content extra><Icon className="heart" color="orange" /></Card.Content>;
          break;
        case 3:
          healthIcon = <Card.Content extra><Icon className="heart" color="red" /></Card.Content>;
          break;
      }
      break;
    default:
      return assertNever(entry);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          {" "}
          <Icon className={icon}/>
          {employer}
        </Card.Header>
      </Card.Content>
      <Card.Content description={entry.description} />
      {diagnosisList}
      {healthIcon}
    </Card>
  );
};

export default EntryDetails;