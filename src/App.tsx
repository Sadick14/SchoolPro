import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeacherAttendance from './pages/attendance/TeacherAttendance';
import StudentsList from './pages/students/StudentsList';
import ClassesList from './pages/classes/ClassesList';
import FeesManagement from './pages/fees/FeesManagement';
import AssessmentsList from './pages/assessments/AssessmentsList';
import StaffDirectory from './pages/hr/StaffDirectory';
import HostelManagement from './pages/hostel/HostelManagement';
import TransportManagement from './pages/transport/TransportManagement';
import LibraryManagement from './pages/library/LibraryManagement';
import Notices from './pages/communication/Notices';

import { useAuth } from './lib/auth';

function App() {
  const { initialized } = useAuth();

  useEffect(() => {
    // Set the page title
    document.title = 'SchoolPro GH | Management System';
  }, []);

  // Show a loading state until auth is initialized
  if (!initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-bold uppercase tracking-widest text-[10px]">Loading SchoolPro GH...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="classes" element={<ClassesList />} />
        <Route path="fees" element={<FeesManagement />} />
        
        <Route path="assessments" element={<AssessmentsList />} />
        <Route path="hr" element={<StaffDirectory />} />
        <Route path="hostel" element={<HostelManagement />} />
        <Route path="transport" element={<TransportManagement />} />
        <Route path="library" element={<LibraryManagement />} />
        <Route path="notifications" element={<Notices />} />
        
        <Route path="schools" element={<div className="p-8"><h1 className="text-2xl font-bold">Schools Management (Coming Soon)</h1></div>} />
        <Route path="profile" element={<div className="p-8"><h1 className="text-2xl font-bold">User Profile (Coming Soon)</h1></div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;