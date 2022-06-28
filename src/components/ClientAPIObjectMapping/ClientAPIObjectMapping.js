import axios from "axios";
import React, { useState } from "react";
import constants from "../../constants/constants";
import { ClientAPI } from "../../constants/clientapi";
import "./ClientAPIObjectMapping.css";

const ClientAPIObjectMapping = ({ mapping, cloneMappings, clientAPIId }) => {
  const [data, setData] = useState(new ClientAPI(mapping));
  const [isLocked, setIsLocked] = useState(true);

  const changeHandler = (e) => {
    let newkey = e.target.name;
    let newvalue = e.target.value;
    let newData = new ClientAPI({ ...data, [newkey]: newvalue });
    setData(newData);
  };

  const updateClientAPI = async () => {
    try {
      const jsonData = data.getPutMappings();
      await axios.put(
        constants.CLIENT_APIS_URL() + "/" + clientAPIId,
        jsonData
      );
    } catch (e) {
      alert(
        e.message ||
          e.response?.data?.errors ||
          "Some error occured while updating..."
      );
    }
  };

  const deleteClientAPI = async () => {
    if (
      prompt("Are you sure you want to delete? if yes enter API ID: ") ===
      "" + clientAPIId
    ) {
      try {
        await axios.delete(constants.CLIENT_APIS_URL() + "/" + clientAPIId);
      } catch (e) {
        alert(
          e.message ||
            e.response?.data?.errors ||
            "Some error occured while updating..."
        );
      }
    } else {
      alert("Invalid API ID Entered!!!");
    }
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <input
            type="button"
            className="form-control btn-danger"
            value={isLocked ? "Unlock" : "Lock"}
            onClick={async () => {
              setIsLocked(!isLocked);
              if (isLocked) {
                try {
                  const fetch_url = constants.CLIENT_APIS_URL() + "/" + data.id;
                  const resp = await axios.get(fetch_url);
                  setData(new ClientAPI(resp.data.data));
                } catch (e) {
                  alert(
                    e.message ||
                      e.response?.data?.errors ||
                      "Some error occured while updating..."
                  );
                }
              }
            }}
          />
        </div>
      </div>

      {data.client_data_source_id && data.client_data_source_id > 0 && (
        <div className="row mt-2">
          <div className="col">
            <label className="form-label" htmlFor="client_data_source_id">
              Client Data Source ID
            </label>
          </div>
          <div className="col">
            <input
              className=" form-control"
              disabled
              onChange={(e) => {
                changeHandler(e);
              }}
              type="number"
              name="client_data_source_id"
              value={data.client_data_source_id}
            />
          </div>
        </div>
      )}

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="client_data_source_uuid">
            Client Data Source UUID
          </label>
        </div>
        <div className="col">
          <input
            className=" form-control"
            disabled
            onChange={(e) => {
              changeHandler(e);
            }}
            type="text"
            name="client_data_source_uuid"
            value={data.client_data_source_uuid}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="headers">
            Headers
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="headers"
            value={data.headers}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="params">
            Params
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="params"
            value={data.params}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="body">
            Body
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="body"
            value={data.body}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="ca_cert">
            CA Cert
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="ca_cert"
            value={data.ca_cert}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="ssl_cert">
            SSL Cert
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="ssl_cert"
            value={data.ssl_cert}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="session_less">
            Session Less
          </label>
        </div>
        <div className="col">
          <select
            defaultValue={data.session_less}
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            className=" form-select"
            name="session_less"
            id="session_less"
          >
            {constants.MAPPINGS_SESSION_LESS.map((session_less) => {
              return <option value={session_less}>{session_less}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="cache_time">
            Cache Time
          </label>
        </div>
        <div className="col">
          <input
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            type="number"
            name="cache_time"
            value={data.cache_time}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="clear_api_caches">
            Clear API Caches
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="clear_api_caches"
            value={data.clear_api_caches}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="no_cache_keys">
            No Cache Keys
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="no_cache_keys"
            value={data.no_cache_keys}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="custom_error_codes">
            Custom Error Codes
          </label>
        </div>
        <div className="col">
          <textarea
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            rows="2"
            cols="2"
            name="custom_error_codes"
            value={data.custom_error_codes}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="name">
            API Name
          </label>
        </div>
        <div className="col">
          <input
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            type="text"
            name="name"
            value={data.name}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="type">
            Http Verb
          </label>
        </div>
        <div className="col">
          <input
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            type="text"
            name="type"
            value={data.type}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="url">
            API Url
          </label>
        </div>
        <div className="col">
          <input
            className=" form-control"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            type="text"
            name="url"
            value={data.url}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <input
            disabled={isLocked}
            type="button"
            className="form-control btn-danger"
            value="Update"
            onClick={updateClientAPI}
          />
        </div>
        <div className="col">
          <input
            disabled={isLocked}
            type="button"
            className="form-control btn-danger"
            value="Delete"
            onClick={deleteClientAPI}
          />
        </div>
        <div className="col">
          <input
            disabled={isLocked}
            type="button"
            className="form-control btn-danger"
            value="Clone"
            onClick={() => {
              cloneMappings(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientAPIObjectMapping;
