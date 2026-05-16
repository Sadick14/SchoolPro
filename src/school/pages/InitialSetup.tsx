import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  GraduationCap,
  Home,
  Landmark,
  ShieldCheck,
  UploadCloud,
  UserCog,
  Users,
} from 'lucide-react';
import Button from '@/shared/components/common/Button';
import Card from '@/shared/components/common/Card';

type SetupAreaId = 'academic' | 'staff' | 'students' | 'finance';

type SetupTask = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

type SetupArea = {
  id: SetupAreaId;
  title: string;
  subtitle: string;
  owner: string;
  accent: string;
  tasks: SetupTask[];
};

const setupAreas: SetupArea[] = [
  {
    id: 'academic',
    title: 'Academic Structure',
    subtitle: 'Create the operating calendar, class hierarchy, houses, and assessment rules before enrolment begins.',
    owner: 'Academic office',
    accent: 'from-blue-600 to-indigo-600',
    tasks: [
      { id: 'academic-year', label: 'Academic year', description: 'Set start/end dates and mark the active year.', icon: <CalendarDays size={18} /> },
      { id: 'terms', label: 'Terms / semesters', description: 'Define term names, reporting windows, and reopening dates.', icon: <BookOpen size={18} /> },
      { id: 'departments', label: 'Departments', description: 'Group academic and administrative teams for reporting.', icon: <Building2 size={18} /> },
      { id: 'classes', label: 'Classes', description: 'Create levels/forms such as KG, Primary, JHS, or SHS.', icon: <GraduationCap size={18} /> },
      { id: 'streams', label: 'Streams', description: 'Add arms like A, B, Science, Business, or boarding streams.', icon: <Users size={18} /> },
      { id: 'houses', label: 'Houses', description: 'Prepare houses for admissions, sports, and boarding allocation.', icon: <Home size={18} /> },
      { id: 'grading', label: 'Grading system', description: 'Configure grade bands, remarks, GPA points, and promotion rules.', icon: <Award size={18} /> },
    ],
  },
  {
    id: 'staff',
    title: 'Staff Setup',
    subtitle: 'Invite employees, assign roles, and lock down permissions before operational users receive access.',
    owner: 'School owner / HR',
    accent: 'from-emerald-600 to-teal-600',
    tasks: [
      { id: 'add-staff', label: 'Add staff manually', description: 'Create staff profiles for leadership, teachers, finance, and support teams.', icon: <UserCog size={18} /> },
      { id: 'bulk-staff', label: 'Bulk upload staff', description: 'Upload a CSV/XLSX staff register to speed up onboarding.', icon: <UploadCloud size={18} /> },
      { id: 'assign-roles', label: 'Assign roles', description: 'Map staff to school admin, teacher, accountant, registrar, and custom roles.', icon: <ShieldCheck size={18} /> },
      { id: 'assign-permissions', label: 'Assign permissions', description: 'Grant only the modules each role needs for daily work.', icon: <CheckCircle2 size={18} /> },
    ],
  },
  {
    id: 'students',
    title: 'Student Setup',
    subtitle: 'Load learners, place them into classes, and attach operational services such as houses and transport.',
    owner: 'Admissions office',
    accent: 'from-purple-600 to-fuchsia-600',
    tasks: [
      { id: 'import-students', label: 'Import students', description: 'Bring in continuing students or approved admissions with guardians.', icon: <UploadCloud size={18} /> },
      { id: 'assign-classes', label: 'Assign classes', description: 'Place students into the correct class, stream, and home room.', icon: <BookOpen size={18} /> },
      { id: 'student-ids', label: 'Generate student IDs', description: 'Create admission numbers or reusable QR/barcode identifiers.', icon: <CreditCard size={18} /> },
      { id: 'assign-houses', label: 'Assign houses', description: 'Balance house allocation for competitions and boarding life.', icon: <Home size={18} /> },
      { id: 'assign-transport', label: 'Assign transport', description: 'Attach routes, stops, fees, and pickup/drop-off contacts.', icon: <Landmark size={18} /> },
    ],
  },
  {
    id: 'finance',
    title: 'Finance Setup',
    subtitle: 'Publish fee structures, billing cycles, payment methods, scholarships, and penalty rules.',
    owner: 'Accounts office',
    accent: 'from-amber-500 to-orange-600',
    tasks: [
      { id: 'fees', label: 'Configure fees', description: 'Create tuition, PTA, boarding, transport, and one-time fee items.', icon: <Banknote size={18} /> },
      { id: 'billing-cycles', label: 'Configure billing cycles', description: 'Generate invoices by term, semester, month, or custom date range.', icon: <CalendarDays size={18} /> },
      { id: 'payment-gateways', label: 'Configure payment gateways', description: 'Enable MoMo, bank transfer, card, cash office, and reconciliation channels.', icon: <CreditCard size={18} /> },
      { id: 'scholarships', label: 'Configure scholarships', description: 'Set discounts, bursaries, and sponsorship caps by student or group.', icon: <Award size={18} /> },
      { id: 'penalties', label: 'Configure penalties', description: 'Automate late-payment fees, reminders, and exemption approvals.', icon: <ShieldCheck size={18} /> },
    ],
  },
];

const checklistSeed = setupAreas.reduce<Record<string, boolean>>((acc, area) => {
  area.tasks.forEach((task) => {
    acc[task.id] = false;
  });
  return acc;
}, {});

