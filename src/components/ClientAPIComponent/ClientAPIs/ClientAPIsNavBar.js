// Packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Material UI Compionents
import {
  Stack,
  Button,
  TextField,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";

// Material UI Icons
import {
  AccessAlarm,
  CreateNewFolder,
  Home,
  Search,
} from "@mui/icons-material";

// Material UI Colors
import { yellow } from "@mui/material/colors";

// Custom Objects
import { ClientAPI, defaultPayload } from "../../../constants/clientapi";

// Custom Functions
import CreateClientAPIModal from "../CreateClientAPIModal/CreateClientAPIModal";

const ClientAPIsNavBar = React.memo(
  ({
    createNewClientAPI,
    fetchAllClientAPIs,
    fetchClientAPI,
    cloneMappings,
    mappingsState,
    setMappingsState,
    setErrorState,
  }) => {
    const navigate = useNavigate();

    // useState
    const [apiIdStr, setApiIdStr] = useState("");

    const [createMappingState, setCreateMappingState] = useState({
      mapping: new ClientAPI(defaultPayload),
      showModal: false,
    });

    // Handlers
    const toggleAllParents = () => {
      const newTogCont = {};
      for (const key in mappingsState.toggleContainers) {
        newTogCont[key] = !mappingsState.isCollapseAll;
      }

      setMappingsState({
        ...mappingsState,
        toggleContainers: newTogCont,
        isCollapseAll: !mappingsState.isCollapseAll,
      });
    };

    const openCreateMappingModal = () => {
      setCreateMappingState({
        mapping: new ClientAPI({
          ...createMappingState.mapping,
        }),
        showModal: true,
      });
    };

    const closeCreateMappingModal = React.useCallback(() => {
      setCreateMappingState({
        mapping: new ClientAPI(defaultPayload),
        apiId: 0,
        showModal: false,
      });
    }, []);

    console.count("Client API Navbar");

    return (
      <>
        <CreateClientAPIModal
          key={"client_api_create_clientapi_modal"}
          createNewClientAPI={createNewClientAPI}
          createMappingState={createMappingState}
          fetchAllClientAPIs={fetchAllClientAPIs}
          cloneMappings={cloneMappings}
          closeModal={closeCreateMappingModal}
          setErrorState={setErrorState}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "black" }}
            onClick={() => {
              navigate("/");
            }}
            startIcon={<Home />}
          >
            AQUANOX
          </Button>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <TextField
              id="api_id"
              name="api_id"
              label="Client API ID (Comma separated)"
              variant="outlined"
              onChange={(e) => {
                setApiIdStr(e.target.value);
              }}
              inputProps={{
                style: {
                  padding: "10px",
                  width: "15vw",
                },
              }}
              value={apiIdStr}
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={mappingsState.isCollapseAll}
                    onChange={toggleAllParents}
                  />
                }
                label="Show | Hide"
              />
            </FormGroup>
            <Button
              variant="contained"
              color="primary"
              id="create_mapping_button"
              name="create_mapping_button"
              onClick={openCreateMappingModal}
              endIcon={<CreateNewFolder />}
            >
              Create
            </Button>
            <Button
              variant="contained"
              color="primary"
              id="clone_all_button"
              name="clone_all_button"
              onClick={async () => {
                await fetchClientAPI(apiIdStr);
              }}
              endIcon={<AccessAlarm />}
            >
              Fetch Specified APIs
            </Button>
            <Button
              variant="contained"
              color="primary"
              id="fetch_all_button"
              name="fetch_all_button"
              onClick={async () => {
                await fetchAllClientAPIs();
              }}
              endIcon={<Search />}
            >
              Fetch All
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
);

export default ClientAPIsNavBar;
