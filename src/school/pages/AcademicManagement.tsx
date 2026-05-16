import React, { useMemo, useState } from 'react';
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  GraduationCap,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Button from '@/shared/components/common/Button';
import Card from '@/shared/components/common/Card';

type TermStatus = 'completed' | 'active' | 'planned';

type AcademicTerm = {
  id: string;
  name: string;
  semester: string;
  starts: string;
  ends: string;
  status: TermStatus;
  attendanceLinked: boolean;
  timetableLinked: boolean;
  resultsReady: boolean;
};

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'event' | 'assessment' | 'deadline';
};

type PromotionRule = {
  id: string;
  label: string;
  value: string;
};

const initialTerms: AcademicTerm[] = [
  {
    id: 'term-1',
    name: 'Term 1',
    semester: 'Semester 1',
    starts: '2026-09-07',
    ends: '2026-12-18',
    status: 'active',
    attendanceLinked: true,
    timetableLinked: true,
    resultsReady: false,
  },
  {
    id: 'term-2',
    name: 'Term 2',
    semester: 'Semester 2',
    starts: '2027-01-11',
    ends: '2027-04-16',
    status: 'planned',
    attendanceLinked: false,
    timetableLinked: false,
    resultsReady: false,
  },
  {
    id: 'term-3',
    name: 'Term 3',
    semester: 'Semester 2',
    starts: '2027-05-04',
    ends: '2027-07-30',
    status: 'planned',
    attendanceLinked: false,
    timetableLinked: false,
    resultsReady: false,
  },
];

const calendarEvents: CalendarEvent[] = [
  { id: 'holiday-1', title: 'Founders Day break', date: '2026-09-21', type: 'holiday' },
  { id: 'assessment-1', title: 'Mid-term assessment window', date: '2026-10-19', type: 'assessment' },
  { id: 'event-1', title: 'Inter-house sports', date: '2026-11-13', type: 'event' },
  { id: 'deadline-1', title: 'Term 1 results approval', date: '2026-12-21', type: 'deadline' },
];

const promotionRules: PromotionRule[] = [
  { id: 'average', label: 'Minimum yearly average', value: '50%' },
  { id: 'attendance', label: 'Attendance requirement', value: '80%' },
  { id: 'core-subjects', label: 'Core subjects required', value: 'English, Maths, Science' },
  { id: 'approval', label: 'Final approval', value: 'Head teacher + Academic board' },
];

const sessionFlow = [
  'Create academic year',
  'Add semesters and terms',
  'Activate current term',
  'Align timetables and attendance',
  'Generate results per term',
  'Execute promotion rules at year end',
];

