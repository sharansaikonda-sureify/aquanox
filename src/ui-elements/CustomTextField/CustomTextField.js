// Packages
import React from "react";

// Material UI Components
import { FormHelperText, FormControl, TextField } from "@mui/material";

const CustomTextField = ({
  data,
  labelName,
  textFieldId,
  changeHandler,
  helperText,
  isLocked,
  extraParams = {},
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <TextField
        id={textFieldId}
        name={textFieldId}
        label={labelName}
        value={data[textFieldId]}
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

export default CustomTextField;
