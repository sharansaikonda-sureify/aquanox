import React, { useState } from "react";

import { Button, Modal } from "react-bootstrap";
import CustomTextField from "../../../ui-elements/CustomTextField/CustomTextField";
import { defaultPayload, JSONPayload } from "../../../constants/callcds";

const CallCDSModal = React.memo(
  ({ callCdsModalState, setCallCdsModalState, fetchResponse }) => {
    const [data, setData] = useState(new JSONPayload(defaultPayload));

    const handleClose = () => {
      setData(new JSONPayload(defaultPayload));
      setCallCdsModalState({ ...callCdsModalState, showModal: false });
    };

    const changeHandler = (e) => {
      const key = e.target.name;
      const value = e.target.value;

      let newData = { ...data, [key]: value };
      setData(new JSONPayload(newData));
    };
    console.log("call cds modal");

    return (
      <Modal show={callCdsModalState.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>JSON Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-2">
            <CustomTextField
              key="call_cds_modal_field_names"
              data={data}
              labelName="Field Names"
              textFieldId="field_names"
              helperText="JSON array specifying the attributes to be sent in the response"
              isLocked={false}
              changeHandler={changeHandler}
            />
            <CustomTextField
              key="call_cds_modal_input"
              data={data}
              labelName="Input"
              textFieldId="input"
              helperText="JSON object specifying the input payload for the request"
              isLocked={false}
              changeHandler={changeHandler}
            />
            <CustomTextField
              key="call_cds_modal_url"
              data={data}
              labelName="URL"
              textFieldId="url"
              helperText="string specifying the page url for the request"
              isLocked={false}
              changeHandler={changeHandler}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              fetchResponse(data.getPayload(), callCdsModalState.cdsId);
              handleClose();
            }}
          >
            Fetch Response
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default CallCDSModal;
