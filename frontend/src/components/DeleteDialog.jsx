import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import { api } from "../services/api";
import Slide from "@mui/material/Slide";

const DeleteDialog = ({ open, contact, onClose, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await api.deleteContact(contact.id);
      setError(null);
      onDelete();
    } catch (err) {
      setError("Failed to delete contact. Please try again.");
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <DialogContentText>
          Are you sure you want to delete {contact?.first_name}{" "}
          {contact?.last_name}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
