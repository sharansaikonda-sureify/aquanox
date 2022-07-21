import React, { useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { SureifyObjectMapping } from "../../../constants/som";
import CustomTextField from "../../../ui-elements/CustomTextField/CustomTextField";
import CustomTextFieldNumber from "../../../ui-elements/CustomTextFieldNumber/CustomTextFieldNumber";

const CreateMappingModal = React.memo(
  ({ generateMappingsState, setGenerateMappingsState, mappings }) => {
    const defaultFileData = () => {
      return {
        name: "mappings.json",
        cdsId: 0,
        apiIds: { ...generateMappingsState.apiIds },
        cdsIds: { ...generateMappingsState.cdsIds },
      };
    };

    const [fileData, setFileData] = useState(defaultFileData());

    const [data, setData] = useState(
      mappings.map((row) => {
        return new SureifyObjectMapping(row);
      })
    );

    useEffect(() => {
      setFileData(defaultFileData());
      setData(
        mappings.map((row) => {
          return new SureifyObjectMapping(row);
        })
      );
    }, [generateMappingsState.showModal]);

    const handleClose = (isClear) => {
      setFileData(defaultFileData());
      setGenerateMappingsState({
        apiIds: {},
        cdsIds: {},
        showModal: false,
      });
    };

    const changeAPIIdsHandler = (e) => {
      const key = e.target.name.replace("new_api_id", "");
      const value = parseInt(e.target.value);

      let newData = {
        ...fileData,
        apiIds: { ...fileData.apiIds, [key]: value },
      };
      setFileData(newData);
    };

    const changeCdsIdsHandler = (e) => {
      const key = e.target.name.replace("new_cds_id", "");
      const value = parseInt(e.target.value);

      let newData = {
        ...fileData,
        cdsIds: { ...fileData.cdsIds, [key]: value },
      };
      setFileData(newData);
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
            return `cds(${fileData.cdsIds[parseInt(b)]},`;
          }
        );

        row.field_source = row.field_source.replaceAll(
          /api\.(.*?)$/g,
          (a, b) => {
            return `api.${fileData.apiIds[parseInt(b)]}`;
          }
        );

        return new SureifyObjectMapping(row).getPostMappingOnly();
      });

      let generatedData = {
        client_data_source_id: fileData.cdsId,
        mappings: newData,
      };

      return generatedData;
    };

    const generateNewMappingsFile = () => {
      const idsMap = captureMappingIds();
      const newData = updateMappingIds(idsMap);

      downloadFile(fileData.name, JSON.stringify(newData));
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

    console.count("Generate Mappings Modal");

    return (
      <Modal show={generateMappingsState.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>API and CDS Ids Matcher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <CustomTextField
              key={"generate_mappings_file_name"}
              data={{ file_name: fileData.name }}
              labelName="File Name"
              textFieldId="file_name"
              helperText="Name of the file to be downloaded"
              isLocked={false}
              changeHandler={(e) => {
                setFileData({ ...fileData, name: e.target.value });
              }}
            />

            <hr />

            <CustomTextFieldNumber
              key={"generate_mappings_cds_file"}
              data={{ file_name: fileData.cdsId }}
              labelName="CDS ID in File"
              textFieldId="file_name"
              helperText="Name of the file to be downloaded"
              isLocked={false}
              changeHandler={(e) => {
                setFileData({ ...fileData, cdsId: +e.target.value });
              }}
            />

            <hr />

            <label className="form-label" htmlFor="cds_ids">
              CDS IDS List
            </label>
            {Object.entries(fileData.cdsIds).map((row, idx) => {
              const keyNameNew = "new_cds_id" + row[0];
              return (
                <>
                  <div className="row mt-2">
                    <div className="col">
                      <CustomTextFieldNumber
                        key={keyNameNew}
                        data={{ [keyNameNew]: fileData.cdsIds[row[0]] }}
                        labelName={"New CDS ID for " + row[0]}
                        textFieldId={keyNameNew}
                        helperText=""
                        isLocked={false}
                        changeHandler={changeCdsIdsHandler}
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
            {Object.entries(fileData.apiIds).map((row, idx) => {
              const keyNameNew = "new_api_id" + row[0];

              return (
                <>
                  <div className="row mt-2">
                    <div className="col">
                      <CustomTextFieldNumber
                        key={keyNameNew}
                        data={{ [keyNameNew]: fileData.apiIds[row[0]] }}
                        labelName={"New API ID for " + row[0]}
                        textFieldId={keyNameNew}
                        helperText=""
                        isLocked={false}
                        changeHandler={changeAPIIdsHandler}
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
  }
);

export default CreateMappingModal;
