import React, { useState, useEffect } from 'react';
import { Calendar, Check, X, AlertCircle, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { saveOfflineData, getOfflineData } from '../../lib/offlineSync';

interface Student {
  id: string;
  full_name: string;
  admission_id: string;
  status?: 'present' | 'absent' | 'late';
}

interface Section {
  id: string;
  name: string;
  class_id: string;
}

interface Class {
  id: string;
  name: string;
  sections: Section[];
}

const TeacherAttendance: React.FC = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch teacher's assigned classes
  useEffect(() => {
    if (!user) return;

    const fetchClasses = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if user is offline
        if (isOffline) {
          // Load from offline storage
          const offlineClasses = await getOfflineData<Class[]>('classes');
          const offlineSections = await getOfflineData<Section[]>('sections');
          
          if (Array.isArray(offlineClasses) && Array.isArray(offlineSections)) {
            const classesWithSections = offlineClasses.map(cls => ({
              ...cls,
              sections: offlineSections.filter(sec => sec.class_id === cls.id)
            }));
            setClasses(classesWithSections);
          }
        } else {
          // Fetch from Supabase
          // First, check if they're a class teacher
          const { data: sections } = await supabase
            .from('sections')
            .select('id, name, class_id')
            .eq('teacher_id', user.id);

          // Then, fetch classes they teach subjects in
          const { data: teacherSubjects } = await supabase
            .from('teacher_subjects')
            .select('class_id, section_id')
            .eq('teacher_id', user.id);

          // Get unique class IDs
          const classIds = new Set<string>();
          
          if (sections) {
            sections.forEach(section => classIds.add(section.class_id));
          }
          
          if (teacherSubjects) {
            teacherSubjects.forEach(ts => classIds.add(ts.class_id));
          }

          if (classIds.size > 0) {
            // Fetch class details
            const { data: classData } = await supabase
              .from('classes')
              .select('id, name')
              .in('id', Array.from(classIds));

            if (classData) {
              const { data: allSections } = await supabase
                .from('sections')
                .select('id, name, class_id')
                .in('class_id', Array.from(classIds));

              const classesWithSections = classData.map(cls => ({
                ...cls,
                sections: allSections?.filter(sec => sec.class_id === cls.id) || []
              }));

              setClasses(classesWithSections);
              
              // Store for offline use
              await saveOfflineData('classes', classData);
              if (allSections) {
                await saveOfflineData('sections', allSections);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to load classes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [user, isOffline]);

  const fetchStudents = async () => {
    if (!selectedClass || !selectedSection) return;
    
    setLoading(true);
    setError(null);
    setStudents([]);

    try {
      if (isOffline) {
        // Load from offline storage
        const offlineStudents = await getOfflineData<Student[]>('students');
        const offlineAttendance = await getOfflineData<any[]>('attendance');
        
        if (Array.isArray(offlineStudents)) {
          const filteredStudents = offlineStudents.filter(
            student => student.current_class_id === selectedClass && 
                       student.current_section_id === selectedSection
          );
          
          // Apply attendance status if available for the selected date
          if (Array.isArray(offlineAttendance)) {
            const attendanceForDate = offlineAttendance.filter(
              att => att.date === selectedDate && 
                     att.class_id === selectedClass && 
                     att.section_id === selectedSection
            );
            
            filteredStudents.forEach(student => {
              const attendance = attendanceForDate.find(att => att.student_id === student.id);
              if (attendance) {
                student.status = attendance.status;
              }
            });
          }
          
          setStudents(filteredStudents);
        }
      } else {
        // Fetch students from the selected class and section
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('id, full_name, admission_id')
          .eq('current_class_id', selectedClass)
          .eq('current_section_id', selectedSection);

        if (studentError) throw studentError;

        if (studentData) {
          // Check if attendance has already been marked for today
          const { data: attendanceData } = await supabase
            .from('attendance')
            .select('student_id, status')
            .eq('date', selectedDate)
            .eq('class_id', selectedClass)
            .eq('section_id', selectedSection);

          // Merge student data with attendance status
          const studentsWithStatus = studentData.map(student => {
            const attendance = attendanceData?.find(att => att.student_id === student.id);
            return {
              ...student,
              status: attendance?.status as 'present' | 'absent' | 'late' | undefined
            };
          });

          setStudents(studentsWithStatus);
          
          // Store for offline use
          await saveOfflineData('students', studentData);
          if (attendanceData) {
            await saveOfflineData('attendance', attendanceData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchStudents();
    }
  }, [selectedClass, selectedSection, selectedDate]);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleSaveAttendance = async () => {
    if (!user) return;
    
    setSuccess(null);
    setError(null);
    setSaveLoading(true);

    try {
      // Filter only students with status set
      const attendanceRecords = students
        .filter(student => student.status)
        .map(student => ({
          date: selectedDate,
          student_id: student.id,
          class_id: selectedClass,
          section_id: selectedSection,
          status: student.status,
          marked_by: user.id
        }));

      if (attendanceRecords.length === 0) {
        setError('No attendance records to save');
        setSaveLoading(false);
        return;
      }

      if (isOffline) {
        // Generate unique IDs for offline records
        const recordsWithIds = attendanceRecords.map(record => ({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          created_at: new Date().toISOString(),
          ...record
        }));
        
        // Save to offline storage
        for (const record of recordsWithIds) {
          await saveOfflineData('attendance', record);
        }
        
        setSuccess('Attendance saved offline. Will sync when back online.');
      } else {
        // First, delete any existing attendance records for this date, class, and section
        await supabase
          .from('attendance')
          .delete()
          .eq('date', selectedDate)
          .eq('class_id', selectedClass)
          .eq('section_id', selectedSection);

        // Then insert the new attendance records
        const { error: insertError } = await supabase
          .from('attendance')
          .insert(attendanceRecords);

        if (insertError) throw insertError;
        
        setSuccess('Attendance saved successfully');
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      setError('Failed to save attendance. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Attendance Management</h1>
      
      {isOffline && (
        <div className="mb-6 bg-warning-50 border border-warning-100 text-warning-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            You are currently offline. Attendance will be saved locally and synced when you reconnect.
          </p>
        </div>
      )}
      
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSection('');
              }}
              disabled={loading}
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass || loading}
            >
              <option value="">Select Section</option>
              {selectedClass && classes
                .find(cls => cls.id === selectedClass)
                ?.sections.map(section => (
                  <option key={section.id} value={section.id}>{section.name}</option>
                ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={fetchStudents}
              disabled={!selectedClass || !selectedSection || loading}
              isLoading={loading}
              icon={<Calendar size={16} />}
            >
              Load Students
            </Button>
          </div>
        </div>
      </Card>
      
      {error && (
        <div className="mb-6 bg-error-50 border border-error-100 text-error-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-success-50 border border-success-100 text-success-700 px-4 py-3 rounded-md flex items-start">
          <Check size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{success}</p>
        </div>
      )}
      
      {students.length > 0 && (
        <Card title="Mark Attendance" className="mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.admission_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`inline-flex items-center justify-center px-3 py-1 border ${
                            student.status === 'present'
                              ? 'bg-success-100 border-success-200 text-success-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } rounded-md text-xs font-medium focus:outline-none`}
                        >
                          <Check size={14} className="mr-1" />
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`inline-flex items-center justify-center px-3 py-1 border ${
                            student.status === 'absent'
                              ? 'bg-error-100 border-error-200 text-error-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } rounded-md text-xs font-medium focus:outline-none`}
                        >
                          <X size={14} className="mr-1" />
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`inline-flex items-center justify-center px-3 py-1 border ${
                            student.status === 'late'
                              ? 'bg-warning-100 border-warning-200 text-warning-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          } rounded-md text-xs font-medium focus:outline-none`}
                        >
                          <Clock size={14} className="mr-1" />
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSaveAttendance} 
              isLoading={saveLoading}
              disabled={saveLoading || students.filter(s => s.status).length === 0}
            >
              Save Attendance
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TeacherAttendance;