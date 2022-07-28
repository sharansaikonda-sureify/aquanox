// Packages
import { axiosInstance as axios } from "../../../config/axiosConfig";
import React, { useState } from "react";

// Objects
import constants from "../../../constants/constants";
import { GetTokensData } from "../../../constants/utils";
import { ClientAPI } from "../../../constants/clientapi";

// Material UI Components
import { Grid } from "@mui/material";

// Custom Components
import CustomTextFieldNumber from "../../../ui-elements/CustomTextFieldNumber/CustomTextFieldNumber";
import CustomTextField from "../../../ui-elements/CustomTextField/CustomTextField";
import CustomTextArea from "../../../ui-elements/CustomTextArea/CustomTextArea";
import CustomSelect from "../../../ui-elements/CustomSelect/CustomSelect";
import Ctabar from "../../../ui-elements/Ctabar/Ctabar";

const ClientAPIObjectMapping = ({
  mapping,
  setMapping,
  cloneMappings,
  clientAPIId,
  objectKey,
  isShowCtaBar = false,
  shouldLockFields = true,
  setErrorState,
  fetchAllClientAPIs,
}) => {
  // UseState
  const [data, setData] = useState(new ClientAPI(mapping));
  const [isLocked, setIsLocked] = useState(shouldLockFields);

  const changeHandler = (e) => {
    let newkey = e.target.name;
    let newvalue = e.target.value;
    let newData = new ClientAPI({ ...data, [newkey]: newvalue });
    if (!isShowCtaBar) {
      setMapping(newData);
    }
    setData(newData);
  };

  const fetchCompleteData = async () => {
    if (isLocked) {
      try {
        const tokens = GetTokensData();
        const fetch_url = constants.CLIENT_APIS_URL() + "/" + data.id;
        const resp = await axios.get(fetch_url, {
          headers: tokens,
        });
        setData(new ClientAPI(resp.data.data));
      } catch (e) {
        setErrorState({ error: e, showModal: true });
      }
    }
  };

  const copyClientAPI = (data) => {
    const newData = data.getPutMappings();
    navigator.clipboard.writeText(JSON.stringify(newData));
  };

  const downloadClientAPI = () => {
    downloadFile(data.name + ".json", JSON.stringify(data.getPostMappings()));
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

  const updateClientAPI = async () => {
    try {
      const jsonData = data.getPutMappings();
      const tokens = GetTokensData();
      await axios.put(
        constants.CLIENT_APIS_URL() + "/" + clientAPIId,
        jsonData,
        {
          headers: tokens,
        }
      );
    } catch (e) {
      setErrorState({ error: e, showModal: true });
    }
  };

  const deleteClientAPI = async () => {
    if (
      prompt("Are you sure you want to delete? if yes enter API ID: ") ===
      "" + clientAPIId
    ) {
      try {
        const tokens = GetTokensData();
        await axios.delete(constants.CLIENT_APIS_URL() + "/" + clientAPIId, {
          headers: tokens,
        });

        await fetchAllClientAPIs();
      } catch (e) {
        setErrorState({ error: e, showModal: true });
      }
    } else {
      setErrorState({
        error: new Error("Invalid API ID Entered"),
        showModal: true,
      });
    }
  };

  return (
    <div className="container">
      <Grid
        container
        spacing={2}
        marginTop="15px"
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={`${isShowCtaBar === false ? "12" : "6"}`}>
          {data.client_data_source_id && data.client_data_source_id > 0 && (
            <CustomTextFieldNumber
              key={"client_data_source_id" + objectKey}
              data={{ client_data_source_id: data.client_data_source_id }}
              labelName="Client Data Source ID"
              textFieldId="client_data_source_id"
              helperText="Client Data Source ID for Sureify Object Mappings"
              isLocked={true}
              changeHandler={changeHandler}
            />
          )}
        </Grid>
        <Grid item xs={`${isShowCtaBar === false ? "12" : "6"}`}>
          <CustomTextField
            key={"client_data_source_uuid" + objectKey}
            data={{ client_data_source_uuid: data.client_data_source_uuid }}
            labelName="Client Data Sourc UUID"
            textFieldId="client_data_source_uuid"
            helperText="Alternative id for client data source"
            isLocked={true}
            changeHandler={changeHandler}
          />
        </Grid>
      </Grid>
      <CustomTextArea
        key={"headers" + objectKey}
        data={{ headers: data.headers }}
        labelName="Headers"
        textAreaId="headers"
        helperText="Headers for given API"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <Grid
        container
        spacing={2}
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={6}>
          <CustomTextArea
            key={"params" + objectKey}
            data={{ params: data.params }}
            labelName="Params"
            textAreaId="params"
            helperText="Query Params for given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextArea
            key={"body" + objectKey}
            data={{ body: data.body }}
            labelName="Body"
            textAreaId="body"
            helperText="JSON Object (Body) for given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={6}>
          <CustomTextField
            key={"ca_cert" + objectKey}
            data={{ ca_cert: data.ca_cert }}
            labelName="CA Cert"
            textFieldId="ca_cert"
            helperText="CA Cert for given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextArea
            key={"ssl_cert" + objectKey}
            data={{ ssl_cert: data.ssl_cert }}
            labelName="SSL Cert"
            textAreaId="ssl_cert"
            helperText="SSL certs of JSON array for given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={2}>
          <CustomSelect
            key={"session_less" + objectKey}
            data={{ session_less: data.session_less }}
            labelName="Session Less"
            selectId="session_less"
            helperText="Boolean variable indicating the need of access_token"
            isLocked={isLocked}
            changeHandler={changeHandler}
            dropDownMap={constants.MAPPINGS_SESSION_LESS}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextArea
            key={"clear_api_caches" + objectKey}
            data={{ clear_api_caches: data.clear_api_caches }}
            labelName="Clear API Caches"
            textAreaId="clear_api_caches"
            helperText="JSON array specifying the cached responses to be cleared"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextArea
            key={"no_cache_keys" + objectKey}
            data={{ no_cache_keys: data.no_cache_keys }}
            labelName="No Cache Keys"
            textAreaId="no_cache_keys"
            helperText="JSON array specifying the keys to be removed from redis key"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
      </Grid>

      <CustomTextArea
        key={"custom_error_codes" + objectKey}
        data={{ custom_error_codes: data.custom_error_codes }}
        labelName="Custom Error Codes"
        textAreaId="custom_error_codes"
        helperText="Custom Error codes to be sent based on conditions"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <Grid
        container
        spacing={2}
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={9}>
          <CustomTextField
            key={"name" + objectKey}
            data={{ name: data.name }}
            labelName="API Name"
            textFieldId="name"
            helperText="Unique name for a given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextFieldNumber
            key={"cache_time" + objectKey}
            data={{ cache_time: data.cache_time }}
            labelName="Cache Time"
            textFieldId="cache_time"
            helperText="Cache time for success API response"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        paddingRight={2}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={3}>
          <CustomSelect
            key={"type" + objectKey}
            data={{ type: data.type }}
            labelName="HTTP Verb"
            selectId="type"
            helperText="HTTP Verb for given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
            dropDownMap={constants.MAPPINGS_HTTP_VERBS}
          />
        </Grid>
        <Grid item xs={9}>
          <CustomTextField
            key={"url" + objectKey}
            data={{ url: data.url }}
            labelName="API Url"
            textFieldId="url"
            helperText="URL for a given API"
            isLocked={isLocked}
            changeHandler={changeHandler}
          />
        </Grid>
      </Grid>
      {isShowCtaBar ? (
        <Ctabar
          key={"cta_bar" + objectKey}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          data={data}
          deleteData={deleteClientAPI}
          updateData={updateClientAPI}
          copyData={copyClientAPI}
          downloadData={downloadClientAPI}
          callCustomFunc={fetchCompleteData}
          cloneData={cloneMappings}
          isDownload={true}
          isCustomFunc={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ClientAPIObjectMapping;
