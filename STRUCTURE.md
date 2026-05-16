# SchoolPro File Structure - Stakeholder-Based Organization

## Overview
The codebase is now organized by stakeholder domains rather than by file type. This makes it easier to understand features from a user's perspective.

## Directory Structure

```
src/
├── shared/                           # Shared across all stakeholders
│   ├── components/
│   │   ├── layout/                  # Main layout components
│   │   │   └── MainLayoutRoles.tsx
│   │   └── common/                  # Common UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── StatCard.tsx
│   │       ├── Table.tsx
│   │       └── Sparkline.tsx
│   └── lib/                         # Shared utilities
│       ├── auth.ts
│       ├── firebase.ts
│       ├── supabase.ts
│       ├── database.types.ts
│       ├── mockData.ts
│       ├── offlineSync.ts
│       ├── tenants.ts
│       └── platform.ts
│
├── auth/                            # Authentication
│   ├── pages/
│   │   └── Login.tsx
│   └── components/
│       └── (auth-specific components)
│
├── platform/                        # Platform / System Operator (super_admin)
│   ├── pages/
│   │   ├── SystemDashboard.tsx
│   │   ├── SuperAdminDashboard.tsx
│   │   ├── SystemOverview.tsx
│   │   ├── PendingSchools.tsx
│   │   ├── SupportTickets.tsx
│   │   ├── TenantDetail.tsx
│   │   ├── CreateSchool.tsx
│   │   ├── ImplementationCommandCenter.tsx
│   │   └── ModuleWorkspace.tsx
│   ├── components/
│   │   ├── ModulesPanel.tsx
│   │   ├── ModuleToggle.tsx
│   │   └── (platform-specific components)
│   └── data/
│       └── platform.ts
│
├── school/                          # School / Institution (school_admin, owner)
│   ├── pages/
│   │   ├── Dashboard.tsx            # School Dashboard
│   │   ├── OwnerDashboard.tsx
│   │   ├── Campuses.tsx
│   │   ├── StaffManagement.tsx
│   │   ├── Admissions.tsx
│   │   ├── StudentsList.tsx
│   │   ├── ClassesList.tsx
│   │   ├── FeesManagement.tsx
│   │   ├── Attendance.tsx
│   │   ├── Assessments.tsx
│   │   ├── HR/Payroll.tsx
│   │   ├── Hostel.tsx
│   │   ├── Transport.tsx
│   │   ├── Library.tsx
│   │   ├── Communication/Notices.tsx
│   │   ├── Finance/Accounting.tsx
│   │   ├── LMS.tsx
│   │   ├── Clinic.tsx
│   │   ├── Reports.tsx
│   │   └── Subscriptions.tsx
│   └── components/
│       └── (school-specific components)
│
├── teacher/                         # Teacher Portal (teacher)
│   ├── pages/
│   │   ├── TeacherDashboard.tsx
│   │   ├── Attendance.tsx           # Student Attendance Tracking
│   │   ├── Classes.tsx              # My Classes
│   │   ├── Students.tsx             # My Students
│   │   ├── Assessments.tsx          # Create/Grade Assessments
│   │   ├── LMS.tsx                  # Learning Management
│   │   ├── Library.tsx
│   │   └── Communication.tsx
│   └── components/
│       └── (teacher-specific components)
│
├── parent/                          # Parent Portal (parent)
│   ├── pages/
│   │   ├── ParentPortal.tsx         # Parent Dashboard
│   │   ├── ChildProgress.tsx        # View child's progress
│   │   ├── Attendance.tsx           # Child's attendance
│   │   ├── Fees.tsx                 # Payment tracking
│   │   ├── Reports.tsx              # Academic reports
│   │   ├── Transport.tsx            # Transport info
│   │   └── Communication.tsx        # School messages
│   └── components/
│       └── (parent-specific components)
│
├── student/                         # Student Portal (student)
│   ├── pages/
│   │   ├── StudentPortal.tsx        # Student Dashboard
│   │   ├── LMS.tsx                  # E-Learning
│   │   ├── Assignments.tsx
│   │   ├── Attendance.tsx           # My Attendance
│   │   ├── Results.tsx              # Academic Results
│   │   ├── Fees.tsx                 # Fee Status
│   │   ├── Library.tsx              # Library Access
│   │   ├── Timetable.tsx
│   │   └── Communication.tsx
│   └── components/
│       └── (student-specific components)
│
├── App.tsx                          # Main application router
├── main.tsx                         # React entry point
├── index.css                        # Global styles
└── vite-env.d.ts
```

## Stakeholder Mapping

| Stakeholder | Domain | Role | Key Pages |
|---|---|---|---|
| System Operator | `platform/` | super_admin | SystemDashboard, TenantManagement, PendingSchools |
| School Admin | `school/` | school_admin | OwnerDashboard, StaffManagement, StudentsList |
| Teacher | `teacher/` | teacher | TeacherDashboard, Attendance, Assessments |
| Parent | `parent/` | parent | ParentPortal, ChildProgress, Fees |
| Student | `student/` | student | StudentPortal, LMS, Results |
| Shared | `shared/` & `auth/` | - | Layout, Auth, Common Components |

## Migration Guide

### Before (Type-based)
```
pages/
├── admin/
├── attendance/
├── classes/
└── ...
```

### After (Stakeholder-based)
```
platform/         # System Operator features
school/          # School Admin features
teacher/         # Teacher Portal
parent/          # Parent Portal
student/         # Student Portal
shared/          # Shared components & utilities
```

## Benefits

1. **Intuitive Navigation**: Find features by stakeholder role
2. **Role-Based Access**: Easier to implement role-based permissions
3. **Scalability**: Add new stakeholder domains easily
4. **Code Reusability**: Clear separation while maintaining shared components
5. **Team Organization**: Assign teams per stakeholder domain

## Navigation by Role

### System Operator Routes
- `/system/super-dashboard` - Control Center
- `/system` - Manage Tenants
- `/system/dashboard` - Analytics
- `/system/create-school` - Add School
- `/system/pending` - Pending Schools
- `/system/tickets` - Support Tickets

### School Admin Routes
- `/school` - Owner Dashboard
- `/school/campuses` - Manage Campuses
- `/school/staff` - Staff Management
- `/school/admissions` - Admissions
- `/students` - Students List
- `/classes` - Classes
- `/fees` - Fees Management
- `/finance` - Accounting
- `/payroll` - Payroll
- `/hr` - HR Directory
- `/hostel` - Hostel Management
- `/transport` - Transport Management
- `/library` - Library Management
- `/lms` - LMS
- `/clinic` - Clinic
- `/reports` - Reports
- `/security` - Security Audit
- `/notifications` - Communication

### Teacher Routes
- `/teacher` - Dashboard
- `/attendance` - Mark Attendance
- `/assessments` - Create Assessments
- `/classes` - My Classes
- `/students` - My Students

### Parent Routes
- `/parent` - Portal
- `/attendance` - Child's Attendance
- `/fees` - Payment Info

### Student Routes
- `/student` - Portal
- `/lms` - E-Learning
- `/assessments` - My Exams

## Implementation Notes

- All stakeholder domains have their own `pages/` and `components/` folders
- `shared/` contains truly shared code (UI components, auth, utilities)
- `auth/` handles authentication login flow
- Each stakeholder domain is independent and self-contained
- Route organization in `App.tsx` follows stakeholder structure
