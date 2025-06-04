"use client";
import React, { useState, ChangeEvent } from 'react';
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  InputAdornment,
  Badge,
  Modal,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface Medicine {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  discountedPrice: number;
  inStock: boolean;
  prescriptionRequired: boolean;
}

const medicines: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    manufacturer: 'Cipla',
    price: 30,
    discountedPrice: 25,
    inStock: true,
    prescriptionRequired: true,
  },
  {
    id: 2,
    name: 'Cough Syrup',
    manufacturer: 'Himalaya',
    price: 70,
    discountedPrice: 60,
    inStock: true,
    prescriptionRequired: false,
  },
  {
    id: 3,
    name: 'Vitamin D Injection',
    manufacturer: 'Zydus',
    price: 150,
    discountedPrice: 130,
    inStock: false,
    prescriptionRequired: true,
  },
];

const categories: string[] = ['All', 'Tablets', 'Syrups', 'Injections'];

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function MedicineOrderPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('All');
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState<boolean>(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  // Filter medicines by search and category
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Minimal category filtering for demo
    const matchesCategory =
      category === 'All' || med.name.toLowerCase().includes(category.toLowerCase());
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
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Order Medicines
      </Typography>

      {/* Search and Filter */}
      <Grid container spacing={2} alignItems="center" marginBottom={3}>
        <Grid item xs={12} md={6}>
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
        </Grid>

        <Grid item xs={12} md={3}>
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
        </Grid>
      </Grid>

      {/* Medicines List */}
      <Grid container spacing={3}>
        {filteredMedicines.length === 0 && (
          <Grid item xs={12}>
            <Typography color="textSecondary">No medicines found.</Typography>
          </Grid>
        )}

        {filteredMedicines.map((med) => (
          <Grid item xs={12} sm={6} md={4} key={med.id}>
            <Card
              variant="outlined"
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{med.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {med.manufacturer}
                </Typography>

                <Typography>
                  Price: <s>₹{med.price}</s> <strong>₹{med.discountedPrice}</strong>
                </Typography>
                <Typography color={med.inStock ? 'green' : 'red'} fontWeight="bold" mt={1}>
                  {med.inStock ? 'In Stock' : 'Out of Stock'}
                </Typography>

                {med.prescriptionRequired && (
                  <Badge color="secondary" badgeContent="Rx" sx={{ mt: 1 }} />
                )}
              </CardContent>

              <Box sx={{ p: 2 }}>
                {med.prescriptionRequired ? (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!med.inStock}
                    startIcon={<UploadFileIcon />}
                    onClick={() => handleOpenPrescriptionModal(med)}
                  >
                    Upload Prescription
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!med.inStock}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

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

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            fullWidth
            sx={{ mb: 2 }}
          >
            Choose File
            <input
              type="file"
              hidden
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handlePrescriptionUpload}
            />
          </Button>

          <Button variant="contained" onClick={handleClosePrescriptionModal} fullWidth>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
