// Packages
import React, { useState, useEffect } from "react";

// Material UI Components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

// Styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ErrorHandlerModal = React.memo(({ errorState, setErrorState }) => {
  // useState
  const [text, setText] = useState("");

  // useEffect
  useEffect(() => {
    setText(
      errorState.error?.response?.data?.errors ||
        errorState.error?.message ||
        ""
    );
  }, [errorState]);

  // Functions
  const handleClose = () => {
    setErrorState({ ...errorState, showModal: false });
  };

  return (
    <div>
      <Modal keepMounted open={errorState.showModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            <b>Error during Operation!!!</b>
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            An error occured while performing the given operation.
            <br />
            <br />
            <b>Details:</b>
            <br />
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            An error occured while performing the given operation.
            {text}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
});

export default ErrorHandlerModal;
