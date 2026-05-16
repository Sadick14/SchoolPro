# School Registration Flow Integration Guide

## Complete Workflow for System Operator

This guide shows how the school registration flow integrates with the entire SchoolPro platform management system.

## Full System Operator (Super Admin) Workflow

### Scenario: Onboarding a New School

#### Phase 1: School Registration (CreateSchool.tsx)
**Location:** `/system/create-school`

1. **Step 1 - School Details**
   - Operator enters school information
   - Validates location (region/district)
   - Selects subscription tier

2. **Step 2 - Level Selection**
   - Choose academic levels offered
   - System notes curriculum structure

3. **Step 3 - Module Review**
   - System auto-selects modules
   - Operator reviews (can modify later)
   - Examples:
     - SHS → Enables WASSCE reporting
     - Preschool → Enables child development tracking

4. **Step 4 - Owner Credentials**
   - Generate school admin account
   - Create portal URL
   - Operator shares credentials

5. **Step 5 - Activation**
   - Send verification email to school
   - Send activation SMS to school phone
   - Queue onboarding materials

#### Phase 2: Verification & Approval (PendingSchools.tsx)
**Location:** `/system/pending`

School awaits admin approval:
- Status: **Pending**
- Owner email acknowledged?
- Documents verified?
- Operator can:
  - Approve → School becomes active
  - Request more info
  - Reject → Delete and request re-registration

#### Phase 3: School Activation
**Status Changes:**
```
Created → Email Sent → Admin Activates → Active
```

School portal becomes accessible at: `/school/{slug}`

#### Phase 4: Monitoring & Management (TenantManagement.tsx)
**Location:** `/system/tenants`

Operator now manages school:
- View school stats (users, classes, fees collected)
- Monitor usage and performance
- Update subscription if needed
- View revenue and metrics
- Suspend or delete if necessary

### Integration Points

```
CreateSchool
    ↓ (activation)
PendingSchools ← Awaiting operator review
    ↓ (approval)
TenantManagement ← Active school in system
    ↓ (view details)
TenantDetail ← Full school profile
    ↓ (analytics)
Analytics ← Contribution to platform metrics
```

## Data Flow Across System

### 1. School Registration → Creates

```
School Record
├── Basic Info (name, email, phone, location)
├── Configuration (levels, modules, plan)
├── Owner Account (username, temp password)
└── Portal URL (unique school subdomain)
```

### 2. School Activation → Generates

```
Email to School Admin
├── Welcome message
├── Portal login URL
├── Username & password
├── Initial setup instructions
└── Support contact info

SMS to School Phone
├── Activation code
├── Quick access link
└── Support number

Onboarding Sequence
├── Documentation pack
├── Training videos
├── FAQ guide
└── Support ticket system access
```

### 3. School in System → Tracked In

```
TenantManagement
├── School name & status
├── User count
├── Classes & sections
├── Revenue metrics
└── Last activity

Analytics
├── Contribution to total schools
├── User growth impact
├── Revenue impact
└── Module usage

ActivityLog
├── Registration timestamp
├── Owner login events
├── Configuration changes
└── Suspension/deletion

UserManagement
├── School owner account
├── Admin accounts created
└── User activity tracking
```

## Key Features by Role

### System Operator (super_admin)

**During Registration:**
- Fill school details form
- Select academic levels
- Review auto-modules
- Generate owner credentials
- Initiate activation

**After Registration:**
- Monitor in Pending list
- Approve/reject applications
- View in Tenant list
- Drill into tenant details
- View analytics
- Suspend if needed

### School Owner (school_admin)

**On Registration:**
- Receives email with credentials
- Gets SMS activation link
- Accesses onboarding materials
- Changes temporary password
- Sets up school profile

**After Registration:**
- Configure classes & sections
- Add staff members
- Create fee structures
- Manage students
- View reports

## Routes Involved in Full Flow

| Route | Purpose | Actor | Step |
|-------|---------|-------|------|
| `/system/create-school` | Register new school | System Op | Registration |
| `/system/pending` | Approve pending schools | System Op | Review |
| `/system/tenants` | View all schools | System Op | Management |
| `/tenants/:id` | View school details | System Op | Details |
| `/system/analytics` | School contribution | System Op | Analytics |
| `/system/activity` | Registration events | System Op | Audit |
| `/school/{slug}` | School portal | School Owner | After Activation |

## Database Collections (Future)

```
schools/
├── {schoolId}
│   ├── basicInfo: { name, email, phone, ... }
│   ├── location: { region, district, address }
│   ├── configuration: { levels, modules, plan }
│   ├── owner: { username, email, phone }
│   ├── status: "created|pending|active|suspended"
│   ├── createdAt: timestamp
│   └── activatedAt: timestamp

tenants/
├── {tenantId}
│   ├── schoolId: reference
│   ├── portalUrl: unique URL
│   ├── stats: { userCount, classCount, revenue }
│   ├── subscription: { plan, startDate, endDate }
│   └── modules: [module names]

schoolAdmins/
├── {userId}
│   ├── schoolId: reference
│   ├── username: unique
│   ├── email: contact
│   ├── role: "school_admin"
│   └── lastLogin: timestamp
```

