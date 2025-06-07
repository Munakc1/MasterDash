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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import anime from "animejs";

interface Doctor {
  name: string;
  specialty: string;
  department: string;
  experience: number;
  availability: string;
  contact: string;
  ratings: number;
  status: "Active" | "On Leave";
}

const initialDoctors: Doctor[] = [
  {
    name: "Dr. Anita Sharma",
    specialty: "Cardiologist",
    department: "Cardiology",
    experience: 10,
    availability: "Mon, Wed, Fri - 9am to 5pm",
    contact: "anita.sharma@example.com",
    ratings: 4,
    status: "Active",
  },
  {
    name: "Dr. Rahul Joshi",
    specialty: "Dermatologist",
    department: "Dermatology",
    experience: 7,
    availability: "Tue, Thu - 10am to 4pm",
    contact: "rahul.joshi@example.com",
    ratings: 5,
    status: "Active",
  },
  {
    name: "Dr. Sita Thapa",
    specialty: "Pediatrician",
    department: "Pediatrics",
    experience: 12,
    availability: "Mon-Fri - 8am to 3pm",
    contact: "sita.thapa@example.com",
    ratings: 4,
    status: "On Leave",
  },
  {
    name: "Dr. Bibek Karki",
    specialty: "Orthopedist",
    department: "Orthopedics",
    experience: 15,
    availability: "Wed, Fri - 9am to 2pm",
    contact: "bibek.karki@example.com",
    ratings: 3,
    status: "Active",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-600 font-semibold";
    case "On Leave":
      return "text-yellow-600 font-semibold";
    default:
      return "text-gray-600";
  }
};

const DoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: "",
    specialty: "",
    department: "",
    experience: 0,
    availability: "",
    contact: "",
    ratings: 0,
    status: "Active",
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

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || doc.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, doctors]);

  const handleInputChange = (field: keyof Doctor, value: any) => {
    setNewDoctor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddDoctor = () => {
    if (
      !newDoctor.name ||
      !newDoctor.specialty ||
      !newDoctor.department ||
      !newDoctor.availability ||
      !newDoctor.contact ||
      newDoctor.experience === undefined ||
      newDoctor.ratings === undefined ||
      !newDoctor.status
    ) {
      alert("Please fill all fields.");
      return;
    }

    setDoctors((prev) => [...prev, newDoctor as Doctor]);
    setOpen(false);

    setNewDoctor({
      name: "",
      specialty: "",
      department: "",
      experience: 0,
      availability: "",
      contact: "",
      ratings: 0,
      status: "Active",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0077B6]">Doctors</h1>
        <Button
          ref={addBtnRef}
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#0077B6",
            "&:hover": {
              backgroundColor: "#005f8a",
            },
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: "0 4px 8px rgba(0, 119, 182, 0.4)",
          }}
        >
          Add Doctor
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, specialty, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Doctor Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-[#CAF0F8] text-[#0077B6]">
            <tr>
              <th className="py-3 px-4 text-left">Doctor Name</th>
              <th className="py-3 px-4 text-left">Specialty</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Experience</th>
              <th className="py-3 px-4 text-left">Availability</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Ratings</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length === 0 && (
              <tr>
                <td colSpan={8} className="py-4 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
            {filteredDoctors.map((doc, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{doc.name}</td>
                <td className="py-3 px-4">{doc.specialty}</td>
                <td className="py-3 px-4">{doc.department}</td>
                <td className="py-3 px-4">{doc.experience} yrs</td>
                <td className="py-3 px-4">{doc.availability}</td>
                <td className="py-3 px-4">
                  <a href={`mailto:${doc.contact}`} className="text-blue-600 underline">
                    {doc.contact}
                  </a>
                </td>
                <td className="py-3 px-4 flex space-x-1">
                  {[...Array(5)].map((_, i) =>
                    i < doc.ratings ? (
                      <StarIcon key={i} className="text-yellow-500" fontSize="small" />
                    ) : (
                      <StarBorderIcon key={i} className="text-yellow-500" fontSize="small" />
                    )
                  )}
                </td>
                <td className={`py-3 px-4 ${statusColor(doc.status)}`}>{doc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Doctor Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle className="flex justify-between items-center">
          Add New Doctor
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Name"
            fullWidth
            value={newDoctor.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextField
            label="Specialty"
            fullWidth
            value={newDoctor.specialty}
            onChange={(e) => handleInputChange("specialty", e.target.value)}
          />
          <TextField
            label="Department"
            fullWidth
            value={newDoctor.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
          />
          <TextField
            label="Experience (years)"
            type="number"
            fullWidth
            value={newDoctor.experience}
            onChange={(e) => handleInputChange("experience", Number(e.target.value))}
          />
          <TextField
            label="Availability"
            fullWidth
            value={newDoctor.availability}
            onChange={(e) => handleInputChange("availability", e.target.value)}
          />
          <TextField
            label="Contact Email"
            type="email"
            fullWidth
            value={newDoctor.contact}
            onChange={(e) => handleInputChange("contact", e.target.value)}
          />
          <TextField
            label="Ratings (0-5)"
            type="number"
            inputProps={{ min: 0, max: 5 }}
            fullWidth
            value={newDoctor.ratings}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (val > 5) val = 5;
              if (val < 0) val = 0;
              handleInputChange("ratings", val);
            }}
          />
          <select
            value={newDoctor.status}
            onChange={(e) => handleInputChange("status", e.target.value as Doctor["status"])}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddDoctor} color="primary">
            Add Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorPage;
