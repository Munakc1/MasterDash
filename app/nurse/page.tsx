'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaUserNurse, FaEdit, FaTrash, FaTimes, FaStar } from 'react-icons/fa';
import { MdAdd, MdFileUpload, MdDownload, MdFilterList, MdLocationOn } from 'react-icons/md';
import { fetchWithFallback } from '../../lib/apiClient'; 

interface NurseApiResponse {
  _id?: string;
  nurseId?: string;
  patientId?: string;
  fullName?: string;
  profilePhoto?: string;
  experience?: number;
  ratePerHour?: number;
  specialty?: string;
  rating?: number;
  languagesSpoken?: string[];
  location?: {
    street?: string;
    city?: string;
    pinCode?: string;
  };
  availability?: {
    days?: string[];
    time?: string;
  };
  duration?: string;
  startDate?: string;
  status?: string;
  hiringId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface NurseCard {
  id: string;
  fullName: string;
  profilePhoto: string;
  experience: number;
  ratePerHour: number;
  specialty: string;
  rating: number;
  languagesSpoken: string[];
  location: string;
  availability: string;
  status: string;
  duration: string;
  hiringId: string;
}

const transformNurseData = (rows: NurseApiResponse[]): NurseCard[] =>
  rows.map((n, i) => ({
    id: n.nurseId || n._id || `missing-id-${i}`,
    fullName: n.fullName || '—',
    profilePhoto: n.profilePhoto || '/placeholder.jpg',
    experience: n.experience ?? 0,
    ratePerHour: n.ratePerHour ?? 0,
    specialty: n.specialty ?? '—',
    rating: n.rating ?? 0,
    languagesSpoken: n.languagesSpoken ?? [],
    location: n.location ? `${n.location.city}, ${n.location.pinCode}` : '—',
    availability: n.availability ? `${n.availability.days?.join(', ')} (${n.availability.time})` : '—',
    status: (n.status ?? 'Unknown').toLowerCase(),
    duration: n.duration ?? '—',
    hiringId: n.hiringId ?? '—',
  }));

const NurseDetails = () => {
  const [nurses, setNurses] = useState<NurseCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    experience: '',
    ratePerHour: '',
    specialty: '',
    rating: '',
    languagesSpoken: '',
    city: '',
    pinCode: '',
    availabilityDays: '',
    availabilityTime: '',
    duration: 'weekly',
    status: 'pending'
  });

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const nurseData = await fetchWithFallback<NurseApiResponse[]>(
          'https://api.caresewa.in/api/nurse',
          'nurse'
        );
        
        setNurses(transformNurseData(nurseData));
      } catch (err) {
        console.error('Failed to load nurses', err);
        setError('Unable to load nurses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNurses();
  }, []);

  const handleExport = (type: 'csv' | 'json' | 'pdf') => {
    const dataToExport = visibleNurses.map(nurse => ({
      Name: nurse.fullName,
      Specialty: nurse.specialty,
      Experience: `${nurse.experience} years`,
      'Rate/Hour': `₹${nurse.ratePerHour}`,
      Rating: nurse.rating,
      Languages: nurse.languagesSpoken.join(', '),
      Location: nurse.location,
      Availability: nurse.availability,
      Duration: nurse.duration,
      Status: nurse.status,
      'Hiring ID': nurse.hiringId
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
      a.download = `nurses_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === 'json') {
      const json = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nurses_${new Date().toISOString().split('T')[0]}.json`;
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

  const handleAddNurse = () => {
    if (!formData.fullName.trim()) {
      alert('Please enter a full name');
      return;
    }
    const newNurse: NurseCard = {
      id: `new-${Date.now()}`,
      fullName: formData.fullName,
      profilePhoto: '/placeholder.jpg',
      experience: parseInt(formData.experience) || 0,
      ratePerHour: parseInt(formData.ratePerHour) || 0,
      specialty: formData.specialty,
      rating: parseFloat(formData.rating) || 0,
      languagesSpoken: formData.languagesSpoken.split(',').map(s => s.trim()).filter(s => s),
      location: formData.city && formData.pinCode ? `${formData.city}, ${formData.pinCode}` : '—',
      availability: formData.availabilityDays && formData.availabilityTime ? `${formData.availabilityDays} (${formData.availabilityTime})` : '—',
      duration: formData.duration,
      status: formData.status,
      hiringId: `hiring-${Date.now()}`
    };
    
    setNurses([...nurses, newNurse]);
    setFormData({
      fullName: '',
      experience: '',
      ratePerHour: '',
      specialty: '',
      rating: '',
      languagesSpoken: '',
      city: '',
      pinCode: '',
      availabilityDays: '',
      availabilityTime: '',
      duration: 'weekly',
      status: 'pending'
    });
    setShowAddForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const visibleNurses = nurses.filter((nurse) => {
    const q = search.toLowerCase();
    const matchesSearch =
      nurse.fullName.toLowerCase().includes(q) ||
      nurse.specialty.toLowerCase().includes(q) ||
      nurse.languagesSpoken.some((lang) => lang.toLowerCase().includes(q)) ||
      nurse.location.toLowerCase().includes(q);
    const matchesSpec =
      specialtyFilter === 'all' ||
      nurse.specialty === specialtyFilter;
    return matchesSearch && matchesSpec;
  });

  const allSpecialties = Array.from(
    new Set(nurses.map((n) => n.specialty).filter(s => s !== '—'))
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nurse Management</h1>
            <p className="text-gray-600 mt-1">Manage and view all registered nurses</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <MdAdd className="mr-1" /> Add Nurse
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
                placeholder="Search by name, specialty, language, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((spec) => (
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
              <p className="mt-2 text-gray-600">Loading nurses...</p>
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
                      Nurse
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate/Hour
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Languages
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
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
                  {visibleNurses.map((nurse) => (
                    <tr key={nurse.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <FaUserNurse className="text-green-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{nurse.fullName}</div>
                            <div className="text-sm text-gray-500">{nurse.experience} years exp.</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {nurse.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {nurse.experience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{nurse.ratePerHour}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {nurse.rating > 0 ? renderStars(nurse.rating) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {nurse.languagesSpoken.length > 0 ? nurse.languagesSpoken.map((lang, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {lang}
                            </span>
                          )) : '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <MdLocationOn className="text-gray-400 mr-1" />
                          {nurse.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {nurse.duration}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          nurse.status === 'confirmed'
                            ? 'bg-green-100 text-green-800' 
                            : nurse.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {nurse.status}
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
                  {visibleNurses.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                        No nurses found matching your criteria.
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
          Showing {visibleNurses.length} of {nurses.length} nurses
        </div>
      </div>

      {/* Add Nurse Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Nurse</h2>
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
                    placeholder="Anita Sharma"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (years)
                    </label>
                    <Input
                      name="experience"
                      type="number"
                      min="0"
                      value={formData.experience}
                      onChange={handleFormChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rate per Hour (₹)
                    </label>
                    <Input
                      name="ratePerHour"
                      type="number"
                      min="0"
                      value={formData.ratePerHour}
                      onChange={handleFormChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <Input
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Elderly Care"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (0-5)
                  </label>
                  <Input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="4.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Languages Spoken
                  </label>
                  <Input
                    name="languagesSpoken"
                    value={formData.languagesSpoken}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="English, Hindi (comma separated)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                      Pin Code
                    </label>
                    <Input
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleFormChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability Days
                  </label>
                  <Input
                    name="availabilityDays"
                    value={formData.availabilityDays}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Monday, Wednesday, Friday"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability Time
                  </label>
                  <Input
                    name="availabilityTime"
                    value={formData.availabilityTime}
                    onChange={handleFormChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="08:00-18:00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
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
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
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
                    onClick={handleAddNurse}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Nurse
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

export default NurseDetails;