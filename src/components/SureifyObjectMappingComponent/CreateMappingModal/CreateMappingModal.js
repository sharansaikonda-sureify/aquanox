import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

// Custom Objects
import { SureifyObjectMapping } from "../../../constants/som";

// Custom Components
import ObjectMapping from "../ObjectMapping/ObjectMapping";

// Material UI Icons
import { Check, Close } from "@mui/icons-material";

// Material UI Components
import { Button, Stack } from "@mui/material";

// Material UI Colors

const CreateMappingModal = React.memo(
  ({ createNewMappings, createMappingState, closeModal, setErrorState }) => {
    const [data, setData] = useState(
      new SureifyObjectMapping(createMappingState.mapping)
    );

    // Reset state when modal is closed
    useEffect(() => {
      setData(new SureifyObjectMapping(createMappingState.mapping));
    }, [createMappingState.mapping]);

    console.count("Create Mapping Modal");
    return (
      <Modal size="xl" show={createMappingState.showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>JSON Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ObjectMapping
            key={"object_mapping" + data.mapping_id}
            objectKey={"object_mapping" + data.mapping_id}
            mapping={data}
            setMapping={setData}
            cdsId={createMappingState.cdsId}
            filterMappingsByGroup={() => {}}
            cloneMappings={() => {}}
            setErrorState={setErrorState}
            isShowCtaBar={false}
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
              onClick={closeModal}
              endIcon={<Close />}
            >
              Close
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={async () => {
                await createNewMappings(
                  data.getPostMappings(createMappingState.cdsId),
                  closeModal
                );
              }}
              endIcon={<Check />}
            >
              Create
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default CreateMappingModal;
