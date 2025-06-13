"use client";
import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  Badge,
  Modal,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface Medicine {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  discountedPrice: number;
  inStock: boolean;
  prescriptionRequired: boolean;
  category: string;
}

const medicines: Medicine[] = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    manufacturer: "Cipla",
    price: 30,
    discountedPrice: 25,
    inStock: true,
    prescriptionRequired: true,
    category: "Tablets",
  },
  {
    id: 2,
    name: "Cough Syrup",
    manufacturer: "Himalaya",
    price: 70,
    discountedPrice: 60,
    inStock: true,
    prescriptionRequired: false,
    category: "Syrups",
  },
  {
    id: 3,
    name: "Vitamin D Injection",
    manufacturer: "Zydus",
    price: 150,
    discountedPrice: 130,
    inStock: false,
    prescriptionRequired: true,
    category: "Injections",
  },
];

const categories: string[] = ["All", "Tablets", "Syrups", "Injections"];

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function MedicineOrderPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState<boolean>(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || med.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleOpenPrescriptionModal = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setPrescriptionModalOpen(true);
  };

  const handleClosePrescriptionModal = () => {
    setPrescriptionModalOpen(false);
    setSelectedMedicine(null);
  };

  const handlePrescriptionUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!selectedMedicine) return;
    if (event.target.files && event.target.files.length > 0) {
      alert(`Prescription uploaded for ${selectedMedicine.name}`);
      handleClosePrescriptionModal();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Medicines
      </Typography>

      {/* Search and Filter */}
<<<<<<< HEAD
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
=======
      <Grid container spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Grid item xs={12} md={6}>
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d
          <TextField
            fullWidth
            placeholder="Search medicines..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div style={{ flex: "1 1 200px" }}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Medicines Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table aria-label="medicine table">
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Price (₹)</TableCell>
              <TableCell>Discounted Price (₹)</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Prescription Required</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredMedicines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No medicines found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMedicines.map((med) => (
                <TableRow
                  key={med.id}
                  hover
                  style={{ cursor: med.prescriptionRequired ? "pointer" : "default" }}
                  onClick={() =>
                    med.prescriptionRequired ? handleOpenPrescriptionModal(med) : undefined
                  }
                >
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.manufacturer}</TableCell>
                  <TableCell>
                    <Typography component="span" sx={{ textDecoration: "line-through", mr: 1 }}>
                      ₹{med.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">₹{med.discountedPrice}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={med.inStock ? "green" : "red"} fontWeight="bold">
                      {med.inStock ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {med.prescriptionRequired ? (
                      <Badge color="secondary" badgeContent="Rx" />
                    ) : (
                      "No"
                    )}
                  </TableCell>
                  <TableCell>
                    {med.prescriptionRequired ? (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenPrescriptionModal(med)}
                        disabled={!med.inStock}
                      >
                        Upload Rx
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!med.inStock}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Prescription Upload Modal */}
      <Modal
        open={prescriptionModalOpen}
        onClose={handleClosePrescriptionModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" gutterBottom>
            Upload Prescription for {selectedMedicine?.name}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <label htmlFor="upload-prescription-file">
              <input
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                id="upload-prescription-file"
                type="file"
                onChange={handlePrescriptionUpload}
              />
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: 1,
                  padding: "6px 12px",
                  color: "primary.main",
                  userSelect: "none",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                  },
                }}
              >
                <UploadFileIcon sx={{ mr: 1 }} />
                Choose File
              </Box>
            </label>
          </Box>

<<<<<<< HEAD
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Allowed file types: .pdf, .jpg, .jpeg, .png
            </Typography>
          </Box>
=======
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Allowed file types: .pdf, .jpg, .jpeg, .png
          </Typography>
>>>>>>> 9c7c356d3319422773f60c84f16195ebf327654d

          <Button
            variant="outlined"
            fullWidth
            onClick={handleClosePrescriptionModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}