// Pacakges
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Custom Components
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";

// Material UI Components
import { Button, Grid } from "@mui/material";

// Material UI Icons
import { SecurityOutlined } from "@mui/icons-material";

// Custom Objects
import constants from "../../constants/constants";
import { Request, defaultPayload } from "../../constants/request";
import CustomTextArea from "../../ui-elements/CustomTextArea/CustomTextArea";
import CustomSelect from "../../ui-elements/CustomSelect/CustomSelect";
import CDSResponse from "../SureifyObjectMappingComponent/CDSResponse/CDSResponse";

// Constants
const objectKey = uuidv4();

const Dashboard = () => {
  const [tokens, setTokens] = useState({
    access_token: "",
    carrier_token: "",
    base_url: "http://localhost:8080",
  });

  const [request, setRequest] = useState(new Request(defaultPayload));
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (localStorage.getItem("tokens") != null) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      setTokens(tokens);
    }

    setRequest(new Request(defaultPayload));
    setRequest({});
  }, []);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let newData = { ...tokens, [key]: value };
    setTokens(newData);
  };

  const changeRequestHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let newData = new Request({ ...request, [key]: value });
    setRequest(newData);
  };

  const updateTokens = () => {
    console.log(tokens);
    localStorage.setItem("tokens", JSON.stringify(tokens));
  };

  const executeAPI = async () => {
    let resp = await request.getResponse(tokens);
    setResponse(resp?.data);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop="5px"
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={4}>
          <CustomTextField
            key={"base_url" + objectKey}
            data={tokens}
            labelName="Base URL"
            textFieldId="base_url"
            helperText="Base URL for Pluto (http://localhost:8080)"
            isLocked={false}
            changeHandler={changeHandler}
          />
        </Grid>

        <Grid item xs={4}>
          <CustomTextField
            key={"access_token" + objectKey}
            data={tokens}
            labelName="Access Token"
            textFieldId="access_token"
            helperText="Access Token for Pluto (Bearer token)"
            isLocked={false}
            changeHandler={changeHandler}
          />
        </Grid>

        <Grid item xs={3}>
          <CustomTextField
            key={"carrier_token" + objectKey}
            data={tokens}
            labelName="Carrier Token"
            textFieldId="carrier_token"
            helperText="Carrier Token for Pluto"
            isLocked={false}
            changeHandler={changeHandler}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            size="xl"
            variant="contained"
            color="success"
            onClick={updateTokens}
            endIcon={<SecurityOutlined />}
          >
            Update Token
          </Button>
        </Grid>
      </Grid>
      <hr />
      <Grid
        container
        spacing={2}
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={6}>
          <Button
            fullWidth
            size="xl"
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/clientapis");
            }}
          >
            Client APIs
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth
            size="xl"
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/som");
            }}
          >
            Sureify Object Mappings
          </Button>
        </Grid>
      </Grid>
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
