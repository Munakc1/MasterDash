'use client';

import { useEffect, useState } from 'react';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  fetch('http://localhost:4000/products')
 // or change to correct port
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => setProducts(data))
    .catch(err => console.error('Failed to load data', err));
}, []);


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

      {/* Search & Filter (Flexbox Layout) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
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
        </div>

        <div style={{ flex: '0 0 200px', minWidth: '180px' }}>
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
        </div>

        <div style={{ flex: '0 0 150px', minWidth: '140px' }}>
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
        </div>
      </div>

      {/* Table */}
      <Card variant="outlined" sx={{ backgroundColor: colors.lightBlue }}>
        <CardContent>
          {filteredProducts.length ? (
            <table className="min-w-full text-left text-sm" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#e6f0f7' }}>
                <tr>
                  <th className="p-3" style={{ padding: '12px' }}>ID</th>
                  <th className="p-3" style={{ padding: '12px' }}>Name</th>
                  <th className="p-3" style={{ padding: '12px' }}>Category</th>
                  <th className="p-3" style={{ padding: '12px' }}>Brand</th>
                  <th className="p-3" style={{ padding: '12px' }}>Price</th>
                  <th className="p-3" style={{ padding: '12px' }}>Stock</th>
                  <th className="p-3" style={{ padding: '12px' }}>Unit</th>
                  <th className="p-3" style={{ padding: '12px' }}>Prescription</th>
                  <th className="p-3" style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-t hover:bg-gray-50" style={{ borderTop: '1px solid #ddd', cursor: 'default' }}>
                    <td className="p-3" style={{ padding: '12px' }}>{product.id}</td>
                    <td className="p-3" style={{ padding: '12px' }}>{product.name}</td>
                    <td className="p-3" style={{ padding: '12px' }}>{product.category}</td>
                    <td className="p-3" style={{ padding: '12px' }}>{product.brand}</td>
                    <td className="p-3" style={{ padding: '12px' }}>Rs. {product.price}</td>
                    <td className="p-3" style={{ padding: '12px' }}>{product.stock}</td>
                    <td className="p-3" style={{ padding: '12px' }}>{product.unit}</td>
                    <td className="p-3" style={{ padding: '12px' }}>{product.prescriptionRequired ? 'Yes' : 'No'}</td>
                    <td className="p-3" style={{ padding: '12px' }}>
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

      {/* Add/Edit Dialog */}
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
