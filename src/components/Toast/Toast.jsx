import React, { useState } from "react";
import { Snackbar, Button, Alert } from "@mui/material";

const Toast = ({ message, open, setOpen, type }) => {
  // Function to show toast
  const showToast = () => {
    // Set the message for the toast
    setOpen(true); // Open the toast
  };

  // Handle toast close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return; // Don't close if clicked away
    setOpen(false);
  };

  return (
    <div>
      {/* Snackbar (Toast) component */}
      <Snackbar
        open={open}
        autoHideDuration={3000} // Toast will hide after 6 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position of the toast
      >
        {/* Alert for custom styling */}
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
