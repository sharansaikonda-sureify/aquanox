import React, { useState } from "react";

import { Button, Modal } from "react-bootstrap";

const TemplateModal = ({ closeModal, show, fetchResponse }) => {
  function JSONPayload({ field_names, input, url }) {
    this.field_names = field_names;
    if (!field_names) {
      this.field_names = "[]";
    }

    this.input = input;
    if (!input) {
      this.input = "{}";
    }

    this.url = url;
    if (!url) {
      this.url = "string";
    }

    this.getPayload = () => {
      return {
        field_names: JSON.parse(this.field_names),
        input: JSON.parse(this.input),
        url: this.url,
      };
    };
  }

  const defaultPayload = { field_names: "", input: "", url: "" };

  const [data, setData] = useState(new JSONPayload(defaultPayload));

  const handleClose = () => {
    setData(new JSONPayload(defaultPayload));
    closeModal();
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    let newData = { ...data, [key]: value };
    setData(new JSONPayload(newData));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>JSON Payload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mt-2">
          <div className="col">
            <label className="form-label" htmlFor="field_names">
              Field Names
            </label>
          </div>
          <div className="col">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              className=" form-control"
              type="text"
              name="field_names"
              value={data.field_names}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <label className="form-label" htmlFor="input">
              Input
            </label>
          </div>
          <div className="col">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              className=" form-control"
              type="text"
              name="input"
              value={data.input}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <label className="form-label" htmlFor="url">
              URL
            </label>
          </div>
          <div className="col">
            <input
              onChange={(e) => {
                changeHandler(e);
              }}
              className=" form-control"
              type="text"
              name="url"
              value={data.url}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            fetchResponse(data.getPayload());
            handleClose();
          }}
        >
          Fetch Response
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TemplateModal;
