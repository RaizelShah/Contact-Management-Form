// frontend/src/components/ContactTable.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { api } from "../services/api";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const ContactTable = ({ refresh }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [editDialog, setEditDialog] = useState({ open: false, contact: null });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    contact: null,
  });

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await api.getContacts(
        page + 1,
        rowsPerPage,
        orderBy,
        order.toUpperCase()
      );
      setContacts(data.contacts);
      setTotalCount(data.total);
      setError(null);
    } catch (err) {
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, rowsPerPage, orderBy, order, refresh]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (contact) => {
    setEditDialog({ open: true, contact });
  };

  const handleDelete = (contact) => {
    setDeleteDialog({ open: true, contact });
  };

  const handleEditComplete = () => {
    setEditDialog({ open: false, contact: null });
    fetchContacts();
  };

  const handleDeleteComplete = () => {
    setDeleteDialog({ open: false, contact: null });
    fetchContacts();
  };

  if (loading && page === 0) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { id: "first_name", label: "First Name" },
                { id: "last_name", label: "Last Name" },
                { id: "email", label: "Email" },
                { id: "phone_number", label: "Phone Number" },
                { id: "company", label: "Company" },
                { id: "job_title", label: "Job Title" },
                { id: "actions", label: "Actions" },
              ].map((column) => (
                <TableCell key={column.id}>
                  {column.id !== "actions" ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone_number}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.job_title}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(contact)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(contact)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <EditDialog
        open={editDialog.open}
        contact={editDialog.contact}
        onClose={() => setEditDialog({ open: false, contact: null })}
        onSave={handleEditComplete}
      />

      <DeleteDialog
        open={deleteDialog.open}
        contact={deleteDialog.contact}
        onClose={() => setDeleteDialog({ open: false, contact: null })}
        onDelete={handleDeleteComplete}
      />
    </>
  );
};

export default ContactTable;
