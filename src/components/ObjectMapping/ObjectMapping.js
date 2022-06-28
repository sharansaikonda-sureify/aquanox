import axios from "axios";
import React, { useState } from "react";
import constants from "../../constants/constants";
import { SureifyObjectMapping } from "../../constants/som";
import "./ObjectMapping.css";

const ObjectMapping = ({
  mapping,
  cdsId,
  filterMappingsByGroup,
  cloneMappings,
}) => {
  const [data, setData] = useState(new SureifyObjectMapping(mapping));
  const [isLocked, setIsLocked] = useState(true);

  const changeHandler = (e) => {
    let newkey = e.target.name;
    let newvalue = e.target.value;
    let newData = new SureifyObjectMapping({ ...data, [newkey]: newvalue });
    setData(newData);
  };

  const updateMapping = async () => {
    try {
      const jsonData = data.getPatchMappings(cdsId);
      await axios.patch(constants.SOM_URL(), jsonData);
    } catch (e) {
      alert(
        e.message ||
          e.response?.data?.errors ||
          "Some error occured while updating..."
      );
    }
  };

  const deleteMapping = async () => {
    try {
      const jsonData = data.getDeleteMappings(cdsId);
      await axios.patch(constants.SOM_URL(), jsonData);
      filterMappingsByGroup(data.mapping_id);
    } catch (e) {
      alert(
        e.message ||
          e.response?.data?.errors ||
          "Some error occured while updating..."
      );
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
            onClick={() => {
              setIsLocked(!isLocked);
            }}
          />
        </div>
      </div>
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
            disabled={isLocked}
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
            disabled={isLocked}
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
          {data.field_source !== "" &&
          (data.field_source.includes("api") ||
            data.field_source === "other" ||
            constants.MAPPINGS_FIELD_SOURCE.every(
              (row) => row !== data.field_source
            )) ? (
            <input
              disabled={isLocked}
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
              disabled={isLocked}
              onChange={(e) => {
                changeHandler(e);
              }}
              className=" form-select"
              name="field_source"
              id="field_source"
            >
              {constants.MAPPINGS_FIELD_SOURCE.map((field_source) => {
                return <option value={field_source}>{field_source}</option>;
              })}
            </select>
          )}
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
            disabled={isLocked}
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
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            className=" form-control"
            type="text"
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
            disabled={isLocked}
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
            disabled={isLocked}
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
            defaultValue={data.txn_source}
            className=" form-control form-select"
            disabled={isLocked}
            onChange={(e) => {
              changeHandler(e);
            }}
            name="txn_source"
            id="txn_source"
          >
            {constants.MAPPINGS_TXN_SOURCE.map((txn_source) => {
              return <option value={txn_source}>{txn_source}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <input
            type="button"
            className="form-control btn-danger"
            value="Update"
            onClick={updateMapping}
          />
        </div>
        <div className="col">
          <input
            type="button"
            className="form-control btn-danger"
            value="Delete"
            onClick={deleteMapping}
          />
        </div>
        <div className="col">
          <input
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

export default ObjectMapping;
