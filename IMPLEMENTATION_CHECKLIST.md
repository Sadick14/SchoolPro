# Implementation Checklist - Stakeholder-Based File Structure

> ⚠️ **Note**: Follow this checklist to implement the new file structure. Complete items sequentially.

## Phase 1: Setup & Configuration ✅

- [ ] **Read documentation**
  - [ ] Read `STRUCTURE.md` - Understanding the new structure
  - [ ] Read `ARCHITECTURE.md` - Understanding relationships
  - [ ] Read `MIGRATION_GUIDE.md` - Step-by-step migration

- [ ] **Create directory structure**
  - [ ] ✅ `src/shared/components/{layout,common}`
  - [ ] ✅ `src/shared/lib`
  - [ ] ✅ `src/auth`
  - [ ] ✅ `src/platform/{pages,components,data}`
  - [ ] ✅ `src/school/{pages,components}`
  - [ ] ✅ `src/teacher/{pages,components}`
  - [ ] ✅ `src/parent/pages`
  - [ ] ✅ `src/student/pages`

- [ ] **Create barrel export files**
  - [ ] ✅ `src/shared/index.ts`
  - [ ] ✅ `src/platform/index.ts`
  - [ ] ✅ `src/school/index.ts`
  - [ ] ✅ `src/teacher/index.ts`
  - [ ] ✅ `src/parent/index.ts`
  - [ ] ✅ `src/student/index.ts`
  - [ ] ✅ `src/auth/index.ts`

- [ ] **Update build configuration**
  - [ ] Update `vite.config.ts` to support path aliases (`@/shared/*`, `@/platform/*`, etc.)
  - [ ] Update `tsconfig.json` with path mappings
  - [ ] Verify build works: `npm run build`

## Phase 2: Copy Files 🔄

### Copy Shared Files

- [ ] **Components**
  - [ ] Copy `src/components/layout/MainLayoutRoles.tsx` → `src/shared/components/layout/`
  - [ ] Copy `src/components/common/*` → `src/shared/components/common/`
  - [ ] Copy `src/components/admin/` → `src/platform/components/`

- [ ] **Libraries**
  - [ ] Copy `src/lib/*` → `src/shared/lib/`

- [ ] **Authentication**
  - [ ] Copy `src/features/auth/pages/Login.tsx` → `src/auth/pages/`

### Copy Stakeholder-Specific Files

- [ ] **Platform (System Admin)**
  - [ ] Copy `src/pages/admin/SuperAdminDashboard.tsx` → `src/platform/pages/`
  - [ ] Copy `src/pages/admin/SystemDashboard.tsx` → `src/platform/pages/`
  - [ ] Copy `src/pages/admin/SystemOverview.tsx` → `src/platform/pages/`
  - [ ] Copy `src/pages/admin/PendingSchools.tsx` → `src/platform/pages/`
  - [ ] Copy `src/pages/admin/SupportTickets.tsx` → `src/platform/pages/`
  - [ ] Copy `src/pages/admin/TenantDetail.tsx` → `src/platform/pages/`
  - [ ] Copy `src/pages/admin/CreateSchool.tsx` → `src/platform/pages/`
  - [ ] Copy `src/features/platform/` → `src/platform/`

- [ ] **School (Institution)**
  - [ ] Copy `src/pages/Dashboard.tsx` → `src/school/pages/`
  - [ ] Copy `src/pages/school/*` → `src/school/pages/`
  - [ ] Copy `src/pages/students/*` → `src/school/pages/`
  - [ ] Copy `src/pages/classes/*` → `src/school/pages/`
  - [ ] Copy `src/pages/fees/*` → `src/school/pages/`
  - [ ] Copy `src/pages/attendance/*` → `src/school/pages/`
  - [ ] Copy `src/pages/assessments/*` → `src/school/pages/`
  - [ ] Copy `src/pages/hr/*` → `src/school/pages/`
  - [ ] Copy `src/pages/hostel/*` → `src/school/pages/`
  - [ ] Copy `src/pages/transport/*` → `src/school/pages/`
  - [ ] Copy `src/pages/library/*` → `src/school/pages/`
  - [ ] Copy `src/pages/communication/*` → `src/school/pages/`
  - [ ] Copy `src/pages/schools/*` → `src/school/pages/`

- [ ] **Teacher**
  - [ ] Copy `src/pages/teacher/TeacherDashboard.tsx` → `src/teacher/pages/`

- [ ] **Parent**
  - [ ] Copy `src/pages/parent/ParentPortal.tsx` → `src/parent/pages/`

- [ ] **Student**
  - [ ] Copy `src/pages/student/StudentPortal.tsx` → `src/student/pages/`

## Phase 3: Update Imports 📝

