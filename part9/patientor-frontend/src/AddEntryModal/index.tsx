import React from "react";
import { Modal } from "semantic-ui-react";

import AddEntryForm, {EntryFormValues} from "./AddEntryForm";

interface Props {
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  open: boolean;
}

const AddEntryModal = ({onClose, onSubmit, open}: Props) => {
  return (
    <Modal centered={false} onClose={onClose} open={open}>
      <Modal.Header>
        Add a new patient entry
      </Modal.Header>
      <Modal.Content>
        <AddEntryForm onCancel={onClose} onSubmit={onSubmit}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;