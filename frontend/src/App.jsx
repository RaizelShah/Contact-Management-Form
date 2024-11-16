import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";

const App = () => {
  const [refreshTable, setRefreshTable] = useState(0);

  const handleContactAdded = () => {
    setRefreshTable((prev) => prev + 1);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Contact Management Form
        </Typography>

        <ContactForm onContactAdded={handleContactAdded} />
        <ContactTable refresh={refreshTable} />
      </Box>
    </Container>
  );
};

export default App;
