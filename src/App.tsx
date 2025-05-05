import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeacherAttendance from './pages/attendance/TeacherAttendance';
import { useAuth } from './lib/auth';

function App() {
  const { initialized } = useAuth();

  useEffect(() => {
    // Set the page title
    document.title = 'School Management System';
  }, []);

  // Show a loading state until auth is initialized
  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
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
        {/* Add more routes for other pages */}
        <Route path="schools" element={<div>Schools Management (Coming Soon)</div>} />
        <Route path="users" element={<div>Users Management (Coming Soon)</div>} />
        <Route path="students" element={<div>Students Management (Coming Soon)</div>} />
        <Route path="classes" element={<div>Classes Management (Coming Soon)</div>} />
        <Route path="assessments" element={<div>Assessments (Coming Soon)</div>} />
        <Route path="fees" element={<div>Fees Management (Coming Soon)</div>} />
        <Route path="notifications" element={<div>Notifications (Coming Soon)</div>} />
        <Route path="profile" element={<div>User Profile (Coming Soon)</div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;