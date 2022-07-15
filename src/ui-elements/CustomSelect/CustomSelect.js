// Packages
import React from "react";

// Material UI Components
import {
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const SelectTextFieldCombo = ({
  data,
  labelId,
  labelName,
  selectId,
  helperText,
  dropDownMap,
  isLocked,
  changeHandler,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
      <InputLabel id={labelId}>{labelName}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        name={selectId}
        value={data[selectId]}
        defaultValue={data[selectId]}
        label={labelName}
        onChange={changeHandler}
        disabled={isLocked}
      >
        {dropDownMap.map((value) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
      </Select>

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectTextFieldCombo;
