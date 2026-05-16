import dayjs from 'dayjs';

export const MOCK_SCHOOLS = [
  { id: 'sch-1', name: 'Accra Academy', city: 'Accra', region: 'Greater Accra', students: 1200 },
  { id: 'sch-2', name: 'Prempeh College', city: 'Kumasi', region: 'Ashanti', students: 1500 },
  { id: 'sch-3', name: 'Wesley Girl\'s High', city: 'Cape Coast', region: 'Central', students: 1100 },
];

export const MOCK_STUDENTS = [
  {
    id: 'std-1',
    full_name: 'Kwame Mensah',
    admission_id: 'AC/2024/001',
    class: 'Form 2',
    stream: 'Science A',
    status: 'active',
    attendance: '95%',
    fees_paid: 'GHS 1,200',
    fees_due: 'GHS 300',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame',
  },
  {
    id: 'std-2',
    full_name: 'Abena Osei',
    admission_id: 'AC/2024/045',
    class: 'Form 3',
    stream: 'General Arts',
    status: 'active',
    attendance: '92%',
    fees_paid: 'GHS 1,500',
    fees_due: 'GHS 0',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abena',
  },
  {
    id: 'std-3',
    full_name: 'Ekow Baidoo',
    admission_id: 'AC/2024/112',
    class: 'Form 1',
    stream: 'Business',
    status: 'warning',
    attendance: '78%',
    fees_paid: 'GHS 500',
    fees_due: 'GHS 1,000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ekow',
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'nt-1',
    title: 'PTA Meeting Reminder',
    content: 'Annual PTA meeting is scheduled for Saturday, 20th May at the School Assembly Hall.',
    type: 'announcement',
    created_at: dayjs().subtract(2, 'hours').toISOString(),
  },
  {
    id: 'nt-2',
    title: 'MoMo Payment Successful',
    content: 'Payment of GHS 1,200 from 0244123456 has been reconciled.',
    type: 'payment',
    created_at: dayjs().subtract(5, 'hours').toISOString(),
  },
  {
    id: 'nt-3',
    title: 'Mid-Term Results Uploaded',
    content: 'Form 2 General Arts results are now available for review.',
    type: 'academic',
    created_at: dayjs().subtract(1, 'day').toISOString(),
  },
];

export const MOCK_STATS = [
  { label: 'Total Students', value: '2,450', trend: '+12%', color: 'primary' },
  { label: 'Attendance Today', value: '94.2%', trend: '-2%', color: 'success' },
  { label: 'Fees Collected', value: 'GHS 142k', trend: '+8%', color: 'accent' },
  { label: 'Staff Present', value: '42/45', trend: '0%', color: 'secondary' },
];

export const MOCK_FEES = [
  { id: 'fee-1', student: 'Kwame Mensah', type: 'Tuition', amount: 1500, status: 'partial', due_date: '2026-06-30' },
  { id: 'fee-2', student: 'Abena Osei', type: 'Tuition', amount: 1500, status: 'paid', due_date: '2026-06-30' },
  { id: 'fee-3', student: 'Ekow Baidoo', type: 'Tuition', amount: 1500, status: 'unpaid', due_date: '2026-06-30' },
];

export const MOCK_MODULES = [
  { id: 'm-academic', name: 'Academic Management', enabled: true, description: 'Classes, subjects, timetables, and grading.' },
  { id: 'm-students', name: 'Student Lifecycle', enabled: true, description: 'Admissions, profiles, promotions.' },
  { id: 'm-finance', name: 'Finance & Billing', enabled: true, description: 'Fees, invoices, payments, ledgers.' },
  { id: 'm-hr', name: 'HR & Payroll', enabled: false, description: 'Staff records, payroll, leave management.' },
  { id: 'm-communication', name: 'Communication', enabled: true, description: 'SMS, email, in-app notifications.' },
  { id: 'm-lms', name: 'Learning Management', enabled: false, description: 'Assignments, quizzes, LMS features.' },
  { id: 'm-transport', name: 'Transport', enabled: false, description: 'Bus routes, tracking, allocations.' },
  { id: 'm-hostel', name: 'Hostel', enabled: false, description: 'Room allocation, attendance.' },
  { id: 'm-library', name: 'Library', enabled: true, description: 'Catalog, issuance, returns.' },
  { id: 'm-analytics', name: 'Analytics & Reporting', enabled: true, description: 'Dashboards and exportable reports.' },
];

