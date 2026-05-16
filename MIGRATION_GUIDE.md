# File Migration Guide - Stakeholder-Based Organization

## Summary of Changes

This document outlines how to migrate existing files to the new stakeholder-based structure.

## File Mapping

### Shared Components (→ `src/shared/components/`)

**Layout Components:**
- `components/layout/MainLayoutRoles.tsx` → `shared/components/layout/MainLayoutRoles.tsx`

**Common UI Components:**
- `components/common/Button.tsx` → `shared/components/common/Button.tsx`
- `components/common/Card.tsx` → `shared/components/common/Card.tsx`
- `components/common/Input.tsx` → `shared/components/common/Input.tsx`
- `components/common/StatCard.tsx` → `shared/components/common/StatCard.tsx`
- `components/common/Table.tsx` → `shared/components/common/Table.tsx`
- `components/common/Sparkline.tsx` → `shared/components/common/Sparkline.tsx`

### Shared Libraries (→ `src/shared/lib/`)

- `lib/auth.ts` → `shared/lib/auth.ts`
- `lib/firebase.ts` → `shared/lib/firebase.ts`
- `lib/supabase.ts` → `shared/lib/supabase.ts`
- `lib/database.types.ts` → `shared/lib/database.types.ts`
- `lib/mockData.ts` → `shared/lib/mockData.ts`
- `lib/offlineSync.ts` → `shared/lib/offlineSync.ts`
- `lib/tenants.ts` → `shared/lib/tenants.ts`
- `lib/platform.ts` → `shared/lib/platform.ts`

### Authentication (→ `src/auth/`)

- `features/auth/pages/Login.tsx` → `auth/pages/Login.tsx`

### Platform / System Operator (→ `src/platform/`)

- `pages/admin/SuperAdminDashboard.tsx` → `platform/pages/SuperAdminDashboard.tsx`
- `pages/admin/SystemDashboard.tsx` → `platform/pages/SystemDashboard.tsx`
- `pages/admin/SystemOverview.tsx` → `platform/pages/SystemOverview.tsx`
- `pages/admin/PendingSchools.tsx` → `platform/pages/PendingSchools.tsx`
- `pages/admin/SupportTickets.tsx` → `platform/pages/SupportTickets.tsx`
- `pages/admin/TenantDetail.tsx` → `platform/pages/TenantDetail.tsx`
- `pages/admin/CreateSchool.tsx` → `platform/pages/CreateSchool.tsx`
- `components/admin/ModulesPanel.tsx` → `platform/components/ModulesPanel.tsx`
- `components/admin/ModuleToggle.tsx` → `platform/components/ModuleToggle.tsx`
- `features/platform/data/platform.ts` → `platform/data/platform.ts`
- `features/platform/pages/ImplementationCommandCenter.tsx` → `platform/pages/ImplementationCommandCenter.tsx`
- `features/platform/pages/ModuleWorkspace.tsx` → `platform/pages/ModuleWorkspace.tsx`

### School / Institution (→ `src/school/`)

- `pages/Dashboard.tsx` → `school/pages/Dashboard.tsx`
- `pages/school/OwnerDashboard.tsx` → `school/pages/OwnerDashboard.tsx`
- `pages/school/Campuses.tsx` → `school/pages/Campuses.tsx`
- `pages/school/StaffManagement.tsx` → `school/pages/StaffManagement.tsx`
- `pages/school/Admissions.tsx` → `school/pages/Admissions.tsx`
- `pages/students/StudentsList.tsx` → `school/pages/StudentsList.tsx`
- `pages/classes/ClassesList.tsx` → `school/pages/ClassesList.tsx`
- `pages/fees/FeesManagement.tsx` → `school/pages/FeesManagement.tsx`
- `pages/attendance/TeacherAttendance.tsx` → `school/pages/TeacherAttendance.tsx`
- `pages/assessments/AssessmentsList.tsx` → `school/pages/AssessmentsList.tsx`
- `pages/hr/StaffDirectory.tsx` → `school/pages/StaffDirectory.tsx`
- `pages/hostel/HostelManagement.tsx` → `school/pages/HostelManagement.tsx`
- `pages/transport/TransportManagement.tsx` → `school/pages/TransportManagement.tsx`
- `pages/library/LibraryManagement.tsx` → `school/pages/LibraryManagement.tsx`
- `pages/communication/Notices.tsx` → `school/pages/Notices.tsx`
- `pages/schools/SchoolsList.tsx` → `school/pages/SchoolsList.tsx`

### Teacher (→ `src/teacher/`)

- `pages/teacher/TeacherDashboard.tsx` → `teacher/pages/TeacherDashboard.tsx`

### Parent (→ `src/parent/`)

- `pages/parent/ParentPortal.tsx` → `parent/pages/ParentPortal.tsx`

### Student (→ `src/student/`)

- `pages/student/StudentPortal.tsx` → `student/pages/StudentPortal.tsx`

### Additional Files

- `pages/Profile.tsx` → `shared/pages/Profile.tsx` (shared across roles)

## Import Path Updates

### Before
```typescript
import Button from './components/common/Button';
import Card from './components/common/Card';
import { useAuth } from './lib/auth';
import MainLayout from './components/layout/MainLayoutRoles';
```

### After
```typescript
import { Button, Card, MainLayout } from '@/shared';
import { useAuth } from '@/shared/lib/auth';
// or
import Button from '@/shared/components/common/Button';
import { useAuth } from '@/shared/lib/auth';
```

## Vite Path Aliases

Update `vite.config.ts` to support clean imports:

```typescript
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/shared/*": ["src/shared/*"],
      "@/platform/*": ["src/platform/*"],
      "@/school/*": ["src/school/*"],
      "@/teacher/*": ["src/teacher/*"],
      "@/parent/*": ["src/parent/*"],
      "@/student/*": ["src/student/*"],
      "@/auth/*": ["src/auth/*"]
    }
  }
}
```

## Steps to Execute Migration

1. **Copy shared files:**
   - Copy `components/layout/` → `shared/components/layout/`
   - Copy `components/common/` → `shared/components/common/`
   - Copy `lib/` → `shared/lib/`

2. **Reorganize stakeholder files:**
   - Copy `pages/admin/` → `platform/pages/`
   - Copy `pages/school/` → `school/pages/`
   - Copy `pages/teacher/` → `teacher/pages/`
   - Copy `pages/parent/` → `parent/pages/`
   - Copy `pages/student/` → `student/pages/`
   - Copy all other pages to appropriate stakeholder folders

3. **Move component groups:**
   - Copy `components/admin/` → `platform/components/`
   - Copy auth features to `auth/`

4. **Update imports:**
   - Update all import paths in files
   - Use path aliases (`@/`, `@/shared/`, etc.)

5. **Update App.tsx:**
   - Import from new module paths
   - Organize routes by stakeholder domain

6. **Delete old directories:**
   - Remove `components/`
   - Remove `lib/` (files moved to shared)
   - Remove `pages/` (files reorganized by stakeholder)
   - Remove `features/` (split into stakeholder modules and auth)

7. **Test thoroughly:**
   - Run `npm run dev`
   - Test all routes for each role
   - Verify all imports resolve correctly

## Benefits of New Structure

✅ **Intuitive Organization** - Code organized by user role/stakeholder
✅ **Scalability** - Easy to add new stakeholder domains
✅ **Team Organization** - Teams can own specific stakeholder modules
✅ **Clear Dependencies** - Easy to see what's shared vs. role-specific
✅ **Faster Navigation** - Find features quickly by role
✅ **Cleaner Imports** - Use path aliases for cleaner code
