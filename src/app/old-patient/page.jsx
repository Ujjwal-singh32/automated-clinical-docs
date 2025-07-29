"use client";
import React, { useState } from 'react';
import { Search, User, FileText, Calendar, Stethoscope, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
const PatientPortal = () => {
  const [patientId, setPatientId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock patient data - in real app this would come from API/database
  const mockPatients = {
    'P001': {
      id: 'P001',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91 98765 43210',
      address: '123 Main Street, Mumbai, Maharashtra',
      reports: [
        {
          id: 'R001',
          date: '2024-01-15',
          doctor: 'Dr. Priya Sharma',
          diagnosis: 'Hypertension',
          symptoms: ['High blood pressure', 'Headache', 'Dizziness'],
          prescription: ['Amlodipine 5mg', 'Losartan 50mg'],
          status: 'Completed'
        },
        {
          id: 'R002',
          date: '2024-02-20',
          doctor: 'Dr. Amit Patel',
          diagnosis: 'Diabetes Type 2',
          symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue'],
          prescription: ['Metformin 500mg', 'Glimepiride 1mg'],
          status: 'Completed'
        },
        {
          id: 'R003',
          date: '2024-03-10',
          doctor: 'Dr. Priya Sharma',
          diagnosis: 'Follow-up Consultation',
          symptoms: ['Stable condition'],
          prescription: ['Continue current medication'],
          status: 'Completed'
        }
      ]
    },
    'P002': {
      id: 'P002',
      name: 'Sunita Devi',
      age: 32,
      gender: 'Female',
      phone: '+91 87654 32109',
      address: '456 Park Avenue, Delhi, Delhi',
      reports: [
        {
          id: 'R004',
          date: '2024-01-20',
          doctor: 'Dr. Rajesh Singh',
          diagnosis: 'Pregnancy Checkup',
          symptoms: ['Morning sickness', 'Fatigue'],
          prescription: ['Folic acid', 'Iron supplements'],
          status: 'Completed'
        }
      ]
    }
  };

  const handleSearch = async () => {
    if (!patientId.trim()) {
      setError('Please enter a Patient ID');
      return;
    }

    setIsSearching(true);
    setError('');
    setPatientData(null);
    setSelectedDate(null);

    // Simulate API call delay
    setTimeout(() => {
      const patient = mockPatients[patientId.toUpperCase()];
      if (patient) {
        setPatientData(patient);
      } else {
        setError('Patient not found. Please check the Patient ID.');
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const downloadReport = (report) => {
    // In real app, this would generate and download PDF
    alert(`Downloading report ${report.id} for ${patientData.name}`);
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hasReportOnDate = (date) => {
    if (!patientData) return false;
    const dateStr = formatDate(date);
    console.log('Checking date:', dateStr, 'Available dates:', patientData.reports.map(r => r.date));
    return patientData.reports.some(report => report.date === dateStr);
  };

  const getReportsForDate = (date) => {
    if (!patientData) return [];
    const dateStr = formatDate(date);
    console.log('Filtering for date:', dateStr);
    const filtered = patientData.reports.filter(report => report.date === dateStr);
    console.log('Found reports:', filtered);
    return filtered;
  };

  const handleDateClick = (date) => {
    const dateStr = formatDate(date);
    console.log('Date clicked:', dateStr);
    if (hasReportOnDate(date)) {
      console.log('Setting selected date:', dateStr);
      setSelectedDate(dateStr);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const hasReport = hasReportOnDate(date);
      const isSelected = selectedDate === formatDate(date);
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`h-12 w-full flex items-center justify-center rounded-lg transition-colors ${
            hasReport
              ? isSelected
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium'
              : 'text-gray-400 hover:bg-gray-100'
          }`}
          disabled={!hasReport}
        >
          {day}
          {hasReport && (
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-1"></div>
          )}
        </button>
      );
    }

    return days;
  };

  const filteredReports = selectedDate 
    ? getReportsForDate(new Date(selectedDate))
    : patientData?.reports || [];

  console.log('Selected date:', selectedDate);
  console.log('Filtered reports:', filteredReports);

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm px-6 py-8 mt-8 sm:mt-12 mb-10 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Patient Portal</h1>
            </div>
            <p className="text-gray-600 text-lg">Search and view patient medical reports</p>
          </div>
        </section>


        {/* Search Section */}
        <Card className="p-8 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter Patient ID (e.g., P001, P002)"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                {error}
              </div>
            )}
          </div>
        </Card>

        {/* Patient Information */}
        {patientData && (
          <div className="space-y-6">
            {/* Patient Details Card */}
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{patientData.name}</h2>
                  <div className="space-y-2 text-blue-100">
                    <p><strong>Patient ID:</strong> {patientData.id}</p>
                    <p><strong>Age:</strong> {patientData.age} years</p>
                    <p><strong>Gender:</strong> {patientData.gender}</p>
                  </div>
                </div>
                <div className="space-y-2 text-blue-100">
                  <p><strong>Phone:</strong> {patientData.phone}</p>
                  <p><strong>Address:</strong> {patientData.address}</p>
                  <p><strong>Total Reports:</strong> {patientData.reports.length}</p>
                </div>
              </div>
            </Card>

            {/* Calendar and Reports Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <Card className="p-6 bg-white border-0 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Calendar View</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium text-gray-600">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-100 rounded"></div>
                      <span>Has Report</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-600 rounded"></div>
                      <span>Selected</span>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Selected: {new Date(selectedDate).toLocaleDateString('en-IN')}
                      </p>
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="text-xs text-blue-600 hover:underline mt-1"
                      >
                        Show all reports
                      </button>
                    </div>
                  )}
                </Card>
              </div>

              {/* Reports Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-gray-700" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedDate ? `Reports for ${new Date(selectedDate).toLocaleDateString('en-IN')}` : 'All Medical Reports'}
                  </h3>
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredReports.length} reports
                  </Badge>
                </div>

                {filteredReports.length > 0 ? (
                  <div className="grid gap-6">
                    {filteredReports.map((report, index) => (
                      <Card key={report.id} className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Stethoscope className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">Report #{report.id}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(report.date).toLocaleDateString('en-IN')}
                                </div>
                                <span>•</span>
                                <span>{report.doctor}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              {report.status}
                            </Badge>
                            <button
                              onClick={() => downloadReport(report)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Download Report"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Diagnosis */}
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Diagnosis
                            </h5>
                            <p className="text-gray-800">{report.diagnosis}</p>
                          </div>

                          {/* Symptoms */}
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Symptoms
                            </h5>
                            <ul className="space-y-1">
                              {report.symptoms.map((symptom, idx) => (
                                <li key={idx} className="text-gray-800 text-sm">• {symptom}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Prescription */}
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Prescription
                            </h5>
                            <ul className="space-y-1">
                              {report.prescription.map((med, idx) => (
                                <li key={idx} className="text-gray-800 text-sm">• {med}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center bg-white border-0 shadow-lg">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {selectedDate ? 'No reports for selected date' : 'No reports available'}
                    </h3>
                    <p className="text-gray-600">
                      {selectedDate 
                        ? 'This patient has no medical reports on the selected date.'
                        : 'This patient has no medical reports yet.'
                      }
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!patientData && !isSearching && !error && (
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Search for Patient Reports</h3>
            <p className="text-gray-600">Enter a Patient ID to view their medical history and reports</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Try: P001, P002</p>
            </div>
          </Card>
        )}
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default PatientPortal;
