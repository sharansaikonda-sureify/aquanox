import React, { useState } from "react";
import axios from "axios";
import constants from "../../constants/constants";
import "./ClientAPIs.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ClientAPI } from "../../constants/clientapi";
import ClientAPIObjectMapping from "../ClientAPIObjectMapping/ClientAPIObjectMapping";
import CreateClientAPIModal from "../CreateClientAPIModal/CreateClientAPIModal";
import { GetTokensData } from "../../constants/utils";

const ClientAPIs = ({ $, Popper }) => {
  const customErrorCodesDefaultSchema = {
    condition: {
      response: "",
      status_codes: ["xxx"],
    },
    is_success: false,
    message: "",
    outgoing_status_code: 0,
  };

  const newAPIDefaultPayload = {
    body: {},
    ca_cert: "",
    cache_time: -1,
    clear_api_caches: [],
    client_data_source_uuid: uuidv4(),
    custom_error_codes: [customErrorCodesDefaultSchema],
    headers: [],
    name: "",
    no_cache_keys: [],
    params: [{ key: "Content-Type", value: "application/json" }],
    session_less: false,
    ssl_cert: ["", ""],
    type: "GET",
    url: "https://example.com",
  };

  const [mappings, setMappings] = useState([]);
  const [isShown, setIsShown] = useState(true);

  const [idsStr, setIdsStr] = useState("");
  const [apiIds, setAPIIds] = useState([]);
  const [toggleContainers, setToggleContainers] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mappingsPayload, setMappingsPayload] = useState(
    new ClientAPI(newAPIDefaultPayload)
  );
  const navigate = useNavigate();

  const fetchClientAPI = async (idsStrLocal) => {
    const arr = idsStrLocal.split(",");
    let data = [];
    let idsList = [];
    const tokens = GetTokensData();
    try {
      for (let i = 0; i < arr.length; i++) {
        const fetch_url = constants.CLIENT_APIS_URL() + "/" + arr[i];
        const resp = await axios.get(fetch_url, {
          headers: tokens,
        });

        data.push(new ClientAPI(resp.data.data));
        idsList.push(resp.data.data["id"]);
      }

      setAPIIds(idsList);

      let togCont = { ...toggleContainers };
      for (let i = 0; i < arr.length; i++) {
        togCont[parseInt(arr[i])] = false;
      }

      setToggleContainers(togCont);
      setMappings(data);
    } catch (e) {
      alert("Cannot fetch client APIs -- " + idsStrLocal + " : " + e.message);
    }
  };

  const fetchAllClientAPIs = async () => {
    const fetch_url = constants.CLIENT_APIS_URL() + "?page_num=1&page_limit=0";
    const tokens = GetTokensData();
    try {
      const resp = await axios.get(fetch_url, {
        headers: tokens,
      });
      let data = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        data.push(new ClientAPI(resp.data.data[i]));
      }

      const apiIdsList = data.map((row) => row.id);
      setAPIIds(apiIdsList);

      let togCont = {};
      for (let i = 0; i < apiIdsList.length; i++) {
        togCont[apiIdsList[i]] = false;
      }
      setToggleContainers(togCont);
      setMappings(data);
    } catch (e) {
      alert("Cannot fetch client APIs: " + e.message);
    }
  };

  const toggleAllCards = (flag) => {
    let togCont = { ...toggleContainers };
    for (const key in togCont) {
      togCont[key] = flag;
    }

    setToggleContainers(togCont);
  };

  const createNewClientAPI = async (jsonData, handleClose) => {
    try {
      const tokens = GetTokensData();
      const resp = await axios.post(constants.CLIENT_APIS_URL(), jsonData, {
        headers: tokens,
      });
      fetchClientAPI("" + resp.data.data.id);
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
    openCreateModal({ ...data, client_data_source_uuid: uuidv4() });
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const openCreateModal = (data) => {
    setMappingsPayload(new ClientAPI(data));
    setShowCreateModal(true);
  };

  return (
    <div className="container-fluid">
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
            id="api_id"
            name="api_id"
            type="text"
            placeholder="Enter API Ids separated by comma"
            onChange={(e) => {
              setIdsStr(e.target.value);
            }}
            value={idsStr}
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="create_clientapi_button"
            name="create_clientapi_button"
            type="button"
            onClick={() => {
              openCreateModal({
                ...newAPIDefaultPayload,
                client_data_source_id: uuidv4(),
              });
            }}
            value="Create"
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="get_mappings_button"
            name="get_mappings_button"
            type="button"
            onClick={() => {
              toggleAllCards(isShown);
              setIsShown(!isShown);
            }}
            value={isShown ? "Collapse All" : "Expand All"}
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="get_mappings_button"
            name="get_mappings_button"
            type="button"
            onClick={() => {
              fetchClientAPI(idsStr);
            }}
            value="Fetch Specified APIs"
          />
        </div>
        <div className="col">
          <input
            className="form-control btn-success"
            id="get_response_button"
            name="get_response_button"
            type="button"
            onClick={fetchAllClientAPIs}
            value="Fetch All"
          />
        </div>
      </div>
      <div className="row mt-5 p-2">
        <div className="col customscrollbar mappingscontainer">
          <CreateClientAPIModal
            defaultPayload={mappingsPayload}
            createNewClientAPI={createNewClientAPI}
            closeModal={closeCreateModal}
            show={showCreateModal}
          />
          {apiIds.map((id) => {
            return (
              <div className="parentcontainer">
                <div className="row mt-2">
                  <div className="col-2"></div>
                  <div className="col-4">
                    <h3>API ID: {id}</h3>
                  </div>
                  <div className="col-2">
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
                  <div className="col-2">
                    <input
                      onClick={() => {
                        openCreateModal({
                          ...newAPIDefaultPayload,
                          client_data_source_id: uuidv4(),
                        });
                      }}
                      type="button"
                      className="form-control btn-danger"
                      value="Create"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      {toggleContainers[id]
                        ? null
                        : mappings
                            .filter((mapping) => mapping.id === id)
                            .map((mapping) => {
                              return (
                                <ClientAPIObjectMapping
                                  cloneMappings={cloneMappings}
                                  key={mapping.client_data_source_uuid}
                                  clientAPIId={id}
                                  mapping={mapping}
                                />
                              );
                            })}
                    </div>
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
