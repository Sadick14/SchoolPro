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

import Button from '@/shared/components/common/Button';
import Card from '@/shared/components/common/Card';
import StatCard from '@/shared/components/common/StatCard';
import Table from '@/shared/components/common/Table';

import { useAuth } from '@/shared/lib/auth';

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

interface AcademicPulseItem {
  title: string;
  detail: string;
  icon: React.ReactNode;
}

interface Notification {
  id: string;
  title: string;
  content: string;
}

interface FinanceCard {
  label: string;
  value: string;
}

interface AttendanceHealthItem {
  label: string;
  value: string;
  tone: string;
  percent: string;
}

const statColor = (color?: string): StatColor => {
  if (color === 'success' || color === 'accent' || color === 'secondary') {
    return color;
  }
  return 'primary';
};

const fallbackOverview = {
  finance: {
    today: 'GH₵0',
    outstanding: 'GH₵0',
    bank: 'GH₵0',
    collected: 'GH₵0',
    scholarships: '0',
  },
  attendance: {
    present: '0',
    late: '0',
    absent: '0',
    presentRate: '0%',
    lateRate: '0%',
    absentRate: '0%',
  },
  stats: [] as Array<{ label: string; value: string; trend?: string; type?: string; color?: string }>,
  academicPulse: [] as AcademicPulseItem[],
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  // 🔥 MULTI-TENANT CONTEXT
  const schoolId = user?.school_id;
  const role = user?.role;

  const overview = fallbackOverview;
  const overviewLoading = false;
  const admissions: AdmissionRow[] = [];
  const notifications: Notification[] = [];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const firstName = user?.full_name?.split(' ')[0] ?? 'there';

  // 🔥 ROLE-BASED FINANCE VIEW
  const financeCards = useMemo(() => {
    if (!overview) return [];

    if (role && String(role).toLowerCase() === 'accountant') {
      return [
        { label: 'Today Collections', value: overview.finance.today },
        { label: 'Outstanding', value: overview.finance.outstanding },
        { label: 'Bank Balance', value: overview.finance.bank },
      ];
    }

    return [
      { label: 'Collected this term', value: overview.finance.collected },
      { label: 'Outstanding balance', value: overview.finance.outstanding },
      { label: 'Scholarships applied', value: overview.finance.scholarships },
    ];
  }, [overview, role]);

  const attendanceHealth = useMemo(() => {
    if (!overview) return [];

    return [
      {
        label: 'Present',
        value: overview.attendance.present,
        tone: 'bg-emerald-500',
        percent: overview.attendance.presentRate,
      },
      {
        label: 'Late',
        value: overview.attendance.late,
        tone: 'bg-amber-500',
        percent: overview.attendance.lateRate,
      },
      {
        label: 'Absent',
        value: overview.attendance.absent,
        tone: 'bg-red-500',
        percent: overview.attendance.absentRate,
      },
    ];
  }, [overview]);

  if (loading || overviewLoading) {
    return (
      <div className="space-y-8">
        <div className="h-72 animate-pulse rounded-[2rem] bg-gray-200" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-3xl bg-gray-200" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-3xl bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">

      {/* ================= HERO ================= */}
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-blue-600">{firstName}</span>
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Multi-tenant operational dashboard for academic, finance, attendance, and compliance management.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button icon={<Wallet size={16} />}>
                MoMo reconciliation
              </Button>

              <Button variant="outline" icon={<Download size={16} />}>
                Export report
              </Button>
            </div>
          </div>

          {/* FINANCE SNAPSHOT */}
          <div className="grid grid-cols-3 gap-3">
            {financeCards.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {overview.stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={
              stat.type === 'students'
                ? <Users size={20} />
                : stat.type === 'attendance'
                ? <CalendarCheck size={20} />
                : stat.type === 'finance'
                ? <Wallet size={20} />
                : <School size={20} />
            }
            color={statColor(stat.color)}
          />
        ))}
      </section>

      {/* ================= TABLE + SIDEBAR ================= */}
      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.55fr_0.95fr]">

        <Table<AdmissionRow>
          title="Recent admissions"
          subtitle="Live tenant-scoped student intake records"
          data={admissions}
          keyExtractor={(s) => s.id}
          actions={
            <Button variant="outline" size="sm" icon={<ArrowUpRight size={16} />}>
              View all
            </Button>
          }
          columns={[
            {
              header: 'Student',
              accessor: (s) => (
                <div className="flex items-center gap-3">
                  <img src={s.avatar} className="h-11 w-11 rounded-2xl" />
                  <div>
                    <div className="font-black">{s.full_name}</div>
                    <div className="text-xs text-gray-400">{s.admission_id}</div>
                  </div>
                </div>
              ),
            },
            {
              header: 'Class',
              accessor: (s) => (
                <div>
                  <div className="font-black">{s.class}</div>
                  <div className="text-xs text-gray-400">{s.stream}</div>
                </div>
              ),
            },
            {
              header: 'Attendance',
              accessor: (s) => (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                  {s.attendance}
                </span>
              ),
              align: 'center',
            },
            {
              header: 'Fees',
              accessor: (s) => (
                <div className="text-right">
                  <div className="font-black">{s.fees_due}</div>
                  <div className="text-xs text-gray-400">
                    Paid {s.fees_paid}
                  </div>
                </div>
              ),
              align: 'right',
            },
            {
              header: 'Status',
              accessor: (s) => (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                  {s.status}
                </span>
              ),
              align: 'right',
            },
          ]}
        />

        {/* SIDEBAR */}
        <div className="space-y-8">

          <Card title="Attendance health" variant="solid">
            {attendanceHealth.map((item) => (
              <div key={item.label} className="mb-4">
                <div className="flex justify-between text-sm font-black">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-2 rounded bg-gray-100">
                  <div
                    className={`h-2 rounded ${item.tone}`}
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </Card>

          <Card title="System status" variant="solid">
            <div className="flex gap-4">
              <CheckCircle2 className="text-emerald-600" />
              <div>
                <p className="font-black">All systems operational</p>
                <p className="text-sm text-gray-500">
                  Finance, attendance, and academic modules synced.
                </p>
              </div>
            </div>
          </Card>

        </div>
      </section>

      {/* ================= NOTIFICATIONS ================= */}
      <section className="grid xl:grid-cols-3 gap-8">

        <Card title="Notifications" className="xl:col-span-2">
          <div className="grid gap-4 md:grid-cols-3">
            {notifications.map((note: Notification) => (
              <div key={note.id} className="rounded-2xl bg-gray-50 p-4">
                <div className="flex justify-between">
                  <MessageSquare size={16} />
                  <span className="text-[10px] text-gray-400">Today</span>
                </div>
                <p className="mt-2 font-black">{note.title}</p>
                <p className="text-sm text-gray-500">{note.content}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Academic pulse">
          <div className="space-y-4">
            {overview.academicPulse.map((item: AcademicPulseItem) => (
              <div key={item.title} className="flex gap-3">
                <div>{item.icon}</div>
                <div>
                  <p className="font-black">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.detail}</p>
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