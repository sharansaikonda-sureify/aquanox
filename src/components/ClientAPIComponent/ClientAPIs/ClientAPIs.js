// Packages
import React, { useState } from "react";
import { axiosInstance as axios } from "../../../config/axiosConfig";
import { v4 as uuidv4 } from "uuid";

// Custom Objects
import constants from "../../../constants/constants";
import { GetTokensData } from "../../../constants/utils";
import { ClientAPI, defaultPayload } from "../../../constants/clientapi";

// Custom Components
import ClientAPIObjectMapping from "../ClientAPIObjectMapping/ClientAPIObjectMapping";
import CreateClientAPIModal from "../CreateClientAPIModal/CreateClientAPIModal";
import ClientAPIsNavBar from "./ClientAPIsNavBar";
import ErrorHandlerModal from "../../ErrorHandlerModal/ErrorHandlerModal";

// Material UI Components
import { Box, Button, Stack, Typography } from "@mui/material";

// Material UI Colors
import { deepPurple, grey } from "@mui/material/colors";

// Material UI Icons
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ClientAPIs = ({ $, Popper }) => {
  // useState
  const [mappingsState, setMappingsState] = useState({
    mappings: [],
    toggleContainers: {},
    isCollapseAll: true,
  });

  const [errorState, setErrorState] = useState({
    error: new Error(),
    showModal: false,
  });

  const [createMappingMainState, setCreateMappingMainState] = useState({
    mapping: new ClientAPI(defaultPayload),
    showModal: false,
  });

  // Handlers
  const fetchClientAPI = async (idsStrLocal) => {
    const arr = idsStrLocal.split(",");
    let data = [];
    let togCont = {};
    const tokens = GetTokensData();
    try {
      for (let i = 0; i < arr.length; i++) {
        const fetch_url = constants.CLIENT_APIS_URL() + "/" + arr[i];
        const resp = await axios.get(fetch_url, {
          headers: tokens,
        });
        data.push(new ClientAPI(resp.data.data));
        togCont[+resp.data.data["id"]] = false;
      }

      setMappingsState({
        mappings: data,
        toggleContainers: togCont,
        isCollapseAll: false,
      });
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  const fetchAllClientAPIs = async () => {
    const fetch_url1 = constants.CLIENT_APIS_URL() + "?page_num=1&page_limit=0";
    const fetch_url2 =
      constants.CLIENT_APIS_URL() +
      "?page_num=1&page_limit=0&session_less=true";
    const tokens = GetTokensData();

    try {
      const resp1 = await axios.get(fetch_url1, {
        headers: tokens,
      });

      const resp2 = await axios.get(fetch_url2, {
        headers: tokens,
      });

      let response = [...resp1.data.data];
      response.push(...resp2.data.data);

      let data = [];

      for (let i = 0; i < response.length; i++) {
        data.push(new ClientAPI(response[i]));
      }

      const apiIdsList = data.map((row) => row.id);
      let togCont = {};
      for (let i = 0; i < apiIdsList.length; i++) {
        togCont[apiIdsList[i]] = true;
      }

      setMappingsState({
        toggleContainers: togCont,
        mappings: data,
        isCollapseAll: true,
      });
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  const createNewClientAPI = async (jsonData, handleClose) => {
    try {
      const tokens = GetTokensData();
      const resp = await axios.post(constants.CLIENT_APIS_URL(), jsonData, {
        headers: tokens,
      });
      await fetchClientAPI("" + resp.data.data.id);
      handleClose(true);
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  const cloneMappings = (data) => {
    setCreateMappingMainState({
      mapping: new ClientAPI({ ...data, client_data_source_uuid: uuidv4() }),
      showModal: true,
    });
  };

  const closeCreateMappingMainModal = () => {
    setCreateMappingMainState({
      ...createMappingMainState,
      mapping: new ClientAPI(defaultPayload),
      showModal: false,
    });
  };

  return (
    <div className="container-fluid">
      <ErrorHandlerModal
        key="client_apis_error_modal"
        errorState={errorState}
        setErrorState={setErrorState}
      />

      <CreateClientAPIModal
        key={"client_api_create_clientapi_modal"}
        createNewClientAPI={createNewClientAPI}
        createMappingState={createMappingMainState}
        fetchAllClientAPIs={fetchAllClientAPIs}
        cloneMappings={cloneMappings}
        closeModal={closeCreateMappingMainModal}
        setErrorState={setErrorState}
      />
      <div className="row fixed-top p-2 customnavbar">
        <ClientAPIsNavBar
          openModal={() => {
            setCreateMappingMainState({
              mapping: new ClientAPI(defaultPayload),
              showModal: true,
            });
          }}
          key={"sureify_object_mappings_navbar"}
          createNewClientAPI={createNewClientAPI}
          fetchAllClientAPIs={fetchAllClientAPIs}
          fetchClientAPI={fetchClientAPI}
          cloneMappings={cloneMappings}
          mappingsState={mappingsState}
          setMappingsState={setMappingsState}
          setErrorState={setErrorState}
        />
      </div>
      <div className="row mt-5 p-2">
        <div className="col customscrollbar mappingscontainer">
          {Object.entries(mappingsState.toggleContainers).map((row) => {
            return (
              <div className="parentcontainer">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{
                    marginTop: "5px",
                    backgroundColor: "black",
                    borderRadius: "5px",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={2}
                  >
                    <Typography component="div">
                      <Box
                        sx={{
                          color: grey[50],
                          fontStyle: "normal",
                          textAlign: "left",
                          fontWeight: "bold",
                          fontSize: "h5.fontSize",
                          fontFamily: "Monospace",
                          m: 1,
                        }}
                      >
                        API ID: {row[0]}
                      </Box>
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={2}
                    paddingRight={2}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setMappingsState({
                          ...mappingsState,
                          toggleContainers: {
                            ...mappingsState.toggleContainers,
                            [+row[0]]: !mappingsState.toggleContainers[+row[0]],
                          },
                        });
                      }}
                      sx={{
                        backgroundColor: deepPurple[900],
                        "&:hover": {
                          backgroundColor: deepPurple[800],
                        },
                      }}
                      endIcon={
                        mappingsState.toggleContainers[+row[0]] ? (
                          <ExpandMore />
                        ) : (
                          <ExpandLess />
                        )
                      }
                    >
                      {mappingsState.toggleContainers[+row[0]]
                        ? "Expand"
                        : "Collapse"}
                    </Button>
                  </Stack>
                </Stack>

                <div className="row">
                  <div className="col">
                    {mappingsState.toggleContainers[+row[0]]
                      ? null
                      : mappingsState.mappings
                          .filter((mapping) => mapping.id === +row[0])
                          .map((mapping) => {
                            return (
                              <ClientAPIObjectMapping
                                objectKey={"client_api_object_mapping" + row[0]}
                                fetchAllClientAPIs={fetchAllClientAPIs}
                                isShowCtaBar={true}
                                cloneMappings={cloneMappings}
                                key={uuidv4()}
                                clientAPIId={+row[0]}
                                mapping={mapping}
                                shouldLockFields={true}
                                setErrorState={setErrorState}
                              />
                            );
                          })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientAPIs;
