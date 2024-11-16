const pool = require("../config/db.config");

const contactController = {
  // Create new contact
  async createContact(req, res) {
    const { first_name, last_name, email, phone_number, company, job_title } =
      req.body;

    try {
      const result = await pool.query(
        "INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [first_name, last_name, email, phone_number, company, job_title]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation error code
        res.status(400).json({ message: "Email already exists" });
      } else {
        res
          .status(500)
          .json({ message: "Error creating contact", error: error.message });
      }
    }
  },

  // Get all contacts with pagination and sorting
  async getContacts(req, res) {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      order = "DESC",
    } = req.query;
    const offset = (page - 1) * limit;

    try {
      const countResult = await pool.query("SELECT COUNT(*) FROM contacts");
      const total = parseInt(countResult.rows[0].count);

      const result = await pool.query(
        `SELECT * FROM contacts ORDER BY ${sortBy} ${order} LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      res.json({
        contacts: result.rows,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving contacts", error: error.message });
    }
  },

  // Update contact
  async updateContact(req, res) {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, company, job_title } =
      req.body;

    try {
      const result = await pool.query(
        "UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone_number = $4, company = $5, job_title = $6 WHERE id = $7 RETURNING *",
        [first_name, last_name, email, phone_number, company, job_title, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        res.status(400).json({ message: "Email already exists" });
      } else {
        res
          .status(500)
          .json({ message: "Error updating contact", error: error.message });
      }
    }
  },

  // Delete contact
  async deleteContact(req, res) {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM contacts WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting contact", error: error.message });
    }
  },
};

module.exports = contactController;
