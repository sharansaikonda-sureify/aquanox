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

const ObjectMapping = React.memo(
  ({
    objectKey,
    mapping,
    setMapping = () => {},
    cdsId,
    filterMappingsByGroup,
    cloneMappings,
    setErrorState,
    isShowCtaBar = false,
    shouldLockFields = true,
  }) => {
    // UseState
    const [data, setData] = useState(new SureifyObjectMapping(mapping));
    const [isLocked, setIsLocked] = useState(shouldLockFields);

    // Functions
    const changeHandler = (e) => {
      console.log(isShowCtaBar);
      let newkey = e.target.name;
      let newvalue = e.target.value;
      let newData = new SureifyObjectMapping({ ...data, [newkey]: newvalue });
      if (!isShowCtaBar) {
        setMapping(newData);
      }
      setData(newData);
    };

    const updateMapping = async () => {
      try {
        const tokens = GetTokensData();
        const jsonData = data.getPatchMappings(cdsId);
        console.log(jsonData);
        await axios.patch(constants.SOM_URL(), jsonData, {
          headers: tokens,
        });
      } catch (e) {
        setErrorState({ error: e, showModal: true });
      }
    };

    const deleteMapping = async () => {
      try {
        const tokens = GetTokensData();
        const jsonData = data.getDeleteMappings(cdsId);
        await axios.patch(constants.SOM_URL(), jsonData, {
          headers: tokens,
        });
        filterMappingsByGroup(data.mapping_id, data.parent_idx);
      } catch (e) {
        setErrorState({ error: e, showModal: true });
      }
    };

    console.count("Object Mappings");
    return (
      <div className="container">
        <CustomSelect
          key={"data_type" + objectKey}
          data={data}
          labelName="Data Type"
          selectId="data_type"
          helperText="Choose one of the datatypes from the dropdown"
          isLocked={isLocked}
          changeHandler={changeHandler}
          dropDownMap={constants.MAPPINGS_DATA_TYPE}
        />

        <CustomTextField
          key={"extra" + objectKey}
          data={data}
          labelName="Extra"
          textFieldId="extra"
          helperText="extra is a json object passed along with attrbute for the given mapping"
          isLocked={isLocked}
          changeHandler={changeHandler}
        />

        <SelectTextFieldCombo
          key={"field_source" + objectKey}
          objectKey={"field_source" + objectKey}
          data={data}
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
          key={"post_op_config" + objectKey}
          data={data}
          labelName="Post OP Config"
          textAreaId="post_op_config"
          helperText="JSON object for post op configuration for a given attribute"
          isLocked={isLocked}
          changeHandler={changeHandler}
        />

        <CustomTextArea
          key={"formatter" + objectKey}
          data={data}
          labelName="Formatter"
          textAreaId="formatter"
          helperText="JSON object for formatting the given attribute"
          isLocked={isLocked}
          changeHandler={changeHandler}
        />

        <CustomTextField
          key={"mapping_id" + objectKey}
          data={data}
          labelName="Mapping ID"
          textFieldId="mapping_id"
          helperText="UUID for a given mapping or number if existing"
          isLocked={true}
          changeHandler={changeHandler}
        />

        <CustomTextField
          key={"parent_idx" + objectKey}
          data={data}
          labelName="Parent Idx"
          textFieldId="parent_idx"
          helperText="The group in which the current mapping should exist"
          isLocked={isLocked}
          changeHandler={changeHandler}
        />

        <CustomTextField
          key={"sureify_field_name" + objectKey}
          data={data}
          labelName="Sureify Field name"
          textFieldId="sureify_field_name"
          helperText="Name of the given attribute if field_source is response otherwise input attribute name"
          isLocked={isLocked}
          changeHandler={changeHandler}
        />

        <CustomTextField
          key={"txn_key" + objectKey}
          data={data}
          labelName="Transaction Key"
          textFieldId="txn_key"
          helperText="Attribute name from client API response"
          isLocked={isLocked}
          changeHandler={changeHandler}
        />

        <CustomSelect
          key={"txn_source" + objectKey}
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
            key={"cta_bar" + objectKey}
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
  }
);

export default ObjectMapping;
