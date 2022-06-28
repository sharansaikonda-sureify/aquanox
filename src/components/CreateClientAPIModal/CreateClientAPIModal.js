import React, { useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { ClientAPI } from "../../constants/clientapi";
import "./CreateClientAPIModal.css";
import constants from "../../constants/constants";

const CreateClientAPIModal = ({
  closeModal,
  show,
  createNewClientAPI,
  defaultPayload,
}) => {
  const [data, setData] = useState(new ClientAPI(defaultPayload));

  useEffect(() => {
    setData(new ClientAPI(defaultPayload));
  }, [defaultPayload]);

  const handleClose = (isClear) => {
    if (isClear) {
      setData(new ClientAPI(defaultPayload));
    }
    closeModal();
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    let newData = { ...data, [key]: value };
    setData(new ClientAPI(newData));
  };

  return (
    <Modal
      dialogClassName="custom-modal"
      show={show}
      onHide={() => {
        handleClose(true);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>JSON Payload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <label className="form-label" htmlFor="custom_error_codes">
              Custom Error Codes
            </label>
          </div>
          <div className="col">
            <textarea
              className=" form-control"
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
              onChange={(e) => {
                changeHandler(e);
              }}
              type="text"
              name="url"
              value={data.url}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose(true);
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            createNewClientAPI(data.getPostMappings(), handleClose);
          }}
        >
          Create New API
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateClientAPIModal;
