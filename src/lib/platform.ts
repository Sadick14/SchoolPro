import {
  Activity,
  Banknote,
  BedDouble,
  BookOpenCheck,
  Building2,
  Bus,
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  KeyRound,
  Library,
  MessageSquare,
  ShieldCheck,
  UserCog,
  Users,
  WalletCards,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type UserRole = 'super_admin' | 'school_owner' | 'school_admin' | 'teacher' | 'accountant' | 'hr_manager' | 'parent' | 'student';

export type SchoolOperationMode = 'single_level' | 'multi_level';

export type ImplementationStatus = 'ready' | 'in_progress' | 'planned';

export type PlatformDomain =
  | 'operator'
  | 'onboarding'
  | 'academics'
  | 'finance'
  | 'people'
  | 'welfare'
  | 'learning'
  | 'compliance';

export interface PermissionSet {
  view: UserRole[];
  manage: UserRole[];
  approve?: UserRole[];
}

export interface PlatformModule {
  id: string;
  name: string;
  domain: PlatformDomain;
  route: string;
  status: ImplementationStatus;
  icon: LucideIcon;
  summary: string;
  capabilities: string[];
  primaryWorkflows: string[];
  permissions: PermissionSet;
  tenantScoped: boolean;
  ghanaRequirements?: string[];
}

export interface OnboardingStep {
  id: string;
  title: string;
  owner: UserRole;
  description: string;
  deliverables: string[];
}

export interface LifecycleStage {
  id: string;
  stage: string;
  description: string;
  systemOfRecord: string;
  requiredModules: string[];
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'System Operator',
  school_owner: 'School Owner',
  school_admin: 'School Administrator',
  teacher: 'Teacher',
  accountant: 'Accountant',
  hr_manager: 'HR Manager',
  parent: 'Parent',
  student: 'Student',
};

export const OPERATION_MODES: Record<SchoolOperationMode, { label: string; description: string; examples: string[] }> = {
  single_level: {
    label: 'Single-level school',
    description: 'One academic structure, one fee policy, one calendar, and unified reporting across all classes.',
    examples: ['Primary-only academy', 'Standalone JHS', 'Standalone SHS'],
  },
  multi_level: {
    label: 'Multi-level school',
    description: 'Separate preschool, primary, JHS, SHS, TVET, or campus structures under one tenant with shared ownership.',
    examples: ['Preschool + Primary + JHS', 'Basic + SHS group', 'Multi-campus school chain'],
  },
};

const leadership: UserRole[] = ['super_admin', 'school_owner', 'school_admin'];
const academicManagers: UserRole[] = ['school_owner', 'school_admin', 'teacher'];
const financeManagers: UserRole[] = ['school_owner', 'school_admin', 'accountant'];
const welfareManagers: UserRole[] = ['school_owner', 'school_admin', 'hr_manager'];
const families: UserRole[] = ['parent', 'student'];

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: 'operator-console',
    name: 'System Operator Console',
    domain: 'operator',
    route: '/system',
    status: 'ready',
    icon: ShieldCheck,
    summary: 'Central SaaS control plane for tenant provisioning, module gating, subscriptions, support, and platform health.',
    capabilities: ['Tenant registry', 'Operator roles', 'Module entitlements', 'Support SLAs', 'Global audit review'],
    primaryWorkflows: ['Approve school signup', 'Assign plan and modules', 'Review usage risk', 'Escalate support issue'],
    permissions: { view: ['super_admin'], manage: ['super_admin'], approve: ['super_admin'] },
    tenantScoped: false,
  },
  {
    id: 'school-onboarding',
    name: 'Multi-school Onboarding',
    domain: 'onboarding',
    route: '/system/create-school',
    status: 'in_progress',
    icon: Building2,
    summary: 'Guided setup for school profile, operation mode, campuses, levels, billing plan, owner account, and initial modules.',
    capabilities: ['KYC profile', 'Campus setup', 'Level templates', 'Owner invite', 'Subscription activation'],
    primaryWorkflows: ['Capture school profile', 'Choose single or multi-level', 'Create campuses and terms', 'Invite school owner'],
    permissions: { view: ['super_admin', 'school_owner'], manage: leadership, approve: ['super_admin'] },
    tenantScoped: true,
    ghanaRequirements: ['Region and district capture', 'GES/NaSIA registration fields', 'Ghana phone number validation'],
  },
  {
    id: 'academics-core',
    name: 'Academic Management',
    domain: 'academics',
    route: '/classes',
    status: 'in_progress',
    icon: GraduationCap,
    summary: 'Levels, classes, streams, subjects, timetables, grading schemes, promotions, and academic calendars.',
    capabilities: ['Academic year setup', 'Class and stream management', 'Subject allocation', 'Promotion engine', 'Report cards'],
    primaryWorkflows: ['Create term calendar', 'Assign class teachers', 'Build timetable', 'Promote students'],
    permissions: { view: [...academicManagers, ...families], manage: ['school_owner', 'school_admin'], approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
    ghanaRequirements: ['KG/Basic/JHS/SHS level support', 'BECE/WASSCE grading alignment', 'Cumulative terminal reports'],
  },
  {
    id: 'admissions-lifecycle',
    name: 'Admissions & Student Lifecycle',
    domain: 'academics',
    route: '/school/admissions',
    status: 'in_progress',
    icon: Users,
    summary: 'Admission applications, student records, guardians, medical notes, transfers, alumni, and graduation lifecycle.',
    capabilities: ['Application pipeline', 'Guardian linking', 'Document checklist', 'Transfer records', 'Alumni conversion'],
    primaryWorkflows: ['Receive application', 'Approve admission', 'Generate student ID', 'Assign class and fees'],
    permissions: { view: [...leadership, 'teacher'], manage: leadership, approve: leadership },
    tenantScoped: true,
    ghanaRequirements: ['Ghana Card optional field', 'NHIS and medical profile capture', 'Previous school transfer notes'],
  },
  {
    id: 'attendance-exams',
    name: 'Attendance & Examinations',
    domain: 'academics',
    route: '/attendance',
    status: 'in_progress',
    icon: CalendarCheck,
    summary: 'Daily attendance, lesson attendance, continuous assessment, exam marks, moderation, and result publishing.',
    capabilities: ['Attendance registers', 'Absence alerts', 'Assessment weights', 'Exam moderation', 'Parent result publishing'],
    primaryWorkflows: ['Mark class attendance', 'Record assessment', 'Moderate marks', 'Publish terminal report'],
    permissions: { view: [...academicManagers, ...families], manage: academicManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
    ghanaRequirements: ['Terminal assessment support', 'Attendance export for regulators', 'Continuous assessment weighting'],
  },
  {
    id: 'finance-accounting',
    name: 'Finance & Accounting',
    domain: 'finance',
    route: '/finance',
    status: 'ready',
    icon: Banknote,
    summary: 'Fee billing, invoices, ledgers, Chart of Accounts, collections, expenses, arrears, scholarships, and reconciliations.',
    capabilities: ['Fee structures', 'Student invoices', 'MoMo reconciliation', 'Ledger postings', 'Expense approvals'],
    primaryWorkflows: ['Generate term bills', 'Collect payment', 'Reconcile MoMo', 'Post to ledger', 'Report arrears'],
    permissions: { view: financeManagers, manage: financeManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
    ghanaRequirements: ['GHS currency', 'Mobile Money references', 'Termly fee schedules', 'Withholding/VAT-ready reporting'],
  },
  {
    id: 'subscriptions-billing',
    name: 'Subscription Billing Engine',
    domain: 'finance',
    route: '/subscriptions',
    status: 'ready',
    icon: WalletCards,
    summary: 'SaaS pricing plans, tenant subscriptions, invoice cycles, feature entitlements, trials, renewals, and dunning.',
    capabilities: ['Plan catalog', 'Tenant subscription state', 'Usage counters', 'Renewal reminders', 'Feature entitlements'],
    primaryWorkflows: ['Start trial', 'Activate paid plan', 'Suspend overdue tenant', 'Upgrade modules'],
    permissions: { view: ['super_admin', 'school_owner'], manage: ['super_admin'], approve: ['super_admin'] },
    tenantScoped: false,
    ghanaRequirements: ['GHS plan pricing', 'MoMo/bank transfer payment references', 'VAT-ready SaaS invoices'],
  },
  {
    id: 'hr-payroll',
    name: 'HR & Payroll',
    domain: 'people',
    route: '/payroll',
    status: 'ready',
    icon: UserCog,
    summary: 'Staff records, contracts, attendance, leave, salary components, deductions, payslips, and payroll approvals.',
    capabilities: ['Staff directory', 'Leave management', 'Salary structures', 'Payroll runs', 'Payslip publishing'],
    primaryWorkflows: ['Onboard staff', 'Approve leave', 'Run monthly payroll', 'Publish payslips'],
    permissions: { view: welfareManagers, manage: welfareManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
    ghanaRequirements: ['SSNIT and tax ID fields', 'PAYE-ready deductions', 'Ghana bank/mobile payment references'],
  },
  {
    id: 'lms-elearning',
    name: 'LMS & E-learning',
    domain: 'learning',
    route: '/lms',
    status: 'ready',
    icon: BookOpenCheck,
    summary: 'Digital classrooms, content libraries, assignments, quizzes, submissions, grading, and learner progress tracking.',
    capabilities: ['Course spaces', 'Lesson content', 'Assignments', 'Quizzes', 'Progress analytics'],
    primaryWorkflows: ['Create course room', 'Publish lesson', 'Collect submissions', 'Grade learner work'],
    permissions: { view: [...academicManagers, ...families], manage: academicManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
  },
  {
    id: 'transport',
    name: 'Transport Management',
    domain: 'welfare',
    route: '/transport',
    status: 'in_progress',
    icon: Bus,
    summary: 'Fleet, routes, stops, driver assignment, student allocations, transport fees, and trip attendance.',
    capabilities: ['Fleet registry', 'Routes and stops', 'Driver assignment', 'Student allocation', 'Trip manifests'],
    primaryWorkflows: ['Create bus route', 'Assign students', 'Track trip attendance', 'Bill transport fee'],
    permissions: { view: [...welfareManagers, ...families], manage: welfareManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
  },
  {
    id: 'hostel',
    name: 'Hostel Management',
    domain: 'welfare',
    route: '/hostel',
    status: 'in_progress',
    icon: BedDouble,
    summary: 'Dormitories, rooms, bed allocations, hostel attendance, incident logs, welfare checks, and hostel billing.',
    capabilities: ['Dormitory registry', 'Bed allocation', 'Warden notes', 'Hostel attendance', 'Incident tracking'],
    primaryWorkflows: ['Allocate bed', 'Record hostel roll call', 'Log incident', 'Bill boarding fee'],
    permissions: { view: [...welfareManagers, ...families], manage: welfareManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
  },
  {
    id: 'library',
    name: 'Library Management',
    domain: 'learning',
    route: '/library',
    status: 'in_progress',
    icon: Library,
    summary: 'Book catalog, accession numbers, borrowing, returns, fines, reservations, and reading analytics.',
    capabilities: ['Catalog', 'Borrowing', 'Returns', 'Fines', 'Reservations'],
    primaryWorkflows: ['Register book', 'Issue to learner', 'Record return', 'Apply overdue fine'],
    permissions: { view: [...academicManagers, ...families], manage: ['school_owner', 'school_admin'], approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
  },
  {
    id: 'clinic',
    name: 'Clinic & Student Welfare',
    domain: 'welfare',
    route: '/clinic',
    status: 'ready',
    icon: HeartPulse,
    summary: 'Sick bay visits, allergies, medication notes, referrals, immunization records, and parent notifications.',
    capabilities: ['Medical profile', 'Clinic visits', 'Medication log', 'Parent alerts', 'Referral notes'],
    primaryWorkflows: ['Record clinic visit', 'Notify guardian', 'Track medication', 'Export health summary'],
    permissions: { view: [...welfareManagers, 'parent'], manage: welfareManagers, approve: ['school_owner', 'school_admin'] },
    tenantScoped: true,
    ghanaRequirements: ['NHIS number capture', 'Emergency contact validation', 'Consent and guardian notification trail'],
  },
  {
    id: 'communications',
    name: 'Communication Center',
    domain: 'compliance',
    route: '/notifications',
    status: 'in_progress',
    icon: MessageSquare,
    summary: 'Announcements, SMS/email/in-app notifications, targeted broadcasts, templates, consent, and delivery audit.',
    capabilities: ['Announcements', 'Audience targeting', 'SMS templates', 'Delivery status', 'Consent tracking'],
    primaryWorkflows: ['Create announcement', 'Select audience', 'Send SMS/email', 'Review delivery status'],
    permissions: { view: [...leadership, 'teacher', ...families], manage: [...leadership, 'teacher'], approve: leadership },
    tenantScoped: true,
    ghanaRequirements: ['Local phone formatting', 'Parent opt-in tracking', 'Emergency broadcast trail'],
  },
  {
    id: 'audit-security',
    name: 'Security & Audit',
    domain: 'compliance',
    route: '/security',
    status: 'ready',
    icon: KeyRound,
    summary: 'RBAC, tenant isolation, session policies, audit events, approval trails, data export, and risk monitoring.',
    capabilities: ['Role permissions', 'Audit logs', 'Approval history', 'Risk events', 'Data export controls'],
    primaryWorkflows: ['Review audit trail', 'Assign permissions', 'Investigate high-risk event', 'Export compliance log'],
    permissions: { view: leadership, manage: leadership, approve: ['super_admin', 'school_owner'] },
    tenantScoped: true,
    ghanaRequirements: ['Data privacy consent trail', 'Regulator-ready export logs', 'Operator access audit'],
  },
  {
    id: 'reports-compliance',
    name: 'Reports & Ghana Compliance',
    domain: 'compliance',
    route: '/reports',
    status: 'ready',
    icon: FileCheck2,
    summary: 'Operational dashboards, GES/NaSIA-ready exports, finance statements, attendance summaries, and board reports.',
    capabilities: ['GES exports', 'Financial reports', 'Attendance summaries', 'Academic reports', 'Board dashboards'],
    primaryWorkflows: ['Choose report pack', 'Filter term/campus', 'Validate data quality', 'Export PDF/CSV'],
    permissions: { view: leadership, manage: leadership, approve: leadership },
    tenantScoped: true,
    ghanaRequirements: ['GES enrollment summary', 'NaSIA inspection readiness', 'Termly academic performance reports'],
  },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'application',
    title: 'School application and verification',
    owner: 'super_admin',
    description: 'Capture school identity, ownership, Ghana location, registration details, and contact channels.',
    deliverables: ['Verified tenant record', 'Owner contact', 'Registration metadata', 'Initial support ticket'],
  },
  {
    id: 'structure',
    title: 'Academic structure setup',
    owner: 'school_owner',
    description: 'Select single-level or multi-level mode, then generate campuses, levels, classes, streams, terms, and calendars.',
    deliverables: ['Operation mode', 'Campus tree', 'Academic year', 'Term calendar'],
  },
  {
    id: 'modules',
    title: 'Plan and module activation',
    owner: 'super_admin',
    description: 'Activate subscription plan, module entitlements, usage limits, onboarding trial, and tenant billing settings.',
    deliverables: ['Subscription plan', 'Enabled modules', 'Billing cycle', 'Feature limits'],
  },
  {
    id: 'people',
    title: 'Users, roles, and permissions',
    owner: 'school_admin',
    description: 'Invite administrators, teachers, accountants, HR managers, parents, and students with role-based portals.',
    deliverables: ['Role assignments', 'Portal access', 'Permission set', 'Login invitations'],
  },
  {
    id: 'go-live',
    title: 'Data migration and go-live',
    owner: 'school_admin',
    description: 'Import students, staff, balances, classes, library catalog, route allocations, and opening audit baseline.',
    deliverables: ['Validated imports', 'Opening balances', 'Audit baseline', 'Go-live checklist'],
  },
];

export const STUDENT_LIFECYCLE: LifecycleStage[] = [
  {
    id: 'lead',
    stage: 'Prospect / Applicant',
    description: 'Family submits an inquiry or admission form with supporting documents and preferred level.',
    systemOfRecord: 'Admissions & Student Lifecycle',
    requiredModules: ['school-onboarding', 'admissions-lifecycle'],
  },
  {
    id: 'admitted',
    stage: 'Admitted learner',
    description: 'Admissions team approves the application, generates student number, assigns class, and creates guardian links.',
    systemOfRecord: 'Admissions & Student Lifecycle',
    requiredModules: ['admissions-lifecycle', 'finance-accounting'],
  },
  {
    id: 'active',
    stage: 'Active academic enrolment',
    description: 'Learner participates in attendance, lessons, assessments, LMS activities, welfare services, and billing cycles.',
    systemOfRecord: 'Academic Management',
    requiredModules: ['academics-core', 'attendance-exams', 'finance-accounting', 'lms-elearning'],
  },
  {
    id: 'progression',
    stage: 'Promotion / Transfer',
    description: 'End-of-term decisions promote, repeat, transfer, suspend, or graduate the learner with audit-visible approvals.',
    systemOfRecord: 'Academic Management',
    requiredModules: ['academics-core', 'reports-compliance', 'audit-security'],
  },
  {
    id: 'alumni',
    stage: 'Alumni / Archived record',
    description: 'Graduated or exited students remain available for transcripts, arrears follow-up, alumni records, and compliance exports.',
    systemOfRecord: 'Reports & Ghana Compliance',
    requiredModules: ['reports-compliance', 'finance-accounting'],
  },
];

export const DOMAIN_LABELS: Record<PlatformDomain, string> = {
  operator: 'System Operator',
  onboarding: 'Onboarding',
  academics: 'Academics',
  finance: 'Finance',
  people: 'People Operations',
  welfare: 'Welfare Services',
  learning: 'Learning Resources',
  compliance: 'Security & Compliance',
};

export const getModuleById = (id: string) => PLATFORM_MODULES.find((module) => module.id === id);

export const getModulesByDomain = (domain: PlatformDomain) => PLATFORM_MODULES.filter((module) => module.domain === domain);

export const implementationProgress = Math.round(
  (PLATFORM_MODULES.filter((module) => module.status === 'ready').length / PLATFORM_MODULES.length) * 100,
);

export const TENANT_ISOLATION_CONTROLS = [
  'Every operational table is keyed by tenant/school and protected by role-based row filters.',
  'System Operator actions are recorded separately from school tenant actions for audit clarity.',
  'Module entitlements gate routes, workflows, reports, and API write operations per subscription.',
  'Shared platform data such as plans and support tickets remains outside tenant-owned ledgers.',
];

export const GHANA_COMPLIANCE_PACK = [
  'GHS currency defaults for billing, payroll, and financial statements.',
  'GES/NaSIA-ready enrollment, attendance, terminal report, and inspection exports.',
  'Ghana region, district, phone number, NHIS, SSNIT, tax, and MoMo reference capture points.',
  'Configurable KG, Basic, JHS, SHS, TVET, single-level, and multi-level academic structures.',
];

export const ARCHITECTURE_LAYERS = [
  {
    title: 'Control plane',
    owner: 'System Operator',
    details: 'Tenant onboarding, subscriptions, feature flags, support operations, usage metering, and platform audit.',
    icon: ShieldCheck,
  },
  {
    title: 'Tenant workspace',
    owner: 'School leadership',
    details: 'School-specific academics, people, finance, welfare, learning, communications, and reporting workflows.',
    icon: Building2,
  },
  {
    title: 'Experience portals',
    owner: 'Role-based users',
    details: 'Distinct portals for owners, administrators, teachers, accountants, HR, parents, students, and operators.',
    icon: Activity,
  },
  {
    title: 'Integration layer',
    owner: 'Platform services',
    details: 'Mobile money references, SMS/email, exports, offline sync, audit events, and future public APIs.',
    icon: ClipboardCheck,
  },
];