const InitialSetup: React.FC = () => {
  const [activeArea, setActiveArea] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({ ...checklistSeed });
  const [setupProfile, setSetupProfile] = useState({
    academicYear: '2026 / 2027',
    term: 'Term 1',
    studentIdPrefix: 'SPG',
    billingCycle: 'Termly',
    paymentGateway: 'MTN MoMo + Bank Transfer',
  });

  const totalTasks = setupAreas.reduce((sum, area) => sum + area.tasks.length, 0);
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);
  const currentArea = setupAreas[activeArea];
  const currentAreaComplete = currentArea.tasks.filter((task) => checkedTasks[task.id]).length;

  const nextAction = useMemo(() => {
    const pendingArea = setupAreas.find((area) => area.tasks.some((task) => !checkedTasks[task.id]));
    const pendingTask = pendingArea?.tasks.find((task) => !checkedTasks[task.id]);

    if (!pendingArea || !pendingTask) {
      return 'All setup sections are ready for owner review and activation.';
    }

    return `Continue with ${pendingArea.title}: ${pendingTask.label}.`;
  }, [checkedTasks]);

  const toggleTask = (taskId: string) => {
    setCheckedTasks((current) => ({ ...current, [taskId]: !current[taskId] }));
  };

  const completeCurrentArea = () => {
    setCheckedTasks((current) => {
      const next = { ...current };
      currentArea.tasks.forEach((task) => {
        next[task.id] = true;
      });
      return next;
    });
  };

  const updateProfile = (field: keyof typeof setupProfile, value: string) => {
    setSetupProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="space-y-6 pb-10">
      <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.35fr_0.65fr] lg:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
              <SchoolSetupIcon />
              Initial School Setup
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 lg:text-4xl">
              Configure the school administration foundation before go-live.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
              This guided owner flow turns the core setup plan into actionable checkpoints for academics, staff, students, and finance.
              Use it as a launch control room while each operational team prepares its data.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button icon={<ArrowRight size={16} />} onClick={() => setActiveArea(0)}>
                Start academic setup
              </Button>
              <Button variant="outline" icon={<CheckCircle2 size={16} />} onClick={completeCurrentArea}>
                Mark current section ready
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-950 p-5 text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Launch progress</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-5xl font-black">{progress}%</span>
              <span className="text-sm text-gray-300">{completedTasks}/{totalTasks} tasks</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-gray-200">{nextAction}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {setupAreas.map((area, index) => {
          const done = area.tasks.filter((task) => checkedTasks[task.id]).length;
          const isActive = index === activeArea;

          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveArea(index)}
              className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                isActive ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-200'
              }`}
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${area.accent} text-white`}>
                {index + 1}
              </div>
              <h2 className="text-base font-black text-gray-900">{area.title}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-500">{area.owner}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-gray-600">
                <span>{done}/{area.tasks.length} complete</span>
                <span>{Math.round((done / area.tasks.length) * 100)}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full rounded-full bg-gradient-to-r ${area.accent}`} style={{ width: `${(done / area.tasks.length) * 100}%` }} />
              </div>
            </button>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="rounded-3xl">
          <div className="mb-5 flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Step {activeArea + 1} of {setupAreas.length}</p>
              <h2 className="mt-1 text-2xl font-black text-gray-900">{currentArea.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">{currentArea.subtitle}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700">
              {currentAreaComplete}/{currentArea.tasks.length} ready
            </div>
          </div>

          <div className="space-y-3">
            {currentArea.tasks.map((task) => {
              const isChecked = checkedTasks[task.id];

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                    isChecked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/40'
                  }`}
                >
                  <span className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${isChecked ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {isChecked ? <CheckCircle2 size={20} /> : task.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-gray-900">{task.label}</span>
                    <span className="mt-1 block text-sm leading-5 text-gray-600">{task.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
            <Button
              variant="glass"
              icon={<ChevronLeft size={16} />}
              disabled={activeArea === 0}
              onClick={() => setActiveArea((step) => Math.max(0, step - 1))}
            >
              Previous
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={completeCurrentArea}>Complete section</Button>
              <Button
                icon={<ChevronRight size={16} />}
                disabled={activeArea === setupAreas.length - 1}
                onClick={() => setActiveArea((step) => Math.min(setupAreas.length - 1, step + 1))}
              >
                Next section
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Setup Defaults" className="rounded-3xl">
            <div className="space-y-4">
              <SetupField label="Academic year" value={setupProfile.academicYear} onChange={(value) => updateProfile('academicYear', value)} />
              <SetupField label="Opening term" value={setupProfile.term} onChange={(value) => updateProfile('term', value)} />
              <SetupField label="Student ID prefix" value={setupProfile.studentIdPrefix} onChange={(value) => updateProfile('studentIdPrefix', value)} />
              <SetupField label="Billing cycle" value={setupProfile.billingCycle} onChange={(value) => updateProfile('billingCycle', value)} />
              <SetupField label="Payment gateways" value={setupProfile.paymentGateway} onChange={(value) => updateProfile('paymentGateway', value)} />
            </div>
          </Card>

          <Card title="Activation Checklist" className="rounded-3xl">
            <div className="space-y-3 text-sm">
              {setupAreas.map((area) => {
                const done = area.tasks.every((task) => checkedTasks[task.id]);
                return (
                  <div key={area.id} className="flex items-center justify-between rounded-2xl bg-gray-50 px-3 py-2">
                    <span className="font-semibold text-gray-700">{area.title}</span>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest ${done ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {done ? 'Ready' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

interface SetupFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SetupField: React.FC<SetupFieldProps> = ({ label, value, onChange }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
    />
  </label>
);

const SchoolSetupIcon: React.FC = () => (
  <span className="relative flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
  </span>
);

export default InitialSetup;
