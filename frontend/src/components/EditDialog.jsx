import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid2,
  Alert,
} from "@mui/material";
import { api } from "../services/api";
import { validateContact } from "../utils/validation";
import Slide from "@mui/material/Slide";

const EditDialog = ({ open, contact, onClose, onSave }) => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company: "",
    job_title: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (contact) {
      setValues({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone_number: contact.phone_number,
        company: contact.company || "",
        job_title: contact.job_title || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateContact(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.updateContact(contact.id, values);
      setSubmitError(null);
      onSave();
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Error updating contact");
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Transition}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              name="first_name"
              label="First Name"
              value={values.first_name}
              onChange={handleChange}
              error={!!errors.first_name}
              helperText={errors.first_name}
              required
            />
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              name="last_name"
              label="Last Name"
              value={values.last_name}
              onChange={handleChange}
              error={!!errors.last_name}
              helperText={errors.last_name}
              required
            />
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone_number"
              label="Phone Number"
              value={values.phone_number}
              onChange={handleChange}
              error={!!errors.phone_number}
              helperText={errors.phone_number}
              required
            />
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              name="company"
              label="Company"
              value={values.company}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              name="job_title"
              label="Job Title"
              value={values.job_title}
              onChange={handleChange}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
