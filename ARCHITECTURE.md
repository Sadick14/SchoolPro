# SchoolPro - Stakeholder-Based Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SchoolPro GH Platform                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   System Admin   │  │  School Admin    │  │     Teachers     │
│  (super_admin)   │  │ (school_admin)   │  │    (teacher)     │
│                  │  │                  │  │                  │
│ • Tenant Mgmt    │  │ • School Mgmt    │  │ • Attendance     │
│ • Subscriptions  │  │ • Staff Mgmt     │  │ • Assessments    │
│ • Analytics      │  │ • Student Mgmt   │  │ • Grades         │
│ • Approvals      │  │ • Finance Mgmt   │  │ • LMS            │
└──────────────────┘  └──────────────────┘  └──────────────────┘
      (Platform)          (School)              (Teacher)

         ▼                    ▼                    ▼
    src/platform/        src/school/          src/teacher/
    ├── pages/           ├── pages/            ├── pages/
    ├── components/      ├── components/       ├── components/
    └── data/            └── (modules)         └── (modules)

┌──────────────────┐  ┌──────────────────┐
│     Parents      │  │     Students     │
│    (parent)      │  │    (student)     │
│                  │  │                  │
│ • Child Progress │  │ • LMS            │
│ • Fees Status    │  │ • Results        │
│ • Messages       │  │ • Assignments    │
│ • Attendance     │  │ • Attendance     │
└──────────────────┘  └──────────────────┘
      (Parent)          (Student)

         ▼                    ▼
    src/parent/           src/student/
    ├── pages/            ├── pages/
    └── components/       └── components/

┌────────────────────────────────────────────────────────────────┐
│                 Shared / Core Infrastructure                   │
│  src/shared/         src/auth/          src/styles/           │
│  ├── components/     ├── pages/         ├── index.css         │
│  │   ├── layout/     │   └── Login.tsx   └── (globals)        │
│  │   └── common/     └── components/                           │
│  └── lib/                                                      │
│      ├── auth.ts                                              │
│      ├── firebase.ts                                          │
│      ├── mockData.ts                                          │
│      └── ...utilities                                         │
└────────────────────────────────────────────────────────────────┘
```

## Directory Tree

```
src/
├── shared/                                    # Core/Shared Code
│   ├── components/
│   │   ├── layout/
│   │   │   └── MainLayoutRoles.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── StatCard.tsx
│   │       ├── Table.tsx
│   │       └── Sparkline.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── firebase.ts
│   │   ├── supabase.ts
│   │   ├── mockData.ts
│   │   ├── platform.ts
│   │   ├── tenants.ts
│   │   └── database.types.ts
│   └── index.ts                              # Barrel export
│
├── auth/                                      # Authentication Flow
│   ├── pages/
│   │   └── Login.tsx
│   └── index.ts
│
├── platform/                                  # System Operator (super_admin)
│   ├── pages/
│   │   ├── SuperAdminDashboard.tsx
│   │   ├── SystemDashboard.tsx
│   │   ├── SystemOverview.tsx
│   │   ├── PendingSchools.tsx
│   │   ├── SupportTickets.tsx
│   │   ├── TenantDetail.tsx
│   │   ├── CreateSchool.tsx
│   │   ├── ImplementationCommandCenter.tsx
│   │   └── ModuleWorkspace.tsx
│   ├── components/
│   │   ├── ModulesPanel.tsx
│   │   └── ModuleToggle.tsx
│   ├── data/
│   │   └── platform.ts
│   └── index.ts                              # Barrel export
│
├── school/                                    # School/Institution (school_admin)
│   ├── pages/
│   │   ├── Dashboard.tsx                     # Main School Dashboard
│   │   ├── OwnerDashboard.tsx
│   │   ├── Campuses.tsx
│   │   ├── StaffManagement.tsx
│   │   ├── Admissions.tsx
│   │   ├── StudentsList.tsx
│   │   ├── ClassesList.tsx
│   │   ├── FeesManagement.tsx
│   │   ├── TeacherAttendance.tsx
│   │   ├── AssessmentsList.tsx
│   │   ├── StaffDirectory.tsx
│   │   ├── HostelManagement.tsx
│   │   ├── TransportManagement.tsx
│   │   ├── LibraryManagement.tsx
│   │   ├── Notices.tsx
│   │   └── SchoolsList.tsx
│   ├── components/
│   │   └── (school-specific components)
│   └── index.ts                              # Barrel export
│
├── teacher/                                   # Teacher Portal (teacher)
│   ├── pages/
│   │   ├── TeacherDashboard.tsx
│   │   ├── Attendance.tsx
│   │   ├── Classes.tsx
│   │   ├── Students.tsx
│   │   ├── Assessments.tsx
│   │   ├── LMS.tsx
│   │   ├── Library.tsx
│   │   └── Communication.tsx
│   ├── components/
│   │   └── (teacher-specific components)
│   └── index.ts                              # Barrel export
│
├── parent/                                    # Parent Portal (parent)
│   ├── pages/
│   │   ├── ParentPortal.tsx
│   │   ├── ChildProgress.tsx
│   │   ├── Attendance.tsx
│   │   ├── Fees.tsx
│   │   ├── Reports.tsx
│   │   ├── Transport.tsx
│   │   └── Communication.tsx
│   ├── components/
│   │   └── (parent-specific components)
│   └── index.ts                              # Barrel export
│
├── student/                                   # Student Portal (student)
│   ├── pages/
│   │   ├── StudentPortal.tsx
│   │   ├── LMS.tsx
│   │   ├── Assignments.tsx
│   │   ├── Attendance.tsx
│   │   ├── Results.tsx
│   │   ├── Fees.tsx
│   │   ├── Library.tsx
│   │   ├── Timetable.tsx
│   │   └── Communication.tsx
│   ├── components/
│   │   └── (student-specific components)
│   └── index.ts                              # Barrel export
│
├── App.tsx                                    # Main router
├── main.tsx                                   # React entry
├── index.css                                  # Global styles
└── vite-env.d.ts
```

## Role-Based Access

```
┌─────────────┬─────────────┬──────────┬────────┬─────────┐
│ super_admin │ school_admin│ teacher  │ parent │ student │
├─────────────┼─────────────┼──────────┼────────┼─────────┤
│ platform/   │ school/     │ teacher/ │parent/ │student/ │
├─────────────┼─────────────┼──────────┼────────┼─────────┤
│ ✓ ✓ ✓       │ ✓ ✓ ✓       │ ✓ ✓      │ ✓ ✓    │ ✓ ✓     │
│ (all)       │ (all)       │ (own)    │(child) │ (self)  │
└─────────────┴─────────────┴──────────┴────────┴─────────┘
```

## Module Relationships

```
                    ┌─────────────────┐
                    │  shared/        │
                    │  • Auth         │
                    │  • Components   │
                    │  • Utilities    │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
      ┌───▼───┐          ┌───▼───┐         ┌───▼───┐
      │platform│         │ school│         │teacher│
      └───┬───┘          └───┬───┘         └───┬───┘
          │                  │                  │
          │            ┌─────┴──────┐           │
          │            │            │           │
      ┌───▼────┐   ┌───▼───┐   ┌───▼───┐   ┌───▼────┐
      │ admin  │   │parent │   │student│   │modules │
      │console │   │portal │   │portal │   │workspace
      └────────┘   └───────┘   └───────┘   └────────┘
