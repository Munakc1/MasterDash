'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';

// Medicine type
interface Medicine {
  id: number;
  name: string;
  category: string;
  brand: string;
  batchNo: string;
  quantity: number;
  unit: string;
  expiry: string; // ISO string
}

// Utility for status color
const getStatusColor = (expiry: string, quantity: number): string => {
  const today = new Date();
  const expiryDate = new Date(expiry);
  const diff = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (quantity === 0) return '#6b7280'; // gray-500
  if (diff < 0) return '#dc2626'; // red-600
  if (diff < 30) return '#f97316'; // orange-500
  return '#16a34a'; // green-600
};

const colors = {
  primary: '#0077B6',
  lightBlue: '#CAF0F8',
  midBlue: '#5FA8D3',
  successGreen: '#4C956C',
  accentOrange: '#F4A261',
  darkText: '#333333',
};

export default function MedicineStockPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Painkiller',
      brand: 'Pharma Inc',
      batchNo: 'B1234',
      quantity: 100,
      unit: 'tablets',
      expiry: '2025-12-31',
    },
    {
      id: 2,
      name: 'Amoxicillin',
      category: 'Antibiotic',
      brand: 'HealthCorp',
      batchNo: 'A5678',
      quantity: 0,
      unit: 'capsules',
      expiry: '2023-05-15',
    },
  ]);

  const [search, setSearch] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    id: undefined,
    name: '',
    category: '',
    brand: '',
    batchNo: '',
    quantity: 0,
    unit: '',
    expiry: '',
  });

  // Filter medicines by search
  const filteredMedicines = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add Dialog handlers
  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setNewMedicine({
      id: undefined,
      name: '',
      category: '',
      brand: '',
      batchNo: '',
      quantity: 0,
      unit: '',
      expiry: '',
    });
  };

  // Add medicine handler
  const handleAddMedicine = () => {
    if (
      !newMedicine.id ||
      !newMedicine.name ||
      !newMedicine.category ||
      !newMedicine.brand ||
      !newMedicine.batchNo ||
      newMedicine.quantity === undefined ||
      !newMedicine.unit ||
      !newMedicine.expiry
    ) {
      alert('Please fill all required fields.');
      return;
    }
    if (medicines.some(m => m.id === newMedicine.id)) {
      alert('Medicine ID must be unique.');
      return;
    }
    setMedicines([...medicines, newMedicine as Medicine]);
    closeAddDialog();
  };

  return (
    <div className="p-6" style={{ color: colors.darkText }}>
      <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
        Medicine Stock
      </h1>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search medicines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ minWidth: 200 }}
          InputProps={{ style: { color: colors.darkText } }}
        />

        <Button
          variant="contained"
          startIcon={<Add />}
          style={{ backgroundColor: colors.primary, color: 'white' }}
          onClick={openAddDialog}
        >
          Add Medicine
        </Button>
      </div>

      {/* Medicines Table */}
      <Card variant="outlined" style={{ backgroundColor: colors.lightBlue }}>
        <CardContent>
          <div style={{ overflowX: 'auto' }}>
            <table className="min-w-full text-left text-sm" style={{ color: colors.darkText }}>
              <thead style={{ backgroundColor: '#e6f0f7' }}>
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Batch No</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Expiry</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map(med => (
                  <tr key={med.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{med.id}</td>
                    <td className="p-3">{med.name}</td>
                    <td className="p-3">{med.category}</td>
                    <td className="p-3">{med.brand}</td>
                    <td className="p-3">{med.batchNo}</td>
                    <td className="p-3">{med.quantity}</td>
                    <td className="p-3">{med.unit}</td>
                    <td className="p-3">{med.expiry}</td>
                    <td className="p-3" style={{ color: getStatusColor(med.expiry, med.quantity), fontWeight: 'bold' }}>
                      {med.quantity === 0
                        ? 'Out of stock'
                        : new Date(med.expiry) < new Date()
                        ? 'Expired'
                        : 'Available'}
                    </td>
                    <td className="p-3">
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </td>
                  </tr>
                ))}
                {filteredMedicines.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-6 text-center text-gray-500">
                      No medicines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Medicine Dialog */}
      <Dialog open={addDialogOpen} onClose={closeAddDialog}>
        <DialogTitle>Add New Medicine</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="ID"
            type="number"
            fullWidth
            margin="dense"
            value={newMedicine.id ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, id: parseInt(e.target.value) })}
            required
          />
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newMedicine.name ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, name: e.target.value })}
            required
          />
          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={newMedicine.category ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, category: e.target.value })}
            required
          />
          <TextField
            label="Brand"
            fullWidth
            margin="dense"
            value={newMedicine.brand ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, brand: e.target.value })}
            required
          />
          <TextField
            label="Batch Number"
            fullWidth
            margin="dense"
            value={newMedicine.batchNo ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, batchNo: e.target.value })}
            required
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="dense"
            value={newMedicine.quantity ?? 0}
            onChange={e => setNewMedicine({ ...newMedicine, quantity: parseInt(e.target.value) })}
            required
          />
          <TextField
            label="Unit"
            fullWidth
            margin="dense"
            value={newMedicine.unit ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, unit: e.target.value })}
            required
          />
          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            margin="dense"
            value={newMedicine.expiry ?? ''}
            onChange={e => setNewMedicine({ ...newMedicine, expiry: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMedicine} variant="contained" style={{ backgroundColor: colors.primary, color: 'white' }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