const AcademicManagement: React.FC = () => {
  const [academicYear, setAcademicYear] = useState('2026 / 2027');
  const [terms, setTerms] = useState<AcademicTerm[]>(initialTerms);
  const activeTerm = terms.find((term) => term.status === 'active') ?? terms[0];

  const sessionHealth = useMemo(() => {
    const linkedItems = terms.reduce((total, term) => {
      return total + Number(term.attendanceLinked) + Number(term.timetableLinked) + Number(term.resultsReady);
    }, 0);
    return Math.round((linkedItems / (terms.length * 3)) * 100);
  }, [terms]);

  const activateTerm = (termId: string) => {
    setTerms((current) => current.map((term) => ({
      ...term,
      status: term.id === termId ? 'active' : term.status === 'completed' ? 'completed' : 'planned',
      attendanceLinked: term.id === termId ? true : term.attendanceLinked,
      timetableLinked: term.id === termId ? true : term.timetableLinked,
    })));
  };

  const markResultsReady = (termId: string) => {
    setTerms((current) => current.map((term) => (
      term.id === termId ? { ...term, resultsReady: true, status: 'completed' } : term
    )));
  };

  const addTerm = () => {
    const nextTermNumber = terms.length + 1;
    setTerms((current) => [
      ...current,
      {
        id: `term-${nextTermNumber}`,
        name: `Term ${nextTermNumber}`,
        semester: nextTermNumber <= 2 ? 'Semester 1' : 'Semester 2',
        starts: '2027-08-10',
        ends: '2027-10-30',
        status: 'planned',
        attendanceLinked: false,
        timetableLinked: false,
        resultsReady: false,
      },
    ]);
  };

  return (
    <div className="space-y-6 pb-10">
      <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.35fr_0.65fr] lg:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-indigo-700">
              <BookOpenCheck size={14} />
              Academic Management Module 6.1
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 lg:text-4xl">
              Academic Session Management
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
              Create the academic year, manage semesters and terms, activate the current term, publish holidays/events,
              and prepare promotion rules that run at year end.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button icon={<Plus size={16} />} onClick={addTerm}>Add term</Button>
              <Button variant="outline" icon={<RefreshCw size={16} />} onClick={() => activateTerm(activeTerm.id)}>
                Re-sync active term
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-950 p-5 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Active session</p>
            <label className="mt-4 block">
              <span className="text-xs font-semibold text-gray-300">Academic year</span>
              <input
                value={academicYear}
                onChange={(event) => setAcademicYear(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xl font-black text-white outline-none focus:border-indigo-300"
              />
            </label>
            <div className="mt-4 rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-300">Current term</p>
              <p className="mt-1 text-2xl font-black">{activeTerm.name}</p>
              <p className="mt-1 text-sm text-gray-300">{activeTerm.starts} → {activeTerm.ends}</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-300">
                <span>Alignment health</span>
                <span>{sessionHealth}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" style={{ width: `${sessionHealth}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {sessionFlow.map((step, index) => (
          <div key={step} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-700">{index + 1}</div>
            <p className="mt-3 text-sm font-black text-gray-900">{step}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card title="Semesters & Terms" className="rounded-3xl">
          <div className="space-y-3">
            {terms.map((term) => (
              <div key={term.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-black text-gray-900">{term.name}</h2>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-gray-600">{term.semester}</span>
                      <TermStatusBadge status={term.status} />
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays size={15} />
                      {term.starts} to {term.ends}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" disabled={term.status === 'active'} onClick={() => activateTerm(term.id)}>
                      Activate term
                    </Button>
                    <Button size="sm" variant="glass" disabled={term.resultsReady} onClick={() => markResultsReady(term.id)}>
                      Generate results
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <AlignmentChip label="Timetable aligned" ready={term.timetableLinked} icon={<Clock3 size={15} />} />
                  <AlignmentChip label="Attendance aligned" ready={term.attendanceLinked} icon={<ClipboardList size={15} />} />
                  <AlignmentChip label="Results generated" ready={term.resultsReady} icon={<GraduationCap size={15} />} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Academic Calendar" className="rounded-3xl">
            <div className="space-y-3">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex gap-3 rounded-2xl bg-gray-50 p-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <CalendarDays size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-black text-gray-900">{event.title}</p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-gray-500">{event.date} · {event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Promotion Settings" className="rounded-3xl">
            <div className="space-y-3">
              {promotionRules.map((rule) => (
                <div key={rule.id} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{rule.label}</p>
                  <p className="mt-1 text-sm font-black text-gray-900">{rule.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

interface TermStatusBadgeProps {
  status: TermStatus;
}

const TermStatusBadge: React.FC<TermStatusBadgeProps> = ({ status }) => {
  const styles: Record<TermStatus, string> = {
    completed: 'bg-green-100 text-green-700',
    active: 'bg-indigo-100 text-indigo-700',
    planned: 'bg-amber-100 text-amber-700',
  };

  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

interface AlignmentChipProps {
  label: string;
  ready: boolean;
  icon: React.ReactNode;
}

const AlignmentChip: React.FC<AlignmentChipProps> = ({ label, ready, icon }) => (
  <div className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${ready ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
    {ready ? <CheckCircle2 size={15} /> : icon}
    <span>{label}</span>
    {ready && <Sparkles size={14} className="ml-auto" />}
    {!ready && <ShieldCheck size={14} className="ml-auto" />}
  </div>
);

export default AcademicManagement;
