const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const contactRoutes = require("./routes/contact.routes");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
