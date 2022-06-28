import React, { useState } from "react";
import axios from "axios";
import ObjectMapping from "../ObjectMapping/ObjectMapping";
import CDSResponse from "../CDSResponse/CDSResponse";
import constants from "../../constants/constants";
import { SureifyObjectMapping } from "../../constants/som";
import "./SureifyObjectMappings.css";
import { useNavigate } from "react-router-dom";
import CallCDSModal from "../CallCDSModal/CallCDSModal";
import CreateMappingModal from "../CreateMappingModal/CreateMappingModal";
import GenerateMappingsModal from "../GenerateMappingsModal/GenerateMappingsModal";
import { v4 as uuidv4 } from "uuid";

const SureifyObjectMappings = ({ $, Popper }) => {
  const newMappingDefaultPayload = {
    data_type: "string",
    extra: null,
    field_source: "response",
    formatter: null,
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

  const [mappings, setMappings] = useState([]);
  const [cdsId, setCdsId] = useState(0);
  const [parentIds, setParentIds] = useState([]);
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
    try {
      const resp = await axios.get(fetch_url);
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
      await axios.patch(constants.SOM_URL(), jsonData);
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
    let tokens = localStorage.getItem("tokens");
    if (tokens) {
      tokens = JSON.parse(tokens);
    } else {
      tokens = {};
    }

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
        closeModal={closeModal}
        show={showModal}
        fetchResponse={fetchResponse}
      />
      <div className="row fixed-top p-2 customnavbar">
        <div className="col">
          <input
            className="form-control btn-light"
            onClick={() => {
              navigate("/");
            }}
            type="button"
            value="Home"
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            id="client_data_source_id"
            name="client_data_source_id"
            type="number"
            placeholder="Enter client data source id"
            onChange={(e) => {
              setCdsId(e.target.value);
            }}
            value={cdsId}
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="clone_all_button"
            name="clone_all_button"
            type="button"
            onClick={generateClonedFile}
            value="Clone All"
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="get_mappings_button"
            name="get_mappings_button"
            type="button"
            onClick={fetchMappings}
            value="Fetch Mappings"
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="get_response_button"
            name="get_response_button"
            type="button"
            onClick={openModal}
            value="Call CDS"
          />
        </div>
      </div>
      <div className="row mt-5 p-2">
        <div className="col-8 customscrollbar mappingscontainer">
          {parentIds.map((id) => {
            return (
              <div className="parentcontainer">
                <CreateMappingModal
                  key={uuidv4()}
                  defaultPayload={mappingsPayload}
                  cdsId={cdsId}
                  createNewMappings={createNewMappings}
                  closeModal={closeCreateModal}
                  show={showCreateModal}
                  parent_idx={id}
                />
                <div className="row mt-2">
                  <div className="col">
                    <h3>Parent ID: {id}</h3>
                  </div>
                  <div className="col">
                    <input
                      type="button"
                      className="form-control btn-danger"
                      onClick={() => {
                        setToggleContainers({
                          ...toggleContainers,
                          [id]: !toggleContainers[id],
                        });
                      }}
                      value={toggleContainers[id] ? "Expand" : "Collapse"}
                    />
                  </div>
                  <div className="col">
                    <input
                      onClick={() => {
                        openCreateModal({
                          ...newMappingDefaultPayload,
                          parent_idx: id,
                        });
                      }}
                      type="button"
                      className="form-control btn-danger"
                      value="Create"
                    />
                  </div>
                </div>
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
        <div className="col-4 customscrollbar responsecontainer">
          <CDSResponse data={response} />
        </div>
      </div>
    </div>
  );
};

export default SureifyObjectMappings;
