// Packages
import React, { useState } from "react";
import { axiosInstance as axios } from "../../../config/axiosConfig";

// Custom Components
import ObjectMapping from "../ObjectMapping/ObjectMapping";
import CDSResponse from "../CDSResponse/CDSResponse";

// Custom Objects
import constants from "../../../constants/constants";
import { SureifyObjectMapping, defaultPayload } from "../../../constants/som";

// Modals
import CreateMappingModal from "../CreateMappingModal/CreateMappingModal";
import ErrorHandlerModal from "../../ErrorHandlerModal/ErrorHandlerModal";

// Helper functions
import { v4 as uuidv4 } from "uuid";
import { GetTokensData } from "../../../constants/utils";

// Materuak UI Components
import { Button, Stack, Badge, Typography, Box } from "@mui/material";

// Material UI Colors
import { deepPurple, grey } from "@mui/material/colors";

// Material UI Icons
import {
  InfoOutlined,
  Add,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material/";

// Custom Components
import ScreenAdjuster from "../../ScreenAdjuster/ScreenAdjuster";
import SureifyObjectMappingsNavBar from "./SureifyObjectMappingsNavBar";

const SureifyObjectMappings = ({ $, Popper }) => {
  const [mappingsState, setMappingsState] = useState({
    mappings: [],
    parentIds: [],
    toggleContainers: {},
    isCollapseAll: true,
  });

  const [errorState, setErrorState] = useState({
    error: new Error(),
    showModal: false,
  });

  const [screenAdjusterState, setScreenAdjusterState] = useState({
    position: 1, // 0 - Only Response, 1 - Both, 2 - Only Mappings
    show: false,
  });

  const [createMappingMainState, setCreateMappingMainState] = useState({
    mapping: new SureifyObjectMapping(defaultPayload),
    cdsId: 0,
    showModal: false,
  });

  const [response, setResponse] = useState({});

  const mappingsComparator = (x, y) => {
    return x.mapping_id - y.mapping_id;
  };

  const closeCreateMappingMainModal = () => {
    setCreateMappingMainState({
      ...createMappingMainState,
      mapping: new SureifyObjectMapping(defaultPayload),
      showModal: false,
    });
  };

  const filterMappingsByGroup = (mapping_id, parent_idx) => {
    const data = mappingsState.mappings.filter(
      (row) => row.mapping_id !== mapping_id
    );
    const s = new Set(data.map((row) => row.parent_idx));
    const parentIdList = Array.from(s).sort();
    let togCont = {};
    for (let i = 0; i < parentIdList.length; i++) {
      togCont[parentIdList[i]] = parentIdList[i] !== parent_idx;
    }

    setMappingsState({
      ...mappingsState,
      parentIds: parentIdList,
      toggleContainers: togCont,
      mappings: data,
    });
  };

  const fetchMappings = async (cdsId, isCollapseAll = false) => {
    const fetch_url =
      constants.SOM_URL() + "?" + constants.CLIENT_DATA_SOURCE_ID + "=" + cdsId;
    const tokens = GetTokensData();

    try {
      const resp = await axios.get(fetch_url, {
        headers: tokens,
      });
      let data = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        data.push(new SureifyObjectMapping(resp.data.data[i]));
      }
      const s = new Set(data.map((row) => row.parent_idx));
      const parentIdList = Array.from(s).sort();

      let togCont = {};
      for (let i = 0; i < parentIdList.length; i++) {
        togCont[parentIdList[i]] = isCollapseAll;
      }

      setMappingsState({
        parentIds: parentIdList,
        toggleContainers: togCont,
        mappings: data,
      });
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  const createNewMappings = async (jsonData, handleClose) => {
    try {
      const tokens = GetTokensData();

      await axios.patch(constants.SOM_URL(), jsonData, {
        headers: tokens,
      });
      await fetchMappings(jsonData.client_data_source_id);
      handleClose();
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  const cloneMappings = (data) => {
    const newData = new SureifyObjectMapping(data);
    setCreateMappingMainState({
      ...createMappingMainState,
      mapping: { ...newData, mapping_id: uuidv4() },
      showModal: true,
    });
  };

  const fetchResponse = async (data, cdsId) => {
    const fetch_url = constants.SOM_URL() + cdsId + "?mapping_type=fetch";
    const tokens = GetTokensData();
    try {
      const resp = await axios.post(fetch_url, data, {
        headers: tokens,
      });
      setResponse(resp.data);
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  return (
    <div className="container-fluid">
      <ErrorHandlerModal
        key="sureify_object_mappings_error_modal"
        errorState={errorState}
        setErrorState={setErrorState}
      />
      <ScreenAdjuster
        screenAdjusterState={screenAdjusterState}
        setScreenAdjusterState={setScreenAdjusterState}
      />
      <div className="row fixed-top p-2 customnavbar">
        <div className="col">
          <SureifyObjectMappingsNavBar
            key={"sureify_object_mappings_navbar"}
            screenAdjusterState={screenAdjusterState}
            setScreenAdjusterState={setScreenAdjusterState}
            createNewMappings={createNewMappings}
            mappingsState={mappingsState}
            setMappingsState={setMappingsState}
            setCreateMappingMainState={setCreateMappingMainState}
            fetchMappings={fetchMappings}
            fetchResponse={fetchResponse}
            setErrorState={setErrorState}
          />
        </div>
      </div>
      <div className="row mt-5 p-2">
        <CreateMappingModal
          key={"sureify_object_mappings_create_mappings_modal"}
          createNewMappings={createNewMappings}
          createMappingState={createMappingMainState}
          closeModal={closeCreateMappingMainModal}
          setErrorState={setErrorState}
        />
        <div
          className={`${
            screenAdjusterState.position === 2
              ? "col"
              : screenAdjusterState.position === 1
              ? "col-8"
              : "d-none"
          } "customscrollbar mappingscontainer`}
        >
          {mappingsState.parentIds.map((id) => {
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
                        Parent ID: {id}
                        <Badge
                          color="warning"
                          badgeContent={
                            mappingsState.mappings.filter(
                              (mapping) => mapping.parent_idx === id
                            ).length
                          }
                        >
                          <InfoOutlined color="action" />
                        </Badge>
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
                            [id]: !mappingsState.toggleContainers[id],
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
                        mappingsState.toggleContainers[id] ? (
                          <ExpandMore />
                        ) : (
                          <ExpandLess />
                        )
                      }
                    >
                      {mappingsState.toggleContainers[id]
                        ? "Expand"
                        : "Collapse"}
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setCreateMappingMainState({
                          ...createMappingMainState,
                          mapping: {
                            ...createMappingMainState.mapping,
                            parent_idx: id,
                          },
                          showModal: true,
                        });
                      }}
                      sx={{
                        backgroundColor: deepPurple[900],
                        "&:hover": {
                          backgroundColor: deepPurple[800],
                        },
                      }}
                      endIcon={<Add />}
                    >
                      Create
                    </Button>
                  </Stack>
                </Stack>
                <div className="row">
                  <div className="col">
                    {mappingsState.toggleContainers[id]
                      ? null
                      : mappingsState.mappings
                          .filter((mapping) => mapping.parent_idx === id)
                          .sort(mappingsComparator)
                          .map((mapping) => {
                            return (
                              <ObjectMapping
                                key={mapping.unique_id}
                                objectKey={
                                  "object_mapping-" + mapping.mapping_id
                                }
                                mapping={mapping}
                                cdsId={createMappingMainState.cdsId}
                                filterMappingsByGroup={filterMappingsByGroup}
                                cloneMappings={cloneMappings}
                                setErrorState={setErrorState}
                                isShowCtaBar={true}
                                shouldLockFields={true}
                              />
                            );
                          })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`${
            screenAdjusterState.position === 0
              ? "col"
              : screenAdjusterState.position === 1
              ? "col-4"
              : "d-none"
          } customscrollbar responsecontainer mt-4`}
        >
          <CDSResponse data={response} />
        </div>
      </div>
    </div>
  );
};;

export default SureifyObjectMappings;
