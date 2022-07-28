// Pacakges
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Custom Components
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import { Request, defaultPayload } from "../../constants/request";
import CustomTextArea from "../../ui-elements/CustomTextArea/CustomTextArea";
import CustomSelect from "../../ui-elements/CustomSelect/CustomSelect";
import CDSResponse from "../SureifyObjectMappingComponent/CDSResponse/CDSResponse";
import EnvironmentSwitcher from "./EnvironmentSwitcher";

// Material UI Components
import { Button } from "@mui/material";

// Custom Objects
import constants from "../../constants/constants";

// Constants
const objectKey = uuidv4();

const Dashboard = () => {
  const [request, setRequest] = useState(new Request(defaultPayload));
  const [response, setResponse] = useState({});

  useEffect(() => {
    console.log("entered");
    setRequest(new Request(defaultPayload));
    setRequest({});
  }, []);

  const changeRequestHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let newData = new Request({ ...request, [key]: value });
    setRequest(newData);
  };

  const executeAPI = async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const resp = await request.getResponse(tokens);
    setResponse(resp?.data);
  };

  return (
    <>
      <EnvironmentSwitcher />
      <hr />

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <CustomTextField
              key={"url" + objectKey}
              data={request}
              labelName="Request URL"
              textFieldId="url"
              helperText="URL for given API"
              isLocked={false}
              changeHandler={changeRequestHandler}
            />

            <CustomTextArea
              key={"headers" + objectKey}
              data={request}
              labelName="Request Headers"
              textAreaId="headers"
              helperText="Headers for given API"
              isLocked={false}
              changeHandler={changeRequestHandler}
            />

            <CustomTextArea
              key={"params" + objectKey}
              data={request}
              labelName="Params"
              textAreaId="params"
              helperText="Query Params Object for given API"
              isLocked={false}
              changeHandler={changeRequestHandler}
            />

            <CustomTextArea
              key={"body" + objectKey}
              data={request}
              labelName="Body"
              textAreaId="body"
              helperText="JSON Object (Body) for given API"
              isLocked={false}
              changeHandler={changeRequestHandler}
            />

            <CustomSelect
              key={"method" + objectKey}
              data={request}
              labelName="HTTP Verb"
              selectId="method"
              helperText="HTTP Verb for given API"
              isLocked={false}
              changeHandler={changeRequestHandler}
              dropDownMap={constants.MAPPINGS_HTTP_VERBS}
            />

            <Button
              fullWidth
              size="xl"
              variant="contained"
              color="success"
              onClick={executeAPI}
            >
              Execute API
            </Button>
          </div>
          <div className="col">
            <CDSResponse data={response} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
