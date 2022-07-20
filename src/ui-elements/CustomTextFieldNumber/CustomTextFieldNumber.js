// Packages
import React from "react";

// Material UI Components
import { FormHelperText, FormControl, TextField } from "@mui/material";

const CustomTextFieldNumber = ({
  data,
  labelName,
  textFieldId,
  changeHandler,
  helperText,
  isLocked,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <TextField
        id={textFieldId}
        name={textFieldId}
        type="number"
        label={labelName}
        value={data[textFieldId]}
        onChange={changeHandler}
        disabled={isLocked}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CustomTextFieldNumber;
