// Packages
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

// Custom Objects
import { ClientAPI } from "../../../constants/clientapi";

// Custom Components
import ClientAPIObjectMapping from "../ClientAPIObjectMapping/ClientAPIObjectMapping";

// Material UI Components
import { Stack, Button } from "@mui/material";

// Material UI Icons
import { Check, Close } from "@mui/icons-material";

// Material UI Colors
import { deepOrange } from "@mui/material/colors";

const CreateClientAPIModal = ({
  createNewClientAPI,
  createMappingState,
  fetchAllClientAPIs,
  cloneMappings,
  closeModal,
  setErrorState,
}) => {
  const [data, setData] = useState(new ClientAPI(createMappingState.mapping));

  const pasteMappings = async (e) => {
    try {
      const copiedDataStr = await navigator.clipboard.readText();
      const copiedData = JSON.parse(copiedDataStr);
      const mapping = new ClientAPI(copiedData);
      mapping.client_data_source_uuid = uuidv4();
      setData(mapping);
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  // Reset state when modal is closed
  useEffect(() => {
    setData(new ClientAPI(createMappingState.mapping));
  }, [createMappingState.mapping]);

  return (
    <Modal size="xl" show={createMappingState.showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          JSON Payload
          <Button
            sx={{
              color: deepOrange[900],
              "&:hover": {
                color: deepOrange[800],
              },
            }}
            onClick={pasteMappings}
          >
            Paste
          </Button>
        </Modal.Title>
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
};

export default CreateClientAPIModal;
