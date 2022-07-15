// Packages
import axios from "axios";
import React, { useState } from "react";

// Custom Objects
import constants from "../../constants/constants";
import { SureifyObjectMapping } from "../../constants/som";

// Custom Compoonents
import SelectTextFieldCombo from "../../ui-elements/SelectTextFieldCombo/SelectTextFieldCombo";
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import CustomTextArea from "../../ui-elements/CustomTextArea/CustomTextArea";
import CustomSelect from "../../ui-elements/CustomSelect/CustomSelect";

// Helper Functions
import { GetTokensData } from "../../constants/utils";
import Ctabar from "../../ui-elements/Ctabar/Ctabar";

const ObjectMapping = ({
  key,
  mapping,
  setMappings,
  cdsId,
  filterMappingsByGroup,
  cloneMappings,
  setShowErrorModal,
  setApiError,
  isShowCtaBar = false,
  shouldLockFields = true,
}) => {
  // UseState
  const [data, setData] = useState(new SureifyObjectMapping(mapping));
  const [isLocked, setIsLocked] = useState(shouldLockFields);

  // Functions
  const changeHandler = (e) => {
    let newkey = e.target.name;
    let newvalue = e.target.value;
    let newData = new SureifyObjectMapping({ ...data, [newkey]: newvalue });
    if (!isShowCtaBar) {
      setMappings(newData);
    }
    setData(newData);
  };

  const updateMapping = async () => {
    try {
      const tokens = GetTokensData();
      const jsonData = data.getPatchMappings(cdsId);
      await axios.patch(constants.SOM_URL(), jsonData, {
        headers: tokens,
      });
    } catch (e) {
      setApiError(e);
      setShowErrorModal(true);
    }
  };

  const deleteMapping = async () => {
    try {
      const tokens = GetTokensData();
      const jsonData = data.getDeleteMappings(cdsId);
      await axios.patch(constants.SOM_URL(), jsonData, {
        headers: tokens,
      });
      filterMappingsByGroup(data.mapping_id);
    } catch (e) {
      setApiError(e);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="container">
      <CustomSelect
        key={"data_type" + key}
        data={data}
        setData={setData}
        labelName="Data Type"
        selectId="data_type"
        helperText="Choose one of the datatypes from the dropdown"
        isLocked={isLocked}
        changeHandler={changeHandler}
        dropDownMap={constants.MAPPINGS_DATA_TYPE}
      />

      <CustomTextField
        key={"extra" + key}
        data={data}
        setData={setData}
        labelName="Extra"
        textFieldId="extra"
        helperText="extra is a json object passed along with attrbute for the given mapping"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <SelectTextFieldCombo
        key={"field_source" + key}
        data={data}
        setData={setData}
        labelId="field_source_label"
        labelName="Field Source"
        selectId="field_source"
        helperText="Choose one from the dropdown or other for manual entry"
        isLocked={isLocked}
        changeHandler={changeHandler}
        switchCondition={
          data.field_source !== "" &&
          (data.field_source.includes("api") ||
            data.field_source === "other" ||
            constants.MAPPINGS_FIELD_SOURCE.every(
              (row) => row !== data.field_source
            ))
        }
        dropDownMap={constants.MAPPINGS_FIELD_SOURCE}
      />

      <CustomTextArea
        key={"post_op_config" + key}
        data={data}
        setData={setData}
        labelName="Post OP Config"
        textAreaId="post_op_config"
        helperText="JSON object for post op configuration for a given attribute"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <CustomTextArea
        key={"formatter" + key}
        data={data}
        setData={setData}
        labelName="Formatter"
        textAreaId="formatter"
        helperText="JSON object for formatting the given attribute"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <CustomTextField
        key={"mapping_id" + key}
        data={data}
        setData={setData}
        labelName="Mapping ID"
        textFieldId="mapping_id"
        helperText="UUID for a given mapping or number if existing"
        isLocked={true}
        changeHandler={changeHandler}
      />

      <CustomTextField
        key={"parent_idx" + key}
        data={data}
        setData={setData}
        labelName="Parent Idx"
        textFieldId="parent_idx"
        helperText="The group in which the current mapping should exist"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <CustomTextField
        key={"sureify_field_name" + key}
        data={data}
        setData={setData}
        labelName="Sureify Field name"
        textFieldId="sureify_field_name"
        helperText="Name of the given attribute if field_source is response otherwise input attribute name"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <CustomTextField
        key={"txn_key" + key}
        data={data}
        setData={setData}
        labelName="Transaction Key"
        textFieldId="txn_key"
        helperText="Attribute name from client API response"
        isLocked={isLocked}
        changeHandler={changeHandler}
      />

      <CustomSelect
        key={"txn_source" + key}
        data={data}
        setData={setData}
        labelName="Transaction Source"
        selectId="txn_source"
        helperText="Choose one of the txn_sources from the dropdown"
        isLocked={isLocked}
        changeHandler={changeHandler}
        dropDownMap={constants.MAPPINGS_TXN_SOURCE}
      />

      {isShowCtaBar ? (
        <Ctabar
          key={"cta_bar" + key}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          data={data}
          deleteData={deleteMapping}
          updateData={updateMapping}
          cloneData={cloneMappings}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ObjectMapping;
