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
  Typography,
  Grid,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
} from '@mui/icons-material';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  unit: string;
  prescriptionRequired: boolean;
}

const categories = [
  'Medicines',
  'Health Supplements',
  'Medical Equipment',
  'Personal Care',
  'Baby & Maternity',
];

const colors = {
  primary: '#0077B6',
  lightBlue: '#CAF0F8',
  midBlue: '#5FA8D3',
  successGreen: '#4C956C',
  accentOrange: '#F4A261',
  darkText: '#333333',
};

export default function PharmacyPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Medicines',
      brand: 'Pharma Inc',
      price: 20,
      stock: 100,
      unit: 'tablets',
      prescriptionRequired: false,
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      category: 'Health Supplements',
      brand: 'NutriPlus',
      price: 35,
      stock: 50,
      unit: 'tablets',
      prescriptionRequired: false,
    },
    {
      id: 3,
      name: 'Digital Thermometer',
      category: 'Medical Equipment',
      brand: 'MediTech',
      price: 1500,
      stock: 20,
      unit: 'pcs',
      prescriptionRequired: false,
    },
    {
      id: 4,
      name: 'Baby Diapers Size M',
      category: 'Baby & Maternity',
      brand: 'BabyCare',
      price: 450,
      stock: 80,
      unit: 'packs',
      prescriptionRequired: false,
    },
    {
      id: 5,
      name: 'Hand Sanitizer 250ml',
      category: 'Personal Care',
      brand: 'CleanHands',
      price: 120,
      stock: 200,
      unit: 'bottles',
      prescriptionRequired: false,
    },
    {
      id: 6,
      name: 'Amoxicillin 500mg',
      category: 'Medicines',
      brand: 'HealthCorp',
      price: 60,
      stock: 70,
      unit: 'capsules',
      prescriptionRequired: true,
    },
    {
      id: 7,
      name: 'Multivitamin Gummies',
      category: 'Health Supplements',
      brand: 'VitaLife',
      price: 250,
      stock: 45,
      unit: 'bottles',
      prescriptionRequired: false,
    },
    {
      id: 8,
      name: 'Blood Pressure Monitor',
      category: 'Medical Equipment',
      brand: 'CarePlus',
      price: 3500,
      stock: 15,
      unit: 'pcs',
      prescriptionRequired: false,
    },
  ]);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory ? p.category === filterCategory : true)
  );

  const resetForm = () => {
    setNewProduct({});
    setIsEditing(false);
  };

  const handleAddOrUpdateProduct = () => {
    if (
      newProduct.id === undefined ||
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.brand ||
      newProduct.price === undefined ||
      newProduct.stock === undefined ||
      !newProduct.unit
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (!isEditing && products.some(p => p.id === newProduct.id)) {
      alert('Product ID must be unique.');
      return;
    }

    if (isEditing) {
      setProducts(products.map(p => (p.id === newProduct.id ? newProduct as Product : p)));
    } else {
      setProducts([...products, newProduct as Product]);
    }

    setAddDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setAddDialogOpen(true);
  };

  return (
    <div className="p-6" style={{ color: colors.darkText }}>
      <Typography variant="h4" sx={{ color: colors.primary, mb: 3 }}>
        🏪 Pharmacy Products
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by name or brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            select
            label="Category"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              resetForm();
              setAddDialogOpen(true);
            }}
            fullWidth
            sx={{ backgroundColor: colors.primary, color: '#fff' }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ backgroundColor: colors.lightBlue }}>
        <CardContent>
          {filteredProducts.length ? (
            <table className="min-w-full text-left text-sm">
              <thead style={{ backgroundColor: '#e6f0f7' }}>
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Prescription</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.brand}</td>
                    <td className="p-3">Rs. {product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">{product.unit}</td>
                    <td className="p-3">{product.prescriptionRequired ? 'Yes' : 'No'}</td>
                    <td className="p-3">
                      <IconButton size="small" title="View">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" title="Edit" onClick={() => handleEdit(product)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        title="Delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography align="center" sx={{ p: 3, color: 'gray' }}>
              No products found.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="ID"
            fullWidth
            type="number"
            margin="dense"
            value={newProduct.id ?? ''}
            disabled={isEditing}
            onChange={e => {
              const val = e.target.value;
              setNewProduct({ ...newProduct, id: val === '' ? undefined : parseInt(val) });
            }}
          />
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newProduct.name ?? ''}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <TextField
            label="Category"
            select
            fullWidth
            margin="dense"
            value={newProduct.category ?? ''}
            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Brand"
            fullWidth
            margin="dense"
            value={newProduct.brand ?? ''}
            onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            margin="dense"
            value={newProduct.price ?? ''}
            onChange={e => {
              const val = e.target.value;
              setNewProduct({ ...newProduct, price: val === '' ? undefined : parseFloat(val) });
            }}
          />
          <TextField
            label="Stock"
            fullWidth
            type="number"
            margin="dense"
            value={newProduct.stock ?? ''}
            onChange={e => {
              const val = e.target.value;
              setNewProduct({ ...newProduct, stock: val === '' ? undefined : parseInt(val) });
            }}
          />
          <TextField
            label="Unit"
            fullWidth
            margin="dense"
            value={newProduct.unit ?? ''}
            onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
          />
          <TextField
            label="Prescription Required"
            select
            fullWidth
            margin="dense"
            value={newProduct.prescriptionRequired ? 'Yes' : 'No'}
            onChange={e => setNewProduct({ ...newProduct, prescriptionRequired: e.target.value === 'Yes' })}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddDialogOpen(false);
            resetForm();
          }} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddOrUpdateProduct}
            variant="contained"
            sx={{ backgroundColor: colors.primary, color: '#fff' }}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
