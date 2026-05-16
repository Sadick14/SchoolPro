import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Download,
  GraduationCap,
  Landmark,
  MessageSquare,
  School,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Table from '../components/common/Table';
import { MOCK_NOTIFICATIONS, MOCK_STATS, MOCK_STUDENTS } from '../lib/mockData';
import { useAuth } from '../lib/auth';

type StatColor = 'primary' | 'success' | 'accent' | 'secondary';

interface AdmissionRow {
  id: string;
  full_name: string;
  admission_id: string;
  class: string;
  stream: string;
  status: string;
  attendance: string;
  fees_paid: string;
  fees_due: string;
  avatar: string;
}

const statColor = (color: string): StatColor => {
  if (color === 'success' || color === 'accent' || color === 'secondary') {
    return color;
  }

  return 'primary';
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const admissions = useMemo(() => MOCK_STUDENTS as AdmissionRow[], []);
  const firstName = user?.full_name.split(' ')[0] ?? 'there';

  const attendanceHealth = [
    { label: 'Present', value: '2,309', tone: 'bg-emerald-500', percent: '94%' },
    { label: 'Late', value: '84', tone: 'bg-amber-500', percent: '3%' },
    { label: 'Absent', value: '57', tone: 'bg-red-500', percent: '3%' },
  ];

  const financeCards = [
    { label: 'Collected this term', value: 'GHS 142,000' },
    { label: 'Outstanding balance', value: 'GHS 24,300' },
    { label: 'Scholarships applied', value: 'GHS 8,700' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-72 animate-pulse rounded-[2rem] bg-gray-200" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-36 animate-pulse rounded-3xl bg-gray-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <div className="h-96 animate-pulse rounded-3xl bg-gray-200 xl:col-span-2" />
          <div className="h-96 animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 p-8 shadow-2xl">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 grid gap-8 xl:grid-cols-[1.5fr_1fr] xl:items-end">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-100">
              <School size={14} /> Live school operations
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl">
              Welcome back, <span className="text-amber-300">{firstName}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-300">
              A professional command view of enrolment, attendance, collections, notices, and regulator-ready school operations for today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button icon={<Wallet size={18} />}>Open MoMo reconciliation</Button>
              <Button variant="glass" icon={<Download size={18} />}>Export daily report</Button>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {financeCards.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-xl font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {MOCK_STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={
              stat.label.includes('Students') ? <Users size={20} /> :
              stat.label.includes('Attendance') ? <CalendarCheck size={20} /> :
              stat.label.includes('Fees') ? <Wallet size={20} /> : <School size={20} />
            }
            color={statColor(stat.color)}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.55fr_0.95fr]">
        <Table<AdmissionRow>
          title="Recent admissions"
          subtitle="Clean operational table with student, academic, attendance, and fee context."
          actions={<Button variant="outline" size="sm" icon={<ArrowUpRight size={16} />}>View all students</Button>}
          columns={[
            {
              header: 'Student',
              width: '34%',
              accessor: (student) => (
                <div className="flex items-center gap-3">
                  <img src={student.avatar} className="h-11 w-11 rounded-2xl border border-gray-200 bg-gray-50" alt="" />
                  <div>
                    <div className="font-black text-gray-900">{student.full_name}</div>
                    <div className="text-xs font-bold text-gray-400">{student.admission_id}</div>
                  </div>
                </div>
              ),
            },
            {
              header: 'Programme',
              accessor: (student) => (
                <div>
                  <div className="font-black text-gray-800">{student.class}</div>
                  <div className="text-xs font-bold text-gray-400">{student.stream}</div>
                </div>
              ),
            },
            {
              header: 'Attendance',
              accessor: (student) => (
                <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                  {student.attendance}
                </div>
              ),
              align: 'center',
            },
            {
              header: 'Fee balance',
              accessor: (student) => (
                <div className="text-right">
                  <div className="font-black text-gray-900">{student.fees_due}</div>
                  <div className="text-xs font-bold text-gray-400">Paid {student.fees_paid}</div>
                </div>
              ),
              align: 'right',
            },
            {
              header: 'Status',
              accessor: (student) => (
                <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ${
                  student.status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : 'bg-amber-50 text-amber-700 ring-amber-100'
                }`}>
                  {student.status}
                </span>
              ),
              align: 'right',
            },
          ]}
          data={admissions}
          keyExtractor={(student) => student.id}
        />

        <div className="space-y-8">
          <Card title="Attendance health" variant="solid">
            <div className="space-y-5">
              {attendanceHealth.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm font-black text-gray-800">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className={`h-2 rounded-full ${item.tone}`} style={{ width: item.percent }} />
                  </div>
                </div>
              ))}
              <div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-gray-600">
                Today's school-wide attendance is above the weekly benchmark. Continue monitoring late arrivals before first period.
              </div>
            </div>
          </Card>

          <Card title="GES report readiness" variant="solid">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="font-black text-gray-900">Final validation in progress</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                  Attendance, enrolment, finance, and academic summaries are ready for regulator-friendly export.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <Card title="Operational notices" className="xl:col-span-2" variant="solid">
          <div className="grid gap-4 md:grid-cols-3">
            {MOCK_NOTIFICATIONS.map((note) => (
              <div key={note.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5 transition hover:bg-white hover:shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`rounded-2xl p-2 ${
                    note.type === 'payment' ? 'bg-emerald-100 text-emerald-700' :
                    note.type === 'academic' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <MessageSquare size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Today</span>
                </div>
                <h3 className="font-black text-gray-900">{note.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-gray-600">{note.content}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Academic pulse" variant="solid">
          <div className="space-y-4">
            {[
              { icon: <GraduationCap size={18} />, title: 'Mid-term marks', detail: '82% submitted by teachers' },
              { icon: <Clock3 size={18} />, title: 'Timetable coverage', detail: '14 classes fully assigned' },
              { icon: <Landmark size={18} />, title: 'Finance close', detail: 'Daily cashbook pending approval' },
              { icon: <TrendingUp size={18} />, title: 'Performance trend', detail: 'Science stream improved by 6%' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="rounded-xl bg-white p-2 text-primary-600 shadow-sm">{item.icon}</div>
                <div>
                  <p className="font-black text-gray-900">{item.title}</p>
                  <p className="text-sm font-medium text-gray-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