## Email & SMS Templates

### Welcome Email (Step 5)
```
Subject: Welcome to SchoolPro - {SchoolName}

Dear {AdminName},

Your school {SchoolName} has been registered on SchoolPro!

Portal: {PortalURL}
Username: {Username}
Temporary Password: {Password}

Please change your password upon first login.

Next Steps:
1. Login to portal
2. Complete school profile
3. Add staff members
4. Configure classes
5. Import students

Support: support@schoolpro.com
```

### Activation SMS
```
{SchoolName} is now active on SchoolPro!

Portal: {ShortURL}
Login: {Username}

Change password on first login.
```

## Validation Rules

### School Details Validation
- School name: Non-empty, ≤100 chars
- Email: Valid format, unique
- Phone: Valid Ghana format (+233 or 0)
- Region: From predefined list
- District: From predefined list
- Registration number: Unique

### Level Selection
- At least 1 level required
- Maximum 8 levels

### Module Generation
- Modules deduped
- Module count: 3-8 per level

### Credentials
- Username: slugified name + "-owner"
- Password: 12 chars, mixed case, symbols
- Portal URL: unique, school-based slug

## Error Handling

### Registration Errors
```
❌ "School with this email already exists"
❌ "Registration number already registered"
❌ "Invalid phone number format"
❌ "Please select at least one school level"
❌ "Failed to generate credentials"
❌ "Failed to send activation email"
```

### Approval Errors
```
❌ "School not found"
❌ "School already approved"
❌ "Cannot approve without verification"
```

### Activation Errors
```
❌ "Failed to send SMS"
❌ "Email queue failed"
❌ "Database transaction failed"
```

## Testing Scenarios

### Happy Path: Successful Registration
```
1. Fill all details ✓
2. Select levels ✓
3. Review modules ✓
4. Generate owner ✓
5. Activate ✓
6. Appears in pending ✓
7. Approve ✓
8. Appears in tenants ✓
```

### Alternative Path: Multi-Level School
```
1. Select: Primary + JHS + SHS
2. Modules: Union of all three levels
3. System supports curriculum progression
```

### Edge Case: International School
```
1. Select: International Curriculum
2. Modules: IB/IGCSE support + Standard modules
3. Custom reporting for international students
```

### Failure Recovery: Email Fails
```
1. Registration completes
2. Email fails to send
3. Operator retries in pending list
4. Or manually enters email to resend
```

## Performance Considerations

### Stepper Component
- No heavy rendering (5 steps)
- Form state managed in component
- No infinite loops

### Module Generation
- O(n) complexity where n = number of levels selected
- Deduplication via Set
- Max 8 modules per level

### Database Writes (Future)
- Single transaction for all records
- Atomic: all-or-nothing
- Rollback on failure

### Email/SMS Queuing
- Async operations
- Queue to background jobs
- Retry logic for failures

## Security Considerations

### Data Protection
- School email verified
- Phone number validated
- Owner credentials encrypted
- Portal URL unique and unpredictable

### Credentials Handling
- Password never logged
- Displayed once for copy
- Must change on first login
- Temporary status enforced

### Access Control
- Only super_admin can register schools
- Only school_admin can access portal
- Tenant isolation enforced

## Monitoring & Analytics

### Events to Track
```
school.registered
  - school_id
  - levels_selected
  - plan_chosen
  - operator_id
  - timestamp

school.activated
  - school_id
  - activation_method (email/sms)
  - operator_id
  - timestamp

school.approved
  - school_id
  - operator_id
  - timestamp

school.suspended
  - school_id
  - operator_id
  - reason
  - timestamp
```

### Metrics to Monitor
- Registrations per day
- Approval rate
- Average time to activation
- Failure rate by step
- Module distribution
- Plan distribution

## Future Enhancements

### Phase 2: Advanced Registration
1. **Bulk Registration**
   - CSV import
   - Batch credential generation
   - Scheduled activation

2. **Document Verification**
   - Upload registration documents
   - Automated verification
   - Manual approval queue

3. **Compliance Checklist**
   - Pre-registration requirements
   - Post-registration tasks
   - Audit trail

### Phase 3: School Onboarding
1. **First-login Wizard**
   - Change password
   - Setup profile
   - Add first admin

2. **Data Import**
   - Import existing students
   - Import staff directory
   - Import fee structures

3. **Training Dashboard**
   - Video tutorials
   - Documentation
   - FAQ search

### Phase 4: Analytics & Reporting
1. **Registration Metrics**
   - Conversion funnel
   - Drop-off points
   - Time to completion

2. **Usage Analytics**
   - Module adoption rate
   - Active features
   - User engagement

3. **Business Reports**
   - Revenue by plan
   - Churn rate
   - Lifetime value

## Support Resources

### For System Operators
- Registration Workflow Guide (this document)
- Troubleshooting Guide
- FAQs for common issues
- Support ticket system

### For School Administrators
- Getting Started Guide
- Feature Walkthroughs
- Documentation Portal
- Video Tutorials

## Contact & Support

**SchoolPro Support:** support@schoolpro.com
**Technical Issues:** tech-support@schoolpro.com
**Sales Inquiries:** sales@schoolpro.com
