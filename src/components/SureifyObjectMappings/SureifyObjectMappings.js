// Packages
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styles
import "./SureifyObjectMappings.css";

// Custom Components
import ObjectMapping from "../ObjectMapping/ObjectMapping";
import CDSResponse from "../CDSResponse/CDSResponse";

// Custom Objects
import constants from "../../constants/constants";
import { SureifyObjectMapping } from "../../constants/som";

// Modals
import CallCDSModal from "../CallCDSModal/CallCDSModal";
import CreateMappingModal from "../CreateMappingModal/CreateMappingModal";
import GenerateMappingsModal from "../GenerateMappingsModal/GenerateMappingsModal";

// Helper functions
import { v4 as uuidv4 } from "uuid";
import { GetTokensData } from "../../constants/utils";

// Materuak UI Components
import {
  Button,
  Stack,
  TextField,
  Badge,
  Typography,
  Box,
} from "@mui/material";

// Material UI Colors
import { deepPurple, grey, yellow } from "@mui/material/colors";

// Material UI Icons
import {
  Home,
  ScheduleSend,
  Search,
  CopyAll,
  CreateNewFolder,
  InfoOutlined,
  Add,
  ExpandMore,
  ExpandLess,
  Build,
} from "@mui/icons-material/";
import ScreenAdjuster from "../ScreenAdjuster/ScreenAdjuster";

