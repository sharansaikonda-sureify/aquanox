// Packages
import React from "react";

// Material UI Components
import { FormHelperText, FormControl, TextField } from "@mui/material";

const CustomTextArea = ({
  data,
  labelName,
  textAreaId,
  helperText,
  isLocked,
  changeHandler,
  extraParams = {},
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <TextField
        multiline={true}
        maxRows={100}
        id={textAreaId}
        name={textAreaId}
        label={labelName}
        value={data[textAreaId]}
        autoComplete="off"
        onChange={(e) => {
          changeHandler(e, extraParams);
        }}
        disabled={isLocked}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CustomTextArea;
