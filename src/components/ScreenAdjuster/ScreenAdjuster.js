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

const ScreenAdjuster = ({
  showScreenAdjuster,
  adjustScreen,
  setAdjustScreen,
}) => {
  if (showScreenAdjuster) {
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
                adjustScreen === 0 ? deepOrange[900] : yellow[900],
              "&:hover": {
                backgroundColor:
                  adjustScreen === 0 ? deepOrange[800] : yellow[800],
              },
            }}
            endIcon={<ArrowLeftOutlined />}
            onClick={() => {
              setAdjustScreen(0);
            }}
          ></Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor:
                adjustScreen === 1 ? deepOrange[900] : yellow[900],
              "&:hover": {
                backgroundColor:
                  adjustScreen === 1 ? deepOrange[800] : yellow[800],
              },
            }}
            endIcon={<AdjustOutlined />}
            onClick={() => {
              setAdjustScreen(1);
            }}
          ></Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor:
                adjustScreen === 2 ? deepOrange[900] : yellow[900],
              "&:hover": {
                backgroundColor:
                  adjustScreen === 2 ? deepOrange[800] : yellow[800],
              },
            }}
            onClick={() => {
              setAdjustScreen(2);
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
