// Packages
import React from "react";

// Material UI Components
import {
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

const SelectTextFieldCombo = ({
  objectKey,
  data,
  labelId,
  labelName,
  selectId,
  changeHandler,
  helperText,
  isLocked,
  switchCondition,
  dropDownMap,
}) => {
  if (switchCondition) {
    return (
      <FormControl sx={{ m: 1, minWidth: "100%" }}>
        <TextField
          key={"text_field" + objectKey}
          id={selectId}
          name={selectId}
          label={labelName}
          value={data[selectId]}
          onChange={changeHandler}
          disabled={isLocked}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <InputLabel id={labelId}>{labelName}</InputLabel>
      <Select
        key={"select" + objectKey}
        labelId={labelId}
        id={selectId}
        name={selectId}
        value={data[selectId]}
        defaultValue={data[selectId]}
        label={labelName}
        onChange={changeHandler}
        disabled={isLocked}
      >
        {dropDownMap.map((value, idx) => {
          return (
            <MenuItem key={"menuitem-" + idx + objectKey} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectTextFieldCombo;