export const MOCK_PLANS = [
  { id: 'plan-basic', name: 'Basic', price: 'Free', features: ['Student management', 'Attendance', 'Basic reports'] },
  { id: 'plan-standard', name: 'Standard', price: 'GHS 199/mo', features: ['Finance', 'Payroll', 'LMS'] },
  { id: 'plan-enterprise', name: 'Enterprise', price: 'Contact us', features: ['API access', 'Multi-campus', 'Advanced analytics'] },
];

export const MOCK_USERS = [
  { id: 'u-1', full_name: 'Samuel Mensah', email: 'admin@accra.demo', role: 'school_admin' },
  { id: 'u-2', full_name: 'Ama Boateng', email: 'teacher@accra.demo', role: 'teacher' },
  { id: 'u-3', full_name: 'Kofi Adjei', email: 'parent@accra.demo', role: 'parent' },
  { id: 'u-4', full_name: 'Kwame Mensah', email: 'student@accra.demo', role: 'student' },
];

export const MOCK_FINANCE_SUMMARY = {
  total_revenue: 'GHS 1,420,000',
  outstanding: 'GHS 24,300',
  recent_transactions: [
    { id: 't-1', title: 'Tuition - Kwame Mensah', amount: 'GHS 1,200', date: '2026-05-12' },
    { id: 't-2', title: 'Tuition - Abena Osei', amount: 'GHS 1,500', date: '2026-05-11' },
  ],
};

export const MOCK_ACADEMIC = {
  levels: ['Preschool', 'Primary', 'JHS', 'SHS'],
  classes: [
    { id: 'cl-1', name: 'Form 1', students: 120 },
    { id: 'cl-2', name: 'Form 2', students: 110 },
  ],
};

export const MOCK_REPORTS = [
  { id: 'r-1', name: 'Attendance Summary', generated: '2026-05-14' },
  { id: 'r-2', name: 'Revenue by Month', generated: '2026-05-10' },
];

export const MOCK_PENDING_SCHOOLS = [
  { id: 'ps-1', name: 'Sunrise Prep', city: 'Kumasi', region: 'Ashanti', submitted_at: '2026-05-10', contact: 'info@sunriseprep.edu' },
  { id: 'ps-2', name: 'Greenfield Academy', city: 'Tema', region: 'Greater Accra', submitted_at: '2026-05-12', contact: 'hello@greenfield.edu' },
];

export const MOCK_TICKETS = [
  { id: 't-1', title: 'Billing discrepancy - Prempeh College', status: 'open', created_at: '2026-05-11', priority: 'high' },
  { id: 't-2', title: 'Forgot password - user', status: 'resolved', created_at: '2026-05-09', priority: 'low' },
];

export const PLATFORM_STATS = {
  total_schools: 3,
  pending_schools: 2,
  active_users: 4523,
  storage_used_gb: 120.5,
  monthly_revenue: 'GHS 12,400',
};

export const MOCK_CAMPUSES = [
  { id: 'camp-1', name: 'Main Campus', address: '123 Accra Rd', capacity: 2000 },
  { id: 'camp-2', name: 'City Campus', address: '45 Market St', capacity: 800 },
];

export const MOCK_STAFF = [
  { id: 'staff-1', full_name: 'Dr. Kwesi Appiah', role: 'Principal', department: 'Administration' },
  { id: 'staff-2', full_name: 'Mrs. Akosua Owusu', role: 'Head of Science', department: 'Science' },
  { id: 'staff-3', full_name: 'Mr. Kojo Mensah', role: 'Accountant', department: 'Finance' },
];

export const MOCK_ADMISSIONS = [
  { id: 'adm-1', name: 'Yaw Kumi', applied_for: 'Form 1', submitted_at: '2026-05-10', status: 'pending' },
  { id: 'adm-2', name: 'Esi Baah', applied_for: 'Form 2', submitted_at: '2026-05-08', status: 'review' },
];

export const MOCK_ASSIGNMENTS = [
  { id: 'a-1', title: 'Math Homework 1', class: 'Form 2', due_date: '2026-05-20', submitted_by: [] },
  { id: 'a-2', title: 'Science Lab Report', class: 'Form 2', due_date: '2026-05-25', submitted_by: [] },
];

export const MOCK_TIMETABLE = [
  { day: 'Monday', periods: ['Math', 'English', 'Physics', 'Break', 'History'] },
  { day: 'Tuesday', periods: ['Biology', 'Chemistry', 'PE', 'Break', 'Geography'] },
  { day: 'Wednesday', periods: ['Math', 'ICT', 'English', 'Break', 'Economics'] },
];
