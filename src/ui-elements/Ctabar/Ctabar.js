// Packages
import React from "react";

// Material UI Components
import { Button, Stack } from "@mui/material";

// Material UI Icons
import {
  ContentCopyOutlined,
  CreateOutlined,
  DeleteOutlined,
  LockOpenOutlined,
  LockOutlined,
} from "@mui/icons-material";

// Material UI Colors
import { deepPurple, green, red } from "@mui/material/colors";

const Ctabar = ({
  isLocked,
  setIsLocked,
  data,
  cloneData,
  deleteData,
  updateData,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      marginTop="15px"
      paddingRight={2}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
        paddingRight={2}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={isLocked}
          onClick={updateData}
          sx={{
            backgroundColor: deepPurple[900],
            "&:hover": {
              backgroundColor: deepPurple[800],
            },
          }}
          endIcon={<CreateOutlined />}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={isLocked}
          onClick={deleteData}
          sx={{
            backgroundColor: deepPurple[900],
            "&:hover": {
              backgroundColor: deepPurple[800],
            },
          }}
          endIcon={<DeleteOutlined />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={isLocked}
          onClick={() => {
            cloneData(data);
          }}
          sx={{
            backgroundColor: deepPurple[900],
            "&:hover": {
              backgroundColor: deepPurple[800],
            },
          }}
          endIcon={<ContentCopyOutlined />}
        >
          Clone
        </Button>
      </Stack>

      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setIsLocked(!isLocked);
        }}
        sx={{
          backgroundColor: `${isLocked ? green[900] : red[900]}`,
          "&:hover": {
            backgroundColor: `${isLocked ? green[700] : red[700]}`,
          },
        }}
        endIcon={isLocked ? <LockOpenOutlined /> : <LockOutlined />}
      >
        {isLocked ? "Unlock" : "Lock"}
      </Button>
    </Stack>
  );
};

export default Ctabar;
