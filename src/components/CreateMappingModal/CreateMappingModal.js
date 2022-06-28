import React, { useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import constants from "../../constants/constants";
import { SureifyObjectMapping } from "../../constants/som";

const CreateMappingModal = ({
  closeModal,
  show,
  createNewMappings,
  cdsId,
  defaultPayload,
}) => {
  const [data, setData] = useState(new SureifyObjectMapping(defaultPayload));

  useEffect(() => {
    setData(new SureifyObjectMapping(defaultPayload));
  }, [defaultPayload]);

  const handleClose = (isClear) => {
    if (isClear) {
      setData(new SureifyObjectMapping(defaultPayload));
    }
    closeModal();
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    let newData = { ...data, [key]: value };
    setData(new SureifyObjectMapping(newData));
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose(true);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>JSON Payload</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="data_type">
                Data Type
              </label>
            </div>
            <div className="col">
              <select
                defaultValue={data.data_type}
                className=" form-select"
                onChange={(e) => {
                  changeHandler(e);
                }}
                name="data_type"
              >
                {constants.MAPPINGS_DATA_TYPE.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="extra">
                Extra
              </label>
            </div>
            <div className="col">
              <input
                className=" form-control"
                onChange={(e) => {
                  changeHandler(e);
                }}
                type="text"
                name="extra"
                value={data.extra}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="field_source">
                Field Source
              </label>
            </div>
            <div className="col">
              <div className="col">
                {data.field_source !== "" &&
                (data.field_source.includes("api") ||
                  data.field_source === "other" ||
                  constants.MAPPINGS_FIELD_SOURCE.every(
                    (row) => row !== data.field_source
                  )) ? (
                  <input
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className=" form-control"
                    type="text"
                    name="field_source"
                    value={data.field_source}
                  />
                ) : (
                  <select
                    defaultValue={data.field_source}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className=" form-select"
                    name="field_source"
                    id="field_source"
                  >
                    {constants.MAPPINGS_FIELD_SOURCE.map((field_source) => {
                      return (
                        <option value={field_source}>{field_source}</option>
                      );
                    })}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="formatter">
                Formatter
              </label>
            </div>
            <div className="col">
              <textarea
                onChange={(e) => {
                  changeHandler(e);
                }}
                className=" form-control"
                name="formatter"
                value={data.formatter}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="mapping_id">
                Mapping Id
              </label>
            </div>
            <div className="col">
              <input
                disabled
                onChange={(e) => {
                  changeHandler(e);
                }}
                className=" form-control"
                type="text"
                name="mapping_id"
                value={data.mapping_id}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="parent_idx">
                Parent Idx
              </label>
            </div>
            <div className="col">
              <input
                onChange={(e) => {
                  changeHandler(e);
                }}
                className=" form-control"
                type="number"
                name="parent_idx"
                value={data.parent_idx}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="sureify_field_name">
                Sureify Field Name
              </label>
            </div>
            <div className="col">
              <input
                className=" form-control"
                onChange={(e) => {
                  changeHandler(e);
                }}
                type="text"
                name="sureify_field_name"
                value={data.sureify_field_name}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="txn_key">
                Transaction Key
              </label>
            </div>
            <div className="col">
              <input
                className=" form-control"
                onChange={(e) => {
                  changeHandler(e);
                }}
                type="text"
                name="txn_key"
                value={data.txn_key}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="txn_source">
                Transaction Source
              </label>
            </div>
            <div className="col">
              <select
                className=" form-control form-select"
                onChange={(e) => {
                  changeHandler(e);
                }}
                defaultValue={data.txn_source}
                name="txn_source"
                id="txn_source"
              >
                {constants.MAPPINGS_TXN_SOURCE.map((txn_source) => {
                  return <option value={txn_source}>{txn_source}</option>;
                })}
              </select>
            </div>
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
            createNewMappings(data.getPostMappings(cdsId), handleClose);
          }}
        >
          Create New Mapping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMappingModal;
