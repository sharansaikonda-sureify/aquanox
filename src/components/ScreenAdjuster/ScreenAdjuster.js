// Packages
import React from "react";

// Material UI Comoponents
import { Stack, Button } from "@mui/material";

// Material UI Colors
import { deepOrange, yellow } from "@mui/material/colors";

// Material UI Icons
import {
  ArrowLeftOutlined,
  AdjustOutlined,
  ArrowRightOutlined,
} from "@mui/icons-material";

const ScreenAdjuster = ({ screenAdjusterState, setScreenAdjusterState }) => {
  if (screenAdjusterState.show) {
    return (
      <div
        className="row fixed-top"
        style={{ marginTop: "8vh", marginLeft: "-10vw" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                screenAdjusterState.position === 0
                  ? deepOrange[900]
                  : yellow[900],
              "&:hover": {
                backgroundColor:
                  screenAdjusterState.position === 0
                    ? deepOrange[800]
                    : yellow[800],
              },
            }}
            endIcon={<ArrowLeftOutlined />}
            onClick={() => {
              setScreenAdjusterState({ ...screenAdjusterState, position: 0 });
            }}
          ></Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor:
                screenAdjusterState.position === 1
                  ? deepOrange[900]
                  : yellow[900],
              "&:hover": {
                backgroundColor:
                  screenAdjusterState.position === 1
                    ? deepOrange[800]
                    : yellow[800],
              },
            }}
            endIcon={<AdjustOutlined />}
            onClick={() => {
              setScreenAdjusterState({ ...screenAdjusterState, position: 1 });
            }}
          ></Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor:
                screenAdjusterState.position === 2
                  ? deepOrange[900]
                  : yellow[900],
              "&:hover": {
                backgroundColor:
                  screenAdjusterState.position === 2
                    ? deepOrange[800]
                    : yellow[800],
              },
            }}
            onClick={() => {
              setScreenAdjusterState({ ...screenAdjusterState, position: 2 });
            }}
            endIcon={<ArrowRightOutlined />}
          ></Button>
        </Stack>
      </div>
    );
  }

  return <></>;
};

export default ScreenAdjuster;
