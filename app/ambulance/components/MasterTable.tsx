'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

// Styled cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ambulanceRows = [
  {
    id: 'AMB-001',
    driver: 'Rajesh Thapa',
    location: 'Kathmandu',
    status: 'Available',
    lastDispatch: '2025-06-04 14:30',
    eta: '-',
    emergencyType: '-',
  },
  {
    id: 'AMB-002',
    driver: 'Sita Gurung',
    location: 'Lalitpur',
    status: 'On Trip',
    lastDispatch: '2025-06-05 09:20',
    eta: '10 mins',
    emergencyType: 'Accident',
  },
  {
    id: 'AMB-003',
    driver: 'Dipak Rana',
    location: 'Bhaktapur',
    status: 'Maintenance',
    lastDispatch: '2025-05-30 18:00',
    eta: '-',
    emergencyType: '-',
  },
  {
    id: 'AMB-004',
    driver: 'Kumar Sharma',
    location: 'Pokhara',
    status: 'Available',
    lastDispatch: '2025-06-01 11:15',
    eta: '-',
    emergencyType: '-',
  },
  {
    id: 'AMB-005',
    driver: 'Anita Rai',
    location: 'Biratnagar',
    status: 'On Trip',
    lastDispatch: '2025-06-05 12:40',
    eta: '15 mins',
    emergencyType: 'Medical Emergency',
  },
  {
    id: 'AMB-006',
    driver: 'Bikram Joshi',
    location: 'Chitwan',
    status: 'Available',
    lastDispatch: '2025-06-03 16:00',
    eta: '-',
    emergencyType: '-',
  },
  {
    id: 'AMB-007',
    driver: 'Sunita Lama',
    location: 'Dharan',
    status: 'Maintenance',
    lastDispatch: '2025-05-28 09:30',
    eta: '-',
    emergencyType: '-',
  },
  {
    id: 'AMB-008',
    driver: 'Rajiv Thapa',
    location: 'Kathmandu',
    status: 'On Trip',
    lastDispatch: '2025-06-05 10:50',
    eta: '8 mins',
    emergencyType: 'Fire Accident',
  },
  {
    id: 'AMB-009',
    driver: 'Maya Gurung',
    location: 'Lalitpur',
    status: 'Available',
    lastDispatch: '2025-06-02 13:20',
    eta: '-',
    emergencyType: '-',
  },
  {
    id: 'AMB-010',
    driver: 'Prakash Rai',
    location: 'Bhaktapur',
    status: 'Available',
    lastDispatch: '2025-06-04 15:45',
    eta: '-',
    emergencyType: '-',
  },
];

export default function AmbulanceTable() {
  const [dispatchOpen, setDispatchOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = React.useState(null);

  const handleDispatchClick = (ambulance: any) => {
    setSelectedAmbulance(ambulance);
    setDispatchOpen(true);
  };

  const handleDetailsClick = (ambulance: any) => {
    setSelectedAmbulance(ambulance);
    setDetailsOpen(true);
  };

  const handleCloseDispatch = () => setDispatchOpen(false);
  const handleCloseDetails = () => setDetailsOpen(false);

  const handleConfirmDispatch = () => {
    alert(`Ambulance ${selectedAmbulance.id} dispatched!`);
    setDispatchOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '1rem' }}>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          overflowX: 'auto',
          backgroundColor: 'white',
        }}
      >
        <Table
          sx={{
            width: '100%',
            minWidth: 650,
            tableLayout: 'auto',
            backgroundColor: 'white',
          }}
          aria-label="ambulance service table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Ambulance ID</StyledTableCell>
              <StyledTableCell>Driver Name</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Last Dispatch</StyledTableCell>
              <StyledTableCell>ETA to Hospital</StyledTableCell>
              <StyledTableCell>Emergency Type</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ambulanceRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.driver}</StyledTableCell>
                <StyledTableCell>{row.location}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>{row.lastDispatch}</StyledTableCell>
                <StyledTableCell>{row.eta}</StyledTableCell>
                <StyledTableCell>{row.emergencyType}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleDispatchClick(row)}
                  >
                    Dispatch
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleDetailsClick(row)}
                  >
                    Details
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dispatch Confirmation Dialog */}
      <Dialog open={dispatchOpen} onClose={handleCloseDispatch}>
        <DialogTitle>Confirm Dispatch</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to dispatch ambulance{' '}
            <strong>{selectedAmbulance?.id}</strong> driven by{' '}
            <strong>{selectedAmbulance?.driver}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDispatch}>Cancel</Button>
          <Button onClick={handleConfirmDispatch} color="success" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Ambulance Details - {selectedAmbulance?.id}</DialogTitle>
        <DialogContent dividers>
          {selectedAmbulance ? (
            <>
              <Typography><strong>Driver:</strong> {selectedAmbulance.driver}</Typography>
              <Typography><strong>Location:</strong> {selectedAmbulance.location}</Typography>
              <Typography><strong>Status:</strong> {selectedAmbulance.status}</Typography>
              <Typography><strong>Last Dispatch:</strong> {selectedAmbulance.lastDispatch}</Typography>
              <Typography><strong>ETA:</strong> {selectedAmbulance.eta}</Typography>
              <Typography><strong>Emergency Type:</strong> {selectedAmbulance.emergencyType}</Typography>
            </>
          ) : (
            <Typography>No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
