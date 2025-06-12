'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaUserMd, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { MdAdd, MdFileUpload, MdDownload, MdFilterList } from 'react-icons/md';
import { fetchWithFallback } from '../../lib/apiClient'; // Adjust path as needed

interface DoctorApiResponse {
  _id?: string;
  doctorId: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  phone: string;
  email: string;
  profilePhoto?: string;
  password?: string;
  mbbsCertificate?: string;
  pgCertificate?: string;
  registrationNumber?: string;
  medicalCouncil?: string;
  state?: string;
  yearsOfExperience: number;
  specializations: string[];
  languagesSpoken?: string[];
  clinicName: string;
  workingDays?: string[];
  availableTimeSlots?: Array<{ 
    start: string; 
    end: string; 
    _id?: string; 
  }>;
  appointmentModes?: string[];
  address: {
    street?: string;
    city?: string;
    pinCode?: string;
    geoLocation?: string | number[];
  };
  consultationFees: {
    inClinic: number;
    online: number;
  };
  documents?: {
    aadhaar?: string;
    pan?: string;
    gstNumber?: string;
    digitalSignature?: string;
  };
  upiId?: string;
  status: string;
  holidayMode?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface DoctorCard {
  id: string;
  fullName: string;
  profilePhoto: string;
  yearsOfExperience: number;
  clinicName: string;
  phone: string;
  email: string;
  status: string;
  specializations: string[];
  city: string;
  registrationNumber: string;
  consultationFees: {
    inClinic: number;
    online: number;
  };
}

const transformDoctorData = (doctors: DoctorApiResponse[]): DoctorCard[] =>
  doctors.map((d) => ({
    id: d.doctorId || d._id || `missing-id-${Math.random()}`,
    fullName: d.fullName,
    profilePhoto: d.profilePhoto || '/placeholder.jpg',
    yearsOfExperience: d.yearsOfExperience ?? 0,
    clinicName: d.clinicName ?? '—',
    phone: d.phone ?? '—',
    email: d.email ?? '—',
    status: d.status?.toLowerCase() ?? 'unknown',
    specializations: d.specializations ?? [],
    city: d.address?.city ?? '—',
    registrationNumber: d.registrationNumber ?? '—',
    consultationFees: {
      inClinic: d.consultationFees?.inClinic ?? 0,
      online: d.consultationFees?.online ?? 0,
    },
  }));

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState<DoctorCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    yearsOfExperience: '',
    clinicName: '',
    phone: '',
    email: '',
    status: 'active',
    specializations: '',
    city: '',
    registrationNumber: '',
    inClinicFees: '',
    onlineFees: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const doctorData = await fetchWithFallback<DoctorApiResponse[]>(
          'https://api.caresewa.in/api/doctors',
          'doctor'
        );
        
