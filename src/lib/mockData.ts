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
