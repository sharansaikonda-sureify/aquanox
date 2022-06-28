import React, { useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { SureifyObjectMapping } from "../../constants/som";

const CreateMappingModal = ({
  closeModal,
  show,
  apiIdsList,
  cdsIdsList,
  mappings,
}) => {
  const [fileName, setFileName] = useState("mappings.json");
  const [fileCDS, setFileCDS] = useState(0);
  const [apiIds, setApiIds] = useState({ ...apiIdsList });
  const [cdsIds, setCdsIds] = useState({ ...cdsIdsList });
  const [data, setData] = useState(
    mappings.map((row) => {
      return new SureifyObjectMapping(row);
    })
  );

  useEffect(() => {
    setFileName("mappings.json");
    setFileCDS(0);
    setApiIds({ ...apiIdsList });
    setCdsIds({ ...cdsIdsList });
    setData(
      mappings.map((row) => {
        return new SureifyObjectMapping(row);
      })
    );
  }, [mappings]);

  const handleClose = (isClear) => {
    if (isClear) {
      setFileName("mappings.json");
      setFileCDS(0);
      setData([]);
      setApiIds({});
      setCdsIds({});
    }
    closeModal();
  };

  const changeAPIIdsHandler = (e) => {
    const key = e.target.name.replace("new_api_id", "");
    const value = parseInt(e.target.value);

    let newData = { ...apiIds, [key]: value };
    setApiIds(newData);
  };

  const changeCdsIdsHandler = (e) => {
    const key = e.target.name.replace("new_cds_id", "");
    const value = parseInt(e.target.value);

    let newData = { ...cdsIds, [key]: value };
    setCdsIds(newData);
  };

  const captureMappingIds = () => {
    let mappingIdsMap = {};
    mappings.map((row) => {
      if (mappingIdsMap[row.mapping_id] === undefined) {
        mappingIdsMap[row.mapping_id] = uuidv4();
      }

      if (mappingIdsMap[row.parent_idx] === undefined) {
        mappingIdsMap[row.parent_idx] = uuidv4();
      }

      return row;
    });

    mappingIdsMap[0] = 0;

    return mappingIdsMap;
  };

  const updateMappingIds = (idsMap) => {
    const newData = data.map((row) => {
      row["mapping_id"] = idsMap[+row["mapping_id"]];
      row["parent_idx"] = idsMap[+row["parent_idx"]];

      row.formatter = row.formatter.replaceAll(
        /cds\((\d{1,})[ ]*,/g,
        (a, b) => {
          return `cds(${cdsIds[parseInt(b)]},`;
        }
      );

      row.field_source = row.field_source.replaceAll(/api\.(.*?)$/g, (a, b) => {
        return `api.${apiIds[parseInt(b)]},`;
      });

      return new SureifyObjectMapping(row).getPostMappingOnly();
    });

    let generatedData = {
      client_data_source_id: fileCDS,
      mappings: newData,
    };

    return generatedData;
  };

  const generateNewMappingsFile = () => {
    const idsMap = captureMappingIds();
    const newData = updateMappingIds(idsMap);

    downloadFile(fileName, JSON.stringify(newData));
    handleClose();
  };

  const downloadFile = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose(true);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>API and CDS Ids Matcher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="file_name">
                File Name
              </label>
            </div>
            <div className="col">
              <input
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
                className=" form-control"
                type="text"
                name="file_name"
                value={fileName}
              />
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col">
              <label className="form-label" htmlFor="cds_file">
                CDS ID in File
              </label>
            </div>
            <div className="col">
              <input
                onChange={(e) => {
                  setFileCDS(parseInt(e.target.value));
                }}
                className=" form-control"
                type="number"
                name="cds_file"
                value={fileCDS}
              />
            </div>
          </div>
          <hr />

          <label className="form-label" htmlFor="cds_ids">
            CDS IDS List
          </label>
          {Object.entries(cdsIdsList).map((row, idx) => {
            return (
              <>
                <div className="row mt-2">
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor={"old_cds_id" + row[0]}
                    >
                      Row {idx + 1}
                    </label>
                  </div>
                  <div className="col">
                    <input
                      disabled
                      className=" form-control"
                      type="number"
                      name={"old_cds_id" + row[0]}
                      value={row[0]}
                    />
                  </div>
                  <div className="col">
                    <input
                      onChange={changeCdsIdsHandler}
                      className=" form-control"
                      type="number"
                      placeholder="New CDS ID"
                      name={"new_cds_id" + row[0]}
                      value={cdsIds[row[0]]}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <hr />
          <label className="form-label" htmlFor="api_ids">
            API IDS List
          </label>
          {Object.entries(apiIdsList).map((row, idx) => {
            return (
              <>
                <div className="row mt-2">
                  <div className="col">
                    <label
                      className="form-label"
                      htmlFor={"old_api_id" + row[0]}
                    >
                      Row {idx + 1}
                    </label>
                  </div>
                  <div className="col">
                    <input
                      disabled
                      className=" form-control"
                      type="number"
                      name={"old_api_id" + row[0]}
                      value={row[0]}
                    />
                  </div>
                  <div className="col">
                    <input
                      onChange={changeAPIIdsHandler}
                      className=" form-control"
                      type="number"
                      placeholder="New API ID"
                      name={"new_api_id" + row[0]}
                      value={apiIds[row[0]]}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <hr />
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
            generateNewMappingsFile();
          }}
        >
          Generate Mappings
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMappingModal;