- [ ] **Update import paths in all files**
  - [ ] Replace relative imports with path aliases
  - [ ] Example: `import Button from '@/shared/components/common/Button'`
  - [ ] Example: `import { useAuth } from '@/shared/lib/auth'`

- [ ] **Update App.tsx**
  - [ ] Update all imports to use new paths
  - [ ] Use barrel exports: `import { SuperAdminDashboard } from '@/platform'`
  - [ ] Organize routes by stakeholder domain

- [ ] **Update components**
  - [ ] Fix imports in all components
  - [ ] Fix imports in all pages
  - [ ] Test each file compiles without errors

## Phase 4: Testing 🧪

- [ ] **Functionality Testing**
  - [ ] `npm run dev` - Start dev server
  - [ ] Test login page loads
  - [ ] Test System Operator (super_admin) login and routes
  - [ ] Test School Admin (school_admin) login and routes
  - [ ] Test Teacher login and routes
  - [ ] Test Parent login and routes
  - [ ] Test Student login and routes

- [ ] **Route Testing**
  - [ ] Navigate through all routes
  - [ ] Verify no 404s
  - [ ] Verify page content loads correctly
  - [ ] Test sidebar navigation
  - [ ] Test role-based access control

- [ ] **Build Testing**
  - [ ] `npm run build` - Production build
  - [ ] Verify build succeeds
  - [ ] Verify bundle size acceptable
  - [ ] Test build output in preview mode

## Phase 5: Cleanup 🧹

- [ ] **Delete old directories**
  - [ ] Delete `src/components/` (moved to `src/shared/`)
  - [ ] Delete `src/lib/` (moved to `src/shared/lib/`)
  - [ ] Delete `src/pages/` (reorganized by stakeholder)
  - [ ] Delete `src/features/` (reorganized into modules)

- [ ] **Verify cleanup**
  - [ ] `npm run dev` - Verify still works
  - [ ] Check for any remaining import errors
  - [ ] Verify all functionality intact

- [ ] **Documentation**
  - [ ] Keep `STRUCTURE.md` for future reference
  - [ ] Keep `ARCHITECTURE.md` for team onboarding
  - [ ] Keep `MIGRATION_GUIDE.md` for similar future migrations
  - [ ] Update team wiki/documentation

## Phase 6: Optimization 🚀

- [ ] **Code Quality**
  - [ ] Run ESLint: `npm run lint`
  - [ ] Fix any linting issues
  - [ ] Format code: `npm run format` (if available)

- [ ] **Performance**
  - [ ] Check bundle size
  - [ ] Verify code splitting working correctly
  - [ ] Confirm lazy loading for modules

- [ ] **Documentation**
  - [ ] Add onboarding guide for new developers
  - [ ] Document how to add new features
  - [ ] Document how to add new stakeholder roles

## Post-Implementation

### For Developers

- **Add Feature to School Module:**
  1. Create file in `src/school/pages/NewFeature.tsx`
  2. Export from `src/school/index.ts`
  3. Add route in `App.tsx` under school routes
  4. Import using: `import { NewFeature } from '@/school'`

- **Add Feature to Teacher Module:**
  1. Create file in `src/teacher/pages/NewFeature.tsx`
  2. Export from `src/teacher/index.ts`
  3. Add route in `App.tsx` under teacher routes

- **Create New Stakeholder Role:**
  1. Create directory: `src/newrole/{pages,components}`
  2. Create `src/newrole/index.ts` with exports
  3. Reorganize related pages into this folder
  4. Update routes in `App.tsx`

### Metrics to Track

- [ ] **Development Time**: Measure if team finds features faster
- [ ] **Onboarding Time**: Measure if new developers understand structure faster
- [ ] **Bug Density**: Track if bugs are easier to locate and fix
- [ ] **Feature Velocity**: Measure if features are developed faster

## Troubleshooting

### Import Errors
- **Error**: Cannot find module `@/shared`
- **Solution**: Verify `vite.config.ts` and `tsconfig.json` are updated with path aliases

### Missing Components
- **Error**: Component not found after moving
- **Solution**: Check if file was actually copied, verify import paths match new location

### Circular Dependencies
- **Error**: Module circular dependency
- **Solution**: Ensure stakeholder modules only import from `shared/`, not from other stakeholder modules

### Build Fails
- **Error**: Build fails after migration
- **Solution**: 
  1. Check for typos in import paths
  2. Verify all files were copied
  3. Run `npm install` to refresh node_modules
  4. Check `npm run lint` for errors

## Success Criteria ✨

- [x] Directory structure created
- [ ] All files migrated and imports updated
- [ ] Dev server runs without errors
- [ ] All roles can log in
- [ ] All pages load correctly
- [ ] Build succeeds
- [ ] No unused directories remain
- [ ] Team understands new structure
- [ ] Documentation complete

---

**Start Date**: ___________  
**Completion Date**: ___________  
**Completed By**: ___________