```

## Key Principles

### 1. **Clear Separation of Concerns**
- Each stakeholder domain is independent
- Shared code lives in `shared/`
- No cross-stakeholder dependencies

### 2. **Single Responsibility**
- `platform/` - System operations only
- `school/` - School management only
- `teacher/`, `parent/`, `student/` - Portal features only

### 3. **Shared Infrastructure**
- UI components in `shared/components/`
- Auth in `shared/lib/auth` (used by all)
- Utilities in `shared/lib/`

### 4. **Easy Scaling**
- Adding new feature? Keep it in its stakeholder folder
- Adding new stakeholder? Create new folder with same structure
- Each folder is self-contained

## Import Patterns

### ✅ DO: Import from shared when needed
```typescript
import { Button, Card } from '@/shared';
import { useAuth } from '@/shared/lib/auth';
```

### ✅ DO: Import from stakeholder module
```typescript
import { SuperAdminDashboard } from '@/platform';
import { TeacherDashboard } from '@/teacher';
```

### ❌ DON'T: Cross-stakeholder imports
```typescript
// ❌ AVOID
import TeacherComponent from '@/teacher/components/SomeComponent';
// in school module
```

### ❌ DON'T: Direct relative paths in shared code
```typescript
// ❌ AVOID
import Button from '../../components/Button';
// ✅ USE
import { Button } from '@/shared';
```

## Benefits Summary

| Aspect | Benefit |
|--------|---------|
| **Navigation** | Find features by role, not by file type |
| **Scalability** | Easy to add new stakeholders or modules |
| **Team Structure** | Teams can own specific domains |
| **Maintenance** | Changes isolated to stakeholder scope |
| **Onboarding** | New devs understand structure quickly |
| **Testing** | Test each stakeholder module independently |
| **Deployment** | Can deploy stakeholder features separately |