const SureifyObjectMappings = ({ $, Popper }) => {
  const newMappingDefaultPayload = {
    data_type: "string",
    extra: null,
    field_source: "response",
    formatter: "{}",
    post_op_config: "{}",
    mapping_id: uuidv4(),
    parent_idx: 0,
    sureify_field_name: "",
    txn_key: "",
    txn_source: "res",
  };

  const [generateMappingsAPIIdsList, setGenerateMappingsAPIIdsList] = useState(
    {}
  );
  const [generateMappingsCDSIdsList, setGenerateMappingsCDSIdsList] = useState(
    {}
  );

  // 0 - Complete Left
  // 1 - Center
  // 2 - Complete Right
  const [showScreenAdjuster, setShowScreenAdjuster] = useState(false);
  const [adjustScreen, setAdjustScreen] = useState(1);

  const [mappings, setMappings] = useState([]);
  const [cdsId, setCdsId] = useState(0);
  const [parentIds, setParentIds] = useState([]);
  const [currParentId, setCurrParentId] = useState(0);
  const [toggleContainers, setToggleContainers] = useState({});
  const [response, setResponse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mappingsPayload, setMappingsPayload] = useState(
    new SureifyObjectMapping(newMappingDefaultPayload)
  );
  const navigate = useNavigate();

  const mappingsComparator = (x, y) => {
    return x.mapping_id - y.mapping_id;
  };

  const filterMappingsByGroup = (id) => {
    const data = mappings.filter((row) => row.mapping_id !== id);
    const s = new Set(data.map((row) => row.parent_idx));
    const parentIdList = Array.from(s).sort();
    setParentIds(parentIdList);

    let togCont = {};
    for (let i = 0; i < parentIdList.length; i++) {
      togCont[parentIdList[i]] = false;
    }
    setToggleContainers(togCont);
    setMappings(data);
  };

  const generateClonedFile = () => {
    let apiIds = {};
    let cdsList = {};
    for (let i = 0; i < mappings.length; i++) {
      const matchedAPIIDArr = mappings[i].field_source.match(/api\.(.*?)$/);
      if (matchedAPIIDArr) {
        apiIds[+matchedAPIIDArr[1]] = null;
      }

      const matchedIter = mappings[i].formatter.matchAll(/cds\((\d{1,})[ ]*,/g);
      let temp = matchedIter.next();
      while (temp.done === false) {
        cdsList[temp.value[1]] = null;
        temp = matchedIter.next();
      }
    }

    setGenerateMappingsAPIIdsList(apiIds);
    setGenerateMappingsCDSIdsList(cdsList);
    openGenerateModal();
  };

  const fetchMappings = async () => {
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
      setParentIds(parentIdList);

      let togCont = {};
      for (let i = 0; i < parentIdList.length; i++) {
        togCont[parentIdList[i]] = false;
      }
      setToggleContainers(togCont);
      setMappings(data);
    } catch (e) {
      alert("Cannot fetch mappings for the given id: " + cdsId);
    }
  };

  const createNewMappings = async (jsonData, handleClose) => {
    try {
      const tokens = GetTokensData();

      await axios.patch(constants.SOM_URL(), jsonData, {
        headers: tokens,
      });
      fetchMappings();
      handleClose(true);
    } catch (e) {
      alert(
        e.message ||
          e.response?.data?.errors ||
          "Some error occured while updating..."
      );
    }
  };

  const cloneMappings = (data) => {
    setCurrParentId(new SureifyObjectMapping(data).parent_idx);
    openCreateModal({ ...data, mapping_id: uuidv4() });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeGenerateModal = () => {
    setShowGenerateModal(false);
  };

  const openGenerateModal = () => {
    setShowGenerateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const openCreateModal = (data) => {
    setMappingsPayload(new SureifyObjectMapping(data));
    setShowCreateModal(true);
  };

  const fetchResponse = async (data) => {
    const fetch_url = constants.SOM_URL() + "/" + cdsId + "?mapping_type=fetch";
    const tokens = GetTokensData();
    try {
      const resp = await axios.post(fetch_url, data, {
        headers: tokens,
      });
      setResponse(resp.data);
    } catch (e) {
      alert("Cannot fetch response for the given id: " + cdsId);
    }
  };

  return (
    <div className="container-fluid">
      <GenerateMappingsModal
        key={uuidv4()}
        closeModal={closeGenerateModal}
        show={showGenerateModal}
        apiIdsList={generateMappingsAPIIdsList}
        cdsIdsList={generateMappingsCDSIdsList}
        mappings={mappings}
      ></GenerateMappingsModal>
      <CallCDSModal
        key={uuidv4()}
        closeModal={closeModal}
        show={showModal}
        fetchResponse={fetchResponse}
      ></CallCDSModal>
      <div className="row fixed-top p-2 customnavbar">
        <div className="col">
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
                  setShowScreenAdjuster(!showScreenAdjuster);
                }}
                endIcon={<Build />}
              >
                {showScreenAdjuster ? "Hide Adjuster" : "Show Adjuster"}
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
              <Button
                variant="contained"
                color="primary"
                id="create_mapping_button"
                name="create_mapping_button"
                onClick={() => {
                  openCreateModal({
                    ...newMappingDefaultPayload,
                    parent_idx: 0,
                  });
                }}
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
                onClick={fetchMappings}
                endIcon={<Search />}
              >
                Fetch Mappings
              </Button>
              <Button
                variant="contained"
                color="success"
                id="get_response_button"
                name="get_response_button"
                onClick={openModal}
                endIcon={<ScheduleSend />}
              >
                Call CDS
              </Button>
            </Stack>
          </Stack>
        </div>
      </div>
      <ScreenAdjuster
        showScreenAdjuster={showScreenAdjuster}
        adjustScreen={adjustScreen}
        setAdjustScreen={setAdjustScreen}
      />
      <div className="row mt-5 p-2">
        <div
          className={`${
            adjustScreen === 2 ? "col" : adjustScreen === 1 ? "col-8" : "d-none"
          } "customscrollbar mappingscontainer`}
        >
          <CreateMappingModal
            key={uuidv4()}
            defaultPayload={mappingsPayload}
            cdsId={cdsId}
            createNewMappings={createNewMappings}
            closeModal={closeCreateModal}
            show={showCreateModal}
            parent_idx={currParentId}
          />
          {parentIds.map((id) => {
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
                            mappings.filter(
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
                        setToggleContainers({
                          ...toggleContainers,
                          [id]: !toggleContainers[id],
                        });
                      }}
                      sx={{
                        backgroundColor: deepPurple[900],
                        "&:hover": {
                          backgroundColor: deepPurple[800],
                        },
                      }}
                      endIcon={
                        toggleContainers[id] ? <ExpandMore /> : <ExpandLess />
                      }
                    >
                      {toggleContainers[id] ? "Expand" : "Collapse"}
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        openCreateModal({
                          ...newMappingDefaultPayload,
                          parent_idx: id,
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
                    {toggleContainers[id]
                      ? null
                      : mappings
                          .filter((mapping) => mapping.parent_idx === id)
                          .sort(mappingsComparator)
                          .map((mapping) => {
                            return (
                              <ObjectMapping
                                cloneMappings={cloneMappings}
                                key={mapping.unique_id}
                                cdsId={cdsId}
                                mapping={mapping}
                                filterMappingsByGroup={filterMappingsByGroup}
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
            adjustScreen === 0 ? "col" : adjustScreen === 1 ? "col-4" : "d-none"
          } customscrollbar responsecontainer`}
        >
          <CDSResponse data={response} />
        </div>
      </div>
    </div>
  );
};

export default SureifyObjectMappings;
