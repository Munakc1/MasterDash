'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from '@mui/material';
import {
  Upload,
  Download,
  Add,
} from '@mui/icons-material';

// Patient type
type Patient = {
  id: number;
  name: string;
  gender: string;
  age: number;
  status: string;
  email: string;
  phone: string;
  image?: string;
};

const colors = {
  primary: '#0077B6',
  lightBlue: '#CAF0F8',
  midBlue: '#5FA8D3',
  successGreen: '#4C956C',
  accentOrange: '#F4A261',
  darkText: '#333333',
  white: '#FFFFFF',
  midBlack: '#666666',
  Blue: '#2196f3',
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id' | 'age'> & { id: string; age: string }>({
    id: '',
    name: '',
    gender: '',
    age: '',
    status: 'Admitted',
    email: '',
    phone: '',
    image: '',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

 useEffect(() => {
  setLoading(true);
  fetch('http://localhost:3001/patients')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => {
      setPatients(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setLoading(false);
    });
}, []);


  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setNewPatient({
      id: '',
      name: '',
      gender: '',
      age: '',
      status: 'Admitted',
      email: '',
      phone: '',
      image: '',
    });
  };

  const handleAddPatient = () => {
    if (!newPatient.id || !newPatient.name.trim() || !newPatient.gender || !newPatient.age || !newPatient.status) {
      alert('Please fill all required fields (ID, Name, Gender, Age, Status)');
      return;
    }

    const idNumber = Number(newPatient.id);
    if (isNaN(idNumber) || idNumber <= 0) {
      alert('Patient ID must be a positive number.');
      return;
    }

    if (patients.some((p) => p.id === idNumber)) {
      alert('Patient ID must be unique.');
      return;
    }

    const ageNumber = Number(newPatient.age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      alert('Age must be a positive number.');
      return;
    }

    const newEntry: Patient = {
      ...newPatient,
      id: idNumber,
      age: ageNumber,
      name: newPatient.name.trim(),
    };

    setPatients([...patients, newEntry]);
    closeAddDialog();
  };

  const handleExport = () => {
    const header = ['ID', 'Name', 'Gender', 'Age', 'Status', 'Email', 'Phone'];
    const rows = filteredPatients.map((p) => [p.id, p.name, p.gender, p.age, p.status, p.email, p.phone]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = 'patients_export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const text = ev.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const idIdx = headers.indexOf('id');
    const nameIdx = headers.indexOf('name');
    const genderIdx = headers.indexOf('gender');
    const ageIdx = headers.indexOf('age');
    const statusIdx = headers.indexOf('status');
    const emailIdx = headers.indexOf('email');
    const phoneIdx = headers.indexOf('phone');

    const imported: Patient[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      const id = Number(cols[idIdx]);
      const age = Number(cols[ageIdx]);

      if (isNaN(id) || isNaN(age)) continue;

      imported.push({
        id,
        name: cols[nameIdx],
        gender: cols[genderIdx],
        age,
        status: cols[statusIdx],
        email: emailIdx !== -1 ? cols[emailIdx] : '',
        phone: phoneIdx !== -1 ? cols[phoneIdx] : '',
        image: '',
      });
    }

    const existingIds = new Set(patients.map((p) => p.id));
    const filtered = imported.filter((p) => !existingIds.has(p.id));
    setPatients((prev) => [...prev, ...filtered]);
    alert(`Imported ${filtered.length} patients.`);
  };

  if (loading) return <div style={{ padding: 24, color: colors.darkText }}>Loading patients...</div>;

  return (
    <div className="p-6" style={{ color: colors.darkText }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>Patients</h1>
      <p className="mb-6" style={{ color: '#555' }}>Manage your patient records</p>

      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4 w-full">
        <div className="flex flex-col md:flex-row gap-2 md:w-1/2 w-full">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-auto"
            InputProps={{ style: { color: colors.darkText } }}
          />
          <FormControl size="small" style={{ minWidth: 120 }} className="mt-2 md:mt-0">
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Admitted">Admitted</MenuItem>
              <MenuItem value="Discharged">Discharged</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex gap-2">
          <Button variant="contained" startIcon={<Add />} onClick={openAddDialog}>Add Patient</Button>
          <Button variant="outlined" startIcon={<Upload />} onClick={handleImportClick}>Import CSV</Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExport}>Export CSV</Button>
        </div>
      </div>

      <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

      <Card>
        <CardContent>
          <Table size="small" aria-label="patients table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" style={{ color: colors.midBlack }}>
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar
                      src={patient.image || undefined}
                      alt={patient.name}
                      sx={{ width: 32, height: 32 }}
                    />
                    {patient.name}
                  </TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell
                    style={{
                      color: patient.status === 'Admitted' ? colors.successGreen : colors.accentOrange,
                      fontWeight: 'bold',
                    }}
                  >
                    {patient.status}
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Patient Dialog */}
      <Dialog open={addDialogOpen} onClose={closeAddDialog}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent className="flex flex-col gap-4" sx={{ minWidth: 320 }}>
          <TextField
            label="Patient ID"
            value={newPatient.id}
            onChange={(e) => setNewPatient((p) => ({ ...p, id: e.target.value }))}
            fullWidth
            type="number"
            required
          />
          <TextField
            label="Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient((p) => ({ ...p, name: e.target.value }))}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={newPatient.gender}
              label="Gender"
              onChange={(e) => setNewPatient((p) => ({ ...p, gender: e.target.value }))}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient((p) => ({ ...p, age: e.target.value }))}
            fullWidth
            type="number"
            required
          />
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={newPatient.status}
              label="Status"
              onChange={(e) => setNewPatient((p) => ({ ...p, status: e.target.value }))}
            >
              <MenuItem value="Admitted">Admitted</MenuItem>
              <MenuItem value="Discharged">Discharged</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            value={newPatient.email}
            onChange={(e) => setNewPatient((p) => ({ ...p, email: e.target.value }))}
            fullWidth
            type="email"
          />
          <TextField
            label="Phone"
            value={newPatient.phone}
            onChange={(e) => setNewPatient((p) => ({ ...p, phone: e.target.value }))}
            fullWidth
            type="tel"
          />
          <TextField
            label="Image URL"
            value={newPatient.image}
            onChange={(e) => setNewPatient((p) => ({ ...p, image: e.target.value }))}
            fullWidth
            placeholder="Optional"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddPatient}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
