// Packages
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Material UI Components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import CustomTextField from "../../ui-elements/CustomTextField/CustomTextField";
import {
  SettingsOutlined,
  DangerousOutlined,
  AddOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const EnvironmentSwitcher = () => {
  const navigate = useNavigate();

  const [envConfArr, setEnvConfArr] = useState({
    idx: 0,
    conf: [
      {
        access_token: "Bearer ",
        carrier_token: "",
        base_url: "http://localhost:8080",
        name: "Local Environment",
      },
    ],
  });

  // Use Effect
  useEffect(() => {
    if (localStorage.getItem("envConfArr") != null) {
      const dataArr = JSON.parse(localStorage.getItem("envConfArr"));
      setEnvConfArr(dataArr);
    }
  }, []);

  // Handlers
  const handleTabChange = (event, newValue) => {
    const data = { ...envConfArr, idx: newValue };
    localStorage.setItem("envConfArr", JSON.stringify(data));
    setEnvConfArr(data);
  };

  const handleDataChange = (e, extraParams) => {
    const key = e.target.name;
    const value = e.target.value;
    let newData = { ...envConfArr, conf: [...envConfArr.conf] };
    newData["conf"][extraParams["idx"]][key] = value;
    localStorage.setItem("envConfArr", JSON.stringify(newData));
    setEnvConfArr(newData);
  };

  const createEnvironment = () => {
    const newConf = [
      ...envConfArr.conf,
      {
        access_token: "Bearer ",
        carrier_token: "",
        base_url: "http://example.com",
        name: "New Environment " + (envConfArr.conf.length + 1),
      },
    ];
    const newData = { conf: newConf, idx: newConf.length - 1 };
    localStorage.setItem("envConfArr", JSON.stringify(newData));
    setEnvConfArr(newData);
  };

  const deleteEnvironment = () => {
    localStorage.removeItem("tokens");
    let newConf = [...envConfArr.conf];
    const oldIdx = envConfArr.idx;
    const newIdx = 0;
    newConf.splice(oldIdx, 1);
    const newData = { idx: newIdx, conf: newConf };
    localStorage.removeItem("envConfArr", JSON.stringify(newData));
    setEnvConfArr(newData);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={envConfArr.idx} onChange={handleTabChange}>
          {envConfArr.conf.map((row, idx) => {
            return <Tab label={row.name} {...a11yProps(idx)} />;
          })}
        </Tabs>
      </Box>

      {envConfArr.conf.map((row, idx) => {
        return (
          <>
            <TabPanel value={envConfArr.idx} index={idx}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    paddingRight={2}
                    justify="space-between"
                    alignItems="stretch"
                  >
                    <Grid item xs={6}>
                      <CustomTextField
                        key={"name-" + idx}
                        data={envConfArr.conf[envConfArr.idx]}
                        labelName="Environment Name"
                        textFieldId="name"
                        helperText="Environment Name"
                        isLocked={false}
                        changeHandler={handleDataChange}
                        extraParams={{ idx: envConfArr.idx }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        key={"base_url-" + idx}
                        data={envConfArr.conf[envConfArr.idx]}
                        labelName="Base URL"
                        textFieldId="base_url"
                        helperText="Base URL for Pluto (http://localhost:8080)"
                        isLocked={false}
                        changeHandler={handleDataChange}
                        extraParams={{ idx: envConfArr.idx }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    paddingRight={2}
                    justify="space-between"
                    alignItems="stretch"
                  >
                    <Grid item xs={6}>
                      <CustomTextField
                        key={"access_token-" + idx}
                        data={envConfArr.conf[envConfArr.idx]}
                        labelName="Access Token"
                        textFieldId="access_token"
                        helperText="Access Token (Bearer)"
                        isLocked={false}
                        changeHandler={handleDataChange}
                        extraParams={{ idx: envConfArr.idx }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        key={"carrier_token-" + idx}
                        data={envConfArr.conf[envConfArr.idx]}
                        labelName="Carrier Token"
                        textFieldId="carrier_token"
                        helperText="Carrier Token"
                        isLocked={false}
                        changeHandler={handleDataChange}
                        extraParams={{ idx: envConfArr.idx }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color={
                      localStorage.getItem("tokens") ===
                      JSON.stringify(envConfArr.conf[envConfArr.idx])
                        ? "success"
                        : "error"
                    }
                    variant="contained"
                    endIcon={<DangerousOutlined />}
                    onClick={() => {
                      localStorage.setItem(
                        "tokens",
                        JSON.stringify(envConfArr.conf[envConfArr.idx])
                      );
                      window.location.reload();
                    }}
                  >
                    {localStorage.getItem("tokens") ===
                    JSON.stringify(envConfArr.conf[envConfArr.idx])
                      ? "Current Environment"
                      : "Set This Environment"}
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    endIcon={<AddOutlined />}
                    onClick={createEnvironment}
                  >
                    Create
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    disabled={envConfArr.conf.length <= 1}
                    endIcon={<DeleteOutlined />}
                    onClick={deleteEnvironment}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </TabPanel>
            <Box
              sx={{
                position: "absolute",
                bottom: "50px",
                right: "1px",
                height: "30px",
                transform: "translateZ(0px)",
                flexGrow: 1,
              }}
            >
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                <SpeedDialAction
                  key="Client APIs"
                  icon={<SettingsOutlined />}
                  tooltipTitle="Client APIs"
                  onClick={() => {
                    navigate("/clientapis");
                  }}
                />

                <SpeedDialAction
                  key="Sureify Object Mappings"
                  icon={<SettingsOutlined />}
                  tooltipTitle="Sureify Object Mappings"
                  onClick={() => {
                    navigate("/som");
                  }}
                />
              </SpeedDial>
            </Box>
          </>
        );
      })}
    </Box>
  );
};

export default EnvironmentSwitcher;
