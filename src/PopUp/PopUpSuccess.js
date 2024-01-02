import { Alert, Snackbar } from "@mui/material";
import React from "react";

const PopUpSuccess = ({ open, message, onClose, severity }) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={onClose}
          severity={severity || "success"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PopUpSuccess;