        setDoctors(transformDoctorData(doctorData));
      } catch (err) {
        console.error('Failed to load doctors', err);
        setError('Unable to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  const handleExport = (type: 'csv' | 'json' | 'pdf') => {
    const dataToExport = visibleDoctors.map(doc => ({
      Name: doc.fullName,
      Specializations: doc.specializations.join(', '),
      Experience: `${doc.yearsOfExperience} years`,
      Clinic: doc.clinicName,
      City: doc.city,
      Phone: doc.phone,
      Email: doc.email,
      Status: doc.status,
      'Registration Number': doc.registrationNumber,
      'In-Clinic Fees': `₹${doc.consultationFees.inClinic}`,
      'Online Fees': `₹${doc.consultationFees.online}`
    }));

    if (type === 'csv') {
      const csv = [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `doctors_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'json') {
      const json = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `doctors_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
      console.log('PDF export would require additional library like jsPDF');
      // Implement PDF export logic here
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            if (file.name.endsWith('.json')) {
              const importedData = JSON.parse(content);
              // Process imported JSON data
              console.log('Imported JSON data:', importedData);
            } else if (file.name.endsWith('.csv')) {
              // Process CSV data
              console.log('Imported CSV data:', content);
            }
          } catch (err) {
            console.error('Error importing file:', err);
            alert('Error importing file. Please check the format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleAddDoctor = () => {
    if (!formData.fullName.trim()) {
      alert('Please enter a full name');
      return;
    }
    
    const newDoctor: DoctorCard = {
      id: `new-${Date.now()}`,
      fullName: formData.fullName,
      profilePhoto: '/placeholder.jpg',
      yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
      clinicName: formData.clinicName,
      phone: formData.phone,
      email: formData.email,
      status: formData.status,
      specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
      city: formData.city,
      registrationNumber: formData.registrationNumber,
      consultationFees: {
        inClinic: parseInt(formData.inClinicFees) || 0,
        online: parseInt(formData.onlineFees) || 0,
      },
    };
    
    setDoctors([...doctors, newDoctor]);
    setFormData({
      fullName: '',
      yearsOfExperience: '',
      clinicName: '',
      phone: '',
      email: '',
      status: 'active',
      specializations: '',
      city: '',
      registrationNumber: '',
      inClinicFees: '',
      onlineFees: ''
    });
    setShowAddForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const visibleDoctors = doctors.filter((doc) => {
    const q = search.toLowerCase();
    const matchesSearch =
      doc.fullName.toLowerCase().includes(q) ||
      doc.specializations.some((s) => s.toLowerCase().includes(q)) ||
      doc.clinicName.toLowerCase().includes(q) ||
      doc.city.toLowerCase().includes(q);
    const matchesSpec =
      specializationFilter === 'all' ||
      doc.specializations.includes(specializationFilter);
    return matchesSearch && matchesSpec;
  });

  const allSpecializations = Array.from(
    new Set(doctors.flatMap((d) => d.specializations))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-gray-600 mt-1">Manage and view all registered doctors</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <MdAdd className="mr-1" /> Add Doctor
            </Button>
            <Button 
              onClick={handleImport}
              variant="outline"
              className="border-gray-300"
            >
              <MdFileUpload className="mr-1" /> Import
            </Button>
            <Button 
              onClick={() => handleExport('csv')}
              variant="outline"
              className="border-gray-300"
            >
              <MdDownload className="mr-1" /> Export CSV
            </Button>
            <Button 
              onClick={() => handleExport('json')}
              variant="outline"
              className="border-gray-300"
            >
              <MdDownload className="mr-1" /> Export JSON
            </Button>
            <Button 
              onClick={() => handleExport('pdf')}
              variant="outline"
              className="border-gray-300"
            >
              <MdDownload className="mr-1" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, specialization, clinic, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Specializations</option>
                {allSpecializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading doctors...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specializations
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clinic & Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fees
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visibleDoctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUserMd className="text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.fullName}</div>
                            <div className="text-sm text-gray-500">{doc.registrationNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {doc.specializations.map((spec, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.yearsOfExperience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{doc.clinicName}</div>
                        <div className="text-gray-500">{doc.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{doc.phone}</div>
                        <div className="text-gray-500">{doc.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>In-Clinic: ₹{doc.consultationFees.inClinic}</div>
                        <div className="text-gray-500">Online: ₹{doc.consultationFees.online}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          doc.status === 'verified' || doc.status === 'active'
                            ? 'bg-green-100 text-green-800' 
                            : doc.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50 transition-colors">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visibleDoctors.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        No doctors found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {visibleDoctors.length} of {doctors.length} doctors
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Doctor</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <Input
                    name="yearsOfExperience"
                    type="number"
                    min="0"
                    value={formData.yearsOfExperience}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clinic Name
                  </label>
                  <Input
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="City Health Center"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <Input
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MC123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="doctor@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      In-Clinic Fees (₹)
                    </label>
                    <Input
                      name="inClinicFees"
                      type="number"
                      min="0"
                      value={formData.inClinicFees}
                      onChange={handleFormChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Online Fees (₹)
                    </label>
                    <Input
                      name="onlineFees"
                      type="number"
                      min="0"
                      value={formData.onlineFees}
                      onChange={handleFormChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specializations
                  </label>
                  <Input
                    name="specializations"
                    value={formData.specializations}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Cardiology, Internal Medicine (comma separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple specializations with commas</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddDoctor}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Doctor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;