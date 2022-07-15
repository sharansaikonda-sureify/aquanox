import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

// Custom Objects
import { SureifyObjectMapping } from "../../constants/som";

// Custom Components
import ObjectMapping from "../ObjectMapping/ObjectMapping";

// Material UI Icons
import { Check, Close } from "@mui/icons-material";

// Material UI Components
import { Button, Stack } from "@mui/material";

// Material UI Colors

const CreateMappingModal = ({
  closeModal,
  show,
  createNewMappings,
  cdsId,
  defaultPayload,
  setShowErrorModal,
  setApiError,
}) => {
  const [data, setData] = useState(new SureifyObjectMapping(defaultPayload));

  useEffect(() => {
    setData(new SureifyObjectMapping(defaultPayload));
  }, [defaultPayload]);

  const handleClose = (isClear) => {
    if (isClear) {
      setData(new SureifyObjectMapping(defaultPayload));
    }
    closeModal();
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={() => {
        handleClose(true);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>JSON Payload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ObjectMapping
          key={data.mapping_id}
          mapping={data}
          setMappings={setData}
          cdsId={cdsId}
          filterMappingsByGroup={() => {}}
          cloneMappings={() => {}}
          setShowErrorModal={setShowErrorModal}
          setApiError={setApiError}
          shouldLockFields={false}
        />
      </Modal.Body>
      <Modal.Footer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          marginTop="15px"
          paddingRight={2}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleClose(true);
            }}
            endIcon={<Close />}
          >
            Close
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => {
              createNewMappings(data.getPostMappings(cdsId), handleClose);
            }}
            endIcon={<Check />}
          >
            Create
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMappingModal;
