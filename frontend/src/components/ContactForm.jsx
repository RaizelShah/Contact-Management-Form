import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid2,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { validateContact } from "../utils/validation";
import { api } from "../services/api";
import Slide from "@mui/material/Slide";

const ContactForm = ({ onContactAdded }) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company: "",
    job_title: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContact(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.createContact(values);
      setValues(initialValues);
      setSnackbar({
        open: true,
        message: "Contact added successfully!",
        severity: "success",
      });
      if (onContactAdded) onContactAdded();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error adding contact",
        severity: "error",
      });
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Contact
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid2 size={6}>
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

          <Grid2 size={6}>
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

          <Grid2 size={6}>
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

          <Grid2 size={6}>
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

          <Grid2 size={6}>
            <TextField
              fullWidth
              name="company"
              label="Company"
              value={values.company}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              fullWidth
              name="job_title"
              label="Job Title"
              value={values.job_title}
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={6} justifyItems={"center"}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Add Contact
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        TransitionComponent={SlideTransition}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ContactForm;
