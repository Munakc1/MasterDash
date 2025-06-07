'use client';

import { useState, useRef } from 'react';
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
  FilterList,
  Upload,
  Download,
  MoreVert,
  Add,
} from '@mui/icons-material';

// Initial patients data
const initialPatients = [
  {
    id: 1001,
    name: 'John Doe',
    gender: 'Male',
    age: 45,
    status: 'Admitted',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    image: '/images/patient1.jpg',
  },
  {
    id: 1002,
    name: 'Jane Smith',
    gender: 'Female',
    age: 32,
    status: 'Discharged',
    email: 'jane.smith@example.com',
    phone: '321-654-0987',
    image: '/images/patient2.jpg',
  },
  {
    id: 1003,
    name: 'Amit Verma',
    gender: 'Male',
    age: 60,
    status: 'Admitted',
    email: 'amit.verma@example.com',
    phone: '456-789-0123',
    image: '/images/patient3.jpg',
  },
];

// Custom colors
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
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    id: '',
    name: '',
    gender: '',
    age: '',
    status: 'Admitted',
    email: '',
    phone: '',
    image: '',
  });

  const fileInputRef = useRef(null);

  // Filter patients by search and status
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle Add Patient dialog open/close
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

  // Handle adding new patient
  const handleAddPatient = () => {
    if (
      !newPatient.id ||
      !newPatient.name.trim() ||
      !newPatient.gender ||
      !newPatient.age ||
      !newPatient.status
    ) {
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

    setPatients([
      ...patients,
      {
        ...newPatient,
        id: idNumber,
        age: ageNumber,
        name: newPatient.name.trim(),
      },
    ]);
    closeAddDialog();
  };

  // Handle CSV Export
  const handleExport = () => {
    if (patients.length === 0) {
      alert('No patient data to export.');
      return;
    }
    const header = ['ID', 'Name', 'Gender', 'Age', 'Status', 'Email', 'Phone'];
    const rows = filteredPatients.map((p) => [
      p.id,
      p.name,
      p.gender,
      p.age,
      p.status,
      p.email,
      p.phone,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [header, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = 'patients_export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle CSV Import
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      alert('CSV file is empty or does not contain data.');
      return;
    }
    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const idIdx = headers.indexOf('id');
    const nameIdx = headers.indexOf('name');
    const genderIdx = headers.indexOf('gender');
    const ageIdx = headers.indexOf('age');
    const statusIdx = headers.indexOf('status');
    const emailIdx = headers.indexOf('email');
    const phoneIdx = headers.indexOf('phone');

    if (
      idIdx === -1 ||
      nameIdx === -1 ||
      genderIdx === -1 ||
      ageIdx === -1 ||
      statusIdx === -1
    ) {
      alert(
        'CSV must have at least these headers: ID, Name, Gender, Age, Status'
      );
      return;
    }

    const importedPatients = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue; // skip empty lines

      const cols = line.split(',').map((c) => c.trim());
      const idVal = Number(cols[idIdx]);
      const ageVal = Number(cols[ageIdx]);

      if (isNaN(idVal) || isNaN(ageVal)) {
        // skip invalid rows
        continue;
      }

      importedPatients.push({
        id: idVal,
        name: cols[nameIdx],
        gender: cols[genderIdx],
        age: ageVal,
        status: cols[statusIdx],
        email: emailIdx !== -1 ? cols[emailIdx] : '',
        phone: phoneIdx !== -1 ? cols[phoneIdx] : '',
        image: '',
      });
    }

    // Filter out duplicates by id
    const existingIds = new Set(patients.map((p) => p.id));
    const filteredImported = importedPatients.filter(
      (p) => !existingIds.has(p.id)
    );

    setPatients((prev) => [...prev, ...filteredImported]);
    alert(
      `Imported ${filteredImported.length} patients. Duplicates ignored by ID.`
    );
  };

  return (
    <div className="p-6" style={{ color: colors.darkText }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
        Patients
      </h1>
      <p className="mb-6" style={{ color: '#555' }}>
        Manage your patient records
      </p>

      {/* Search and Filter + Buttons */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4 w-full">
        <div className="flex flex-col md:flex-row gap-2 md:w-1/2 w-full">
          {/* Search Input */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-auto"
            InputProps={{
              style: { color: colors.darkText },
            }}
          />

          {/* Filter Dropdown */}
          <FormControl
            size="small"
            style={{ minWidth: 120 }}
            className="mt-2 md:mt-0"
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ color: colors.darkText }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Admitted">Admitted</MenuItem>
              <MenuItem value="Discharged">Discharged</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Right side buttons */}
        <div className="flex flex-col items-end gap-3 md:w-auto w-full">
          {/* Add Patient button */}
          <div>
            <Button
              variant="contained"
              startIcon={<Add />}
              style={{ backgroundColor: colors.Blue, color: 'white' }}
              onClick={openAddDialog}
            >
              Add Patient
            </Button>
          </div>

          {/* Buttons group below Add Patient */}
          <div className="flex gap-2 flex-wrap justify-end">
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => alert('Filter already available above!')}
              style={{ borderColor: colors.midBlack, color: colors.midBlack }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
              style={{ borderColor: colors.midBlack, color: colors.midBlack }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<Upload />}
              onClick={handleImportClick}
              style={{ borderColor: colors.midBlack, color: colors.midBlack }}
            >
              Import
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept=".csv,text/csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Patients Table */}
      <Card
        sx={{ borderRadius: 2, overflowX: 'auto', boxShadow: 3 }}
        style={{ backgroundColor: colors.white }}
      >
        <CardContent>
          <table className="w-full border-collapse" style={{ minWidth: 650 }}>
            <thead>
              <tr
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                }}
              >
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No patients found.
                  </td>
                </tr>
              )}
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-[#dbeeff]"
                  style={{ borderBottom: '1px solid #ccc' }}
                >
                  <td className="p-3">{patient.id}</td>
                  <td className="p-3">{patient.name}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">
                    <span
                      style={{
                        color:
                          patient.status === 'Admitted'
                            ? colors.successGreen
                            : colors.accentOrange,
                        fontWeight: '600',
                      }}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-3">{patient.email}</td>
                  <td className="p-3">{patient.phone}</td>
                  <td className="p-3">
                    <IconButton
                      size="small"
                      onClick={() => alert('More actions coming soon!')}
                      aria-label="actions"
                    >
                      <MoreVert />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Patient Dialog */}
      <Dialog open={addDialogOpen} onClose={closeAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Patient ID"
            type="number"
            fullWidth
            margin="dense"
            value={newPatient.id}
            onChange={(e) =>
              setNewPatient({ ...newPatient, id: e.target.value })
            }
            required
          />
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
            required
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={newPatient.gender}
              label="Gender"
              onChange={(e) =>
                setNewPatient({ ...newPatient, gender: e.target.value })
              }
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Age"
            type="number"
            fullWidth
            margin="dense"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
            required
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel>Status</InputLabel>
            <Select
              value={newPatient.status}
              label="Status"
              onChange={(e) =>
                setNewPatient({ ...newPatient, status: e.target.value })
              }
            >
              <MenuItem value="Admitted">Admitted</MenuItem>
              <MenuItem value="Discharged">Discharged</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            value={newPatient.email}
            onChange={(e) =>
              setNewPatient({ ...newPatient, email: e.target.value })
            }
          />
          <TextField
            label="Phone"
            type="tel"
            fullWidth
            margin="dense"
            value={newPatient.phone}
            onChange={(e) =>
              setNewPatient({ ...newPatient, phone: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button
            onClick={handleAddPatient}
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
