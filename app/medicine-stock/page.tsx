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
  const [products, setProducts] = useState<Product[]>([{
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Medicines',
    brand: 'Pharma Inc',
    price: 20,
    stock: 100,
    unit: 'tablets',
    prescriptionRequired: false,
  }]);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory ? p.category === filterCategory : true)
  );

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name || !newProduct.category || !newProduct.brand || newProduct.price === undefined || newProduct.stock === undefined || !newProduct.unit) {
      alert('Please fill all required fields.');
      return;
    }
    setProducts([...products, newProduct as Product]);
    setAddDialogOpen(false);
    setNewProduct({});
  };

  return (
    <div className="p-6" style={{ color: colors.darkText }}>
      <Typography variant="h4" sx={{ color: colors.primary, mb: 3 }}>🏪 Pharmacy Products</Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            select
            label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value=''>All Categories</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAddDialogOpen(true)}
            fullWidth
            sx={{ backgroundColor: colors.primary, color: '#fff' }}
          >Add Product</Button>
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
                      <IconButton size="small"><Visibility /></IconButton>
                      <IconButton size="small"><Edit /></IconButton>
                      <IconButton size="small" color="error"><Delete /></IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography align="center" sx={{ p: 3, color: 'gray' }}>No products found.</Typography>
          )}
        </CardContent>
      </Card>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent dividers>
          <TextField label="ID" fullWidth type="number" margin="dense" value={newProduct.id ?? ''} onChange={e => setNewProduct({ ...newProduct, id: parseInt(e.target.value) })} />
          <TextField label="Name" fullWidth margin="dense" value={newProduct.name ?? ''} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <TextField label="Category" select fullWidth margin="dense" value={newProduct.category ?? ''} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
            {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </TextField>
          <TextField label="Brand" fullWidth margin="dense" value={newProduct.brand ?? ''} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} />
          <TextField label="Price" fullWidth type="number" margin="dense" value={newProduct.price ?? ''} onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
          <TextField label="Stock" fullWidth type="number" margin="dense" value={newProduct.stock ?? ''} onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })} />
          <TextField label="Unit" fullWidth margin="dense" value={newProduct.unit ?? ''} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })} />
          <TextField label="Prescription Required" select fullWidth margin="dense" value={newProduct.prescriptionRequired ? 'Yes' : 'No'} onChange={e => setNewProduct({ ...newProduct, prescriptionRequired: e.target.value === 'Yes' })}>
            <MenuItem value='Yes'>Yes</MenuItem>
            <MenuItem value='No'>No</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained" sx={{ backgroundColor: colors.primary, color: '#fff' }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
