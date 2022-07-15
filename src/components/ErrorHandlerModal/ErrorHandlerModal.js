// Packages
import { useState, useEffect } from "react";

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

const ErrorHandlerModal = ({ error, showModal, setShowModal }) => {
  // useState
  const [text, setText] = useState("");

  // useEffect
  useEffect(() => {
    setText(error.response?.data?.errors || error.message || "");
  }, [error]);

  // Functions
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal keepMounted open={showModal} onClose={handleClose}>
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
            <p>{text}</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ErrorHandlerModal;
