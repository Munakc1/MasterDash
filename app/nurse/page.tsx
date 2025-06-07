"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import anime from "animejs";

interface Nurse {
  name: string;
  specialty: string;
  department: string;
  experience: number;
  shift: string;
  contact: string;
  status: "Active" | "On Leave";
  certifications?: string;
  ratings?: number;
}

const initialNurses: Nurse[] = [
  {
    name: "Maya Singh",
    specialty: "Pediatric Nurse",
    department: "Pediatrics",
    experience: 8,
    shift: "Day Shift (8am - 4pm)",
    contact: "maya.singh@example.com",
    status: "Active",
    certifications: "BSc Nursing",
    ratings: 4,
  },
  {
    name: "Ram Khatri",
    specialty: "ICU Nurse",
    department: "Intensive Care",
    experience: 12,
    shift: "Night Shift (10pm - 6am)",
    contact: "ram.khatri@example.com",
    status: "On Leave",
    certifications: "Critical Care Certification",
    ratings: 5,
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Active":
      return { color: "#4C956C", fontWeight: "bold" };
    case "On Leave":
      return { color: "#F4A261", fontWeight: "bold" };
    default:
      return { color: "#777" };
  }
};

const NursePage = () => {
  const [nurses, setNurses] = useState<Nurse[]>(initialNurses);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "On Leave">(
    "All"
  );
  const [open, setOpen] = useState(false);

  const [newNurse, setNewNurse] = useState<Partial<Nurse>>({
    name: "",
    specialty: "",
    department: "",
    experience: 0,
    shift: "",
    contact: "",
    status: "Active",
    certifications: "",
    ratings: 0,
  });

  const addBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!addBtnRef.current) return;

    const animation = anime({
      targets: addBtnRef.current,
      scale: 1.1,
      duration: 300,
      easing: "easeInOutSine",
      autoplay: false,
    });

    const handleMouseEnter = () => animation.play();
    const handleMouseLeave = () => animation.reverse();

    addBtnRef.current.addEventListener("mouseenter", handleMouseEnter);
    addBtnRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (addBtnRef.current) {
        addBtnRef.current.removeEventListener("mouseenter", handleMouseEnter);
        addBtnRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const filteredNurses = useMemo(() => {
    return nurses.filter((nurse) => {
      const matchesSearch =
        nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nurse.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nurse.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || nurse.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, nurses]);

  const handleInputChange = (field: keyof Nurse, value: any) => {
    setNewNurse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNurse = () => {
    if (
      !newNurse.name ||
      !newNurse.specialty ||
      !newNurse.department ||
      !newNurse.shift ||
      !newNurse.contact ||
      newNurse.experience === undefined ||
      !newNurse.status
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      newNurse.ratings !== undefined &&
      (newNurse.ratings < 0 || newNurse.ratings > 5)
    ) {
      alert("Ratings must be between 0 and 5");
      return;
    }

    setNurses((prev) => [...prev, newNurse as Nurse]);
    setOpen(false);

    setNewNurse({
      name: "",
      specialty: "",
      department: "",
      experience: 0,
      shift: "",
      contact: "",
      status: "Active",
      certifications: "",
      ratings: 0,
    });
  };

  return (
    <Box p={6} maxWidth="1200px" margin="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h1 style={{ color: "#0077B6", fontWeight: "bold", fontSize: "2rem" }}>
          Nurses
        </h1>
        <Button
          ref={addBtnRef}
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#0077B6",
            "&:hover": { backgroundColor: "#005f8a" },
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: "0 4px 8px rgba(0, 119, 182, 0.4)",
          }}
        >
          Add Nurse
        </Button>
      </Box>

      {/* Search & Filter */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mb={4}
        alignItems="center"
      >
        <TextField
          label="Search by name, specialty, or department"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) =>
              setStatusFilter(e.target.value as "All" | "Active" | "On Leave")
            }
          >
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <Box
        sx={{
          overflowX: "auto",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          bgcolor: "#CAF0F8",
        }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: "#0077B6" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Specialty</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Experience</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Shift</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Certifications</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ratings</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNurses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  No nurses found.
                </TableCell>
              </TableRow>
            ) : (
              filteredNurses.map((nurse, idx) => (
                <TableRow
                  key={idx}
                  hover
                  sx={{ bgcolor: idx % 2 === 0 ? "white" : "#e6f2fa" }}
                >
                  <TableCell>{nurse.name}</TableCell>
                  <TableCell>{nurse.specialty}</TableCell>
                  <TableCell>{nurse.department}</TableCell>
                  <TableCell>{nurse.experience} yrs</TableCell>
                  <TableCell>{nurse.shift}</TableCell>
                  <TableCell>
                    <a href={`mailto:${nurse.contact}`} style={{ color: "#0077B6" }}>
                      {nurse.contact}
                    </a>
                  </TableCell>
                  <TableCell>{nurse.certifications || "-"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.3}>
                      {[...Array(5)].map((_, i) =>
                        i < (nurse.ratings || 0) ? (
                          <StarIcon key={i} sx={{ color: "#F4A261", fontSize: 20 }} />
                        ) : (
                          <StarBorderIcon key={i} sx={{ color: "#F4A261", fontSize: 20 }} />
                        )
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={statusColor(nurse.status)}>{nurse.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Add Nurse Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Add New Nurse
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            fullWidth
            value={newNurse.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextField
            label="Specialty"
            fullWidth
            value={newNurse.specialty}
            onChange={(e) => handleInputChange("specialty", e.target.value)}
          />
          <TextField
            label="Department"
            fullWidth
            value={newNurse.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
          />
          <TextField
            label="Experience (years)"
            type="number"
            fullWidth
            value={newNurse.experience}
            onChange={(e) => handleInputChange("experience", Number(e.target.value))}
          />
          <TextField
            label="Shift"
            fullWidth
            value={newNurse.shift}
            onChange={(e) => handleInputChange("shift", e.target.value)}
          />
          <TextField
            label="Contact (email)"
            type="email"
            fullWidth
            value={newNurse.contact}
            onChange={(e) => handleInputChange("contact", e.target.value)}
          />
          <TextField
            label="Certifications"
            fullWidth
            value={newNurse.certifications}
            onChange={(e) => handleInputChange("certifications", e.target.value)}
          />
          <TextField
            label="Ratings (0 to 5)"
            type="number"
            inputProps={{ min: 0, max: 5 }}
            fullWidth
            value={newNurse.ratings}
            onChange={(e) => handleInputChange("ratings", Number(e.target.value))}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newNurse.status}
              label="Status"
              onChange={(e) =>
                handleInputChange("status", e.target.value as Nurse["status"])
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddNurse}>
            Add Nurse
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NursePage;
