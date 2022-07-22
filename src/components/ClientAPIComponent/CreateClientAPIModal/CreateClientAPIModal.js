import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { ClientAPI } from "../../../constants/clientapi";
import constants from "../../../constants/constants";
import { v4 as uuidv4 } from "uuid";
import ClientAPIObjectMapping from "../ClientAPIObjectMapping/ClientAPIObjectMapping";
import { Stack, Button } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

const CreateClientAPIModal = ({
  createNewClientAPI,
  createMappingState,
  fetchAllClientAPIs,
  cloneMappings,
  closeModal,
  setErrorState,
}) => {
  const [data, setData] = useState(new ClientAPI(createMappingState.mapping));

  // Reset state when modal is closed
  useEffect(() => {
    setData(new ClientAPI(createMappingState.mapping));
  }, [createMappingState.mapping]);

  return (
    <Modal size="xl" show={createMappingState.showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>JSON Payload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ClientAPIObjectMapping
          key={"client_api_object_mapping" + data.client_data_source_uuid}
          objectKey={"client_api_object_mapping" + data.client_data_source_uuid}
          fetchAllClientAPIs={fetchAllClientAPIs}
          cloneMappings={cloneMappings}
          mapping={data}
          setMapping={setData}
          isShowCtaBar={false}
          shouldLockFields={false}
          setErrorState={setErrorState}
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
              await createNewClientAPI(data.getPostMappings(), closeModal);
            }}
            endIcon={<Check />}
          >
            Create
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};;;

export default CreateClientAPIModal;
