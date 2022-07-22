// Packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Build,
  CopyAll,
  CreateNewFolder,
  Home,
  ScheduleSend,
  Search,
} from "@mui/icons-material";

// Material UI Colors
import { yellow } from "@mui/material/colors";

// Custom Components
import GenerateMappingsModal from "../GenerateMappingsModal/GenerateMappingsModal";
import CreateMappingModal from "../CreateMappingModal/CreateMappingModal";
import CallCDSModal from "../CallCDSModal/CallCDSModal";

// Custom Objects
import { SureifyObjectMapping, defaultPayload } from "../../../constants/som";

const SureifyObjectMappingsNavBar = React.memo(
  ({
    screenAdjusterState,
    setScreenAdjusterState,
    createNewMappings,
    setCreateMappingMainState,
    mappingsState,
    setMappingsState,
    fetchMappings,
    fetchResponse,
    setErrorState,
  }) => {
    const navigate = useNavigate();

    // useState
    const [cdsId, setCdsId] = useState(0);

    const [createMappingState, setCreateMappingState] = useState({
      mapping: new SureifyObjectMapping(defaultPayload),
      cdsId: 0,
      showModal: false,
    });

    const [generateMappingsState, setGenerateMappingsState] = useState({
      apiIds: {},
      cdsIds: {},
      showModal: false,
    });

    const [callCdsModalState, setCallCdsModalState] = useState({
      cdsId: 0,
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
        mapping: new SureifyObjectMapping({
          ...createMappingState.mapping,
          parent_idx: 0,
        }),
        cdsId: cdsId,
        showModal: true,
      });
    };

    const closeCreateMappingModal = React.useCallback(() => {
      setCreateMappingState({
        mapping: new SureifyObjectMapping(defaultPayload),
        cdsId: 0,
        showModal: false,
      });
    }, []);

    const generateClonedFile = () => {
      let apiIds = {};
      let cdsList = {};
      for (let i = 0; i < mappingsState.mappings.length; i++) {
        const matchedAPIIDArr =
          mappingsState.mappings[i].field_source.match(/api\.(.*?)$/);
        if (matchedAPIIDArr) {
          apiIds[+matchedAPIIDArr[1]] = null;
        }

        const matchedIter =
          mappingsState.mappings[i].formatter.matchAll(/cds\((\d{1,})[ ]*,/g);
        let temp = matchedIter.next();
        while (temp.done === false) {
          cdsList[temp.value[1]] = null;
          temp = matchedIter.next();
        }
      }

      setGenerateMappingsState({
        apiIds: apiIds,
        cdsIds: cdsList,
        showModal: true,
      });
    };


    return (
      <>
        <GenerateMappingsModal
          key="sureify_object_mapping_navbar_generate_mapping_modal"
          generateMappingsState={generateMappingsState}
          setGenerateMappingsState={setGenerateMappingsState}
          mappings={mappingsState.mappings}
        ></GenerateMappingsModal>

        <CreateMappingModal
          key={"sureify_object_mappings_navbar_create_mapping_modal"}
          createNewMappings={createNewMappings}
          createMappingState={createMappingState}
          closeModal={closeCreateMappingModal}
          setErrorState={setErrorState}
        />

        <CallCDSModal
          key={"sureify_object_mappings_navbar_call_cds_modal"}
          callCdsModalState={callCdsModalState}
          setCallCdsModalState={setCallCdsModalState}
          fetchResponse={fetchResponse}
        ></CallCDSModal>

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
            <Button
              variant="contained"
              sx={{
                backgroundColor: yellow[900],
                "&:hover": {
                  backgroundColor: yellow[800],
                },
              }}
              id="show_hide_screen_adjuster"
              name="show_hide_screen_adjuster"
              onClick={() => {
                setScreenAdjusterState({
                  ...screenAdjusterState,
                  show: !screenAdjusterState.show,
                });
              }}
              endIcon={<Build />}
            >
              {screenAdjusterState.show ? "Hide Adjuster" : "Show Adjuster"}
            </Button>
            <TextField
              id="client_data_source_id"
              name="client_data_source_id"
              label="Client Data Source ID"
              variant="outlined"
              onChange={(e) => {
                setCdsId(e.target.value);
              }}
              type="number"
              inputProps={{
                style: {
                  padding: "10px",
                  width: "15vw",
                },
              }}
              value={cdsId}
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
              onClick={generateClonedFile}
              endIcon={<CopyAll />}
            >
              Clone All
            </Button>
            <Button
              variant="contained"
              color="primary"
              id="get_mappings_button"
              name="get_mappings_button"
              onClick={async () => {
                setMappingsState((prevState) => {
                  let toggleContainers = { ...prevState.toggleContainers };

                  for (let key in toggleContainers) {
                    toggleContainers[key] = true;
                  }

                  return { ...prevState, toggleContainers: toggleContainers };
                });
                setCreateMappingMainState((prevState) => {
                  return { ...prevState, cdsId: cdsId };
                });

                await fetchMappings(cdsId, true);
              }}
              endIcon={<Search />}
            >
              Fetch Mappings
            </Button>
            <Button
              variant="contained"
              color="success"
              id="get_response_button"
              name="get_response_button"
              onClick={() => {
                setCallCdsModalState({ cdsId: cdsId, showModal: true });
              }}
              endIcon={<ScheduleSend />}
            >
              Call CDS
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
);

export default SureifyObjectMappingsNavBar;
