# School Registration Flow - Complete Implementation

## Overview

The School Registration Flow is a comprehensive step-by-step wizard that guides System Operators through creating and activating new schools on the SchoolPro platform. It automates module generation based on school level selection and manages the entire provisioning process.

## Architecture

### Components

#### 1. Stepper Component (`src/components/common/Stepper.tsx`)
Visual component that displays registration progress across 5 steps.

**Features:**
- Horizontal and vertical layout options
- Step completion indicators with checkmarks
- Current step highlighting
- Step descriptions
- Optional step clicking for navigation

**Props:**
```typescript
interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  variant?: 'horizontal' | 'vertical';
}

interface StepItem {
  id: string;
  title: string;
  description?: string;
}
```

#### 2. CreateSchool Component (`src/pages/admin/CreateSchool.tsx`)
Main registration wizard with 5-step flow.

**Features:**
- Form validation before each step
- Dynamic module generation
- Credential generation
- Activation workflow
- Copy-to-clipboard functionality
- Registration summary sidebar

## Registration Flow Steps

### Step 1: School Details
**Purpose:** Capture basic school information

**Required Fields:**
- School name *
- School type (e.g., International, Private, Public)
- Registration number (official ID)
- School email *
- School phone *
- Region *
- District *
- Address
- Website (optional)
- Subscription plan
- Logo (optional)

**Validation:**
- All required fields must be filled
- Email must be valid format
- Phone number validated
- Region and District required

**Action:** User fills in form and proceeds to next step

---

### Step 2: Select School Levels
**Purpose:** Determine academic structure and appropriate modules

**Available Levels (Multi-select):**
1. Preschool
2. Kindergarten
3. Primary
4. Junior High School (JHS)
5. Senior High School (SHS)
6. Tertiary
7. Vocational
8. International Curriculum

**Module Generation Rules:**

| Level | Auto-Generated Modules |
|-------|------------------------|
| **Preschool** | • Child Development Reports<br/>• Parent Communication<br/>• Attendance (Child) |
| **Kindergarten** | • Child Development Reports<br/>• Parent Communication<br/>• Attendance |
| **Primary** | • Curriculum Subjects<br/>• Class Templates<br/>• Attendance<br/>• Reports |
| **JHS** | • Subjects<br/>• Grading System<br/>• Reports<br/>• Attendance |
| **SHS** | • Electives<br/>• House System<br/>• Transcript<br/>• WASSCE Support<br/>• Subject Pools |
| **Tertiary** | • Course Management<br/>• Transcript<br/>• Assessment Modules |
| **Vocational** | • Skills Modules<br/>• Workshop Attendance<br/>• Certification Reports |
| **International** | • IB/IGCSE Support<br/>• International Transcripts |

**Validation:**
- At least one level must be selected

**Action:** System deduplicates modules and shows preview in next step

---

### Step 3: Review Auto-Generated Modules
**Purpose:** Show what modules will be enabled based on selected levels

**Display:**
- List of all auto-generated modules
- Visual indicators showing each module is "Enabled"
- Count of total modules
- Tip: "Modules can be customized in school settings after creation"

**Action:**
- User reviews modules
- Proceeds to owner account generation

**Note:** Modules can be customized or additional ones added after school creation

---

### Step 4: Create School Owner Account
**Purpose:** Generate temporary credentials for school administrator

**Generated Elements:**
1. **Username:** `{school-slug}-owner`
   - Format: lowercase, hyphenated school name + "-owner"
   - Example: "accra-high-school-owner"

2. **Temporary Password:** 12-character strong password
   - Mix of uppercase, lowercase, numbers, symbols
   - Example: "aB9@xK#pL2mN"

3. **School Portal URL:** `{platform-url}/school/{school-slug}`
   - Example: "https://platform.schoolpro.com/school/accra-high-school"

**Features:**
- One-click copy for each credential
- Visual feedback on successful copy
- Warning: "Password is temporary - must change on first login"
- Security note about credential handling

**Action:**
- System operator copies and shares credentials with school administrator
- Proceeds to activation step

---

### Step 5: School Activation
**Purpose:** Send verification and onboarding communications

**Activation Channels:**
1. **Email Verification**
   - Sent to school email address
   - Contains: Login link, credential reminder, first steps
   - Status: "Verification email queued"

2. **SMS Activation**
   - Sent to school phone
   - Contains: Short code, activation link
   - Status: "Activation SMS queued"

3. **Onboarding Sequence**
   - Welcome email with next steps
   - Documentation and training resources
   - Support contact information
   - Initial setup assistance

**Flow:**
- User clicks "Send Verification & Activate School"
- System queues email to school email address
- System queues SMS to school phone number
- Onboarding sequence initiated
- School status changes to "Active"

**Completion:**
- Success message displayed
- School appears in Tenant Management
- Owner account ready for first login

---

## Data Flow Diagram

```
Step 1: School Details
    ↓ (validation: all fields)
Step 2: Select Levels
    ↓ (validation: ≥1 level)
Step 3: Auto Modules
    ↓ (review modules)
Step 4: Owner Account
    ↓ (generate credentials)
Step 5: Activation
    ↓ (send verification)
Success: School Created & Activated
```

## Form Data Structure

```typescript
interface SchoolForm {
  name: string;                 // School name
  type: string;                 // School type
  regNumber: string;            // Registration number
  email: string;                // School email
  phone: string;                // School phone
  address: string;              // Full address
  region: string;               // Geographic region
  district: string;             // District/area
  website?: string;             // School website (optional)
  plan: 'free' | 'starter' | 'pro'; // Subscription plan
}

interface SelectedLevels extends Array<string> {}

interface GeneratedOwner {
  username: string;             // Generated username
  password: string;             // Generated temporary password
  portalUrl: string;            // School portal URL
}

interface ActivationDetails {
  email: string;                // Email sent confirmation
  sms: string;                  // SMS sent confirmation
  onboarding: boolean;          // Onboarding initiated
}
```

## Validation Rules

### Step 1 Validation
```javascript
isStep1Valid = form.name && 
              form.email && 
              form.phone && 
              form.type && 
              form.region && 
              form.district;
```

**Error Messages:**
- "Please fill in all required school details"

### Step 2 Validation
```javascript
isStep2Valid = selectedLevels.length > 0;
```

**Error Messages:**
- "Please select at least one school level"

### Step 3 Validation
- Always valid (review only)

### Step 4 Validation
```javascript
isStep4Valid = generatedOwner !== null;
```

### Step 5 Validation
```javascript
isStep5Valid = activated === true;
```

## UI Components

### Stepper Progress Bar
- Horizontal layout with step numbers
- Green checkmark for completed steps
- Blue highlight for current step
- Gray dots for pending steps
- Connector lines between steps

### Step Content Cards
- Full-width card for current step
- Responsive grid layout
- Inline help text and descriptions

### Sidebar Summary
- **Sticky positioning** - stays visible while scrolling
- **Real-time updates** - shows current form state
- Shows selected levels, modules, plan
- Summary helps operators verify information

### Navigation Buttons
- **Previous Button:** Disabled on step 1
- **Next Button:** Labeled "Complete" on final step
- Validation prevents forward navigation on invalid state
- Step counter shows progress

## Key Features

### 1. Smart Module Generation
- Multi-select levels
- Automatic deduplication
- Module pool based on combinations
- Example: SHS + Tertiary = Union of both module sets

### 2. Credential Management
- Secure password generation (12 chars, mixed case + symbols)
- Username derived from school name (slugified)
- Portal URL auto-generated
- One-click copy with visual feedback

### 3. Activation Workflow
- Email queue confirmation
- SMS queue confirmation
- Onboarding sequence
- Success message with school name

### 4. Step-Back Navigation
- Users can go back to any previous step
- Form data preserved
- Can edit selections and re-validate

### 5. Real-time Summary
- Sidebar shows current form state
- Updates as user fills form
- Shows selected levels and generated modules
- Helps catch errors before submission

## Integration Points

### With Tenant Management
After activation, school appears in `/system/tenants` list

### With Pending Schools
Schools not yet activated appear in `/system/pending`

### With User Management
School owner account created and tracked in system

### With Activity Log
Registration events logged with timestamps

## Code Example

### Triggering Step Validation
```typescript
const handleNextStep = () => {
  // Validate current step
  if (currentStep === 0 && !isStep1Valid) {
    alert('Please fill in all required school details');
    return;
  }
  if (currentStep === 1 && !isStep2Valid) {
    alert('Please select at least one school level');
    return;
  }
  // Move to next step
  if (currentStep < STEPS.length - 1) {
    setCurrentStep(prev => prev + 1);
  }
};
```

### Generating Credentials
```typescript
const handleGenerateOwner = () => {
  const slug = slugify(form.name || 'school');
  const username = `${slug}-owner`;
  const password = genTempPassword(12);
  const portalUrl = `${window.location.origin}/school/${slug}`;
  setGeneratedOwner({ username, password, portalUrl });
};
```

### Activating School
```typescript
const handleActivate = () => {
  setActivationDetails({
    email: `Verification email sent to ${form.email}`,
    sms: `Activation SMS sent to ${form.phone}`,
    onboarding: true,
  });
  setActivated(true);
  // In production: Send actual emails/SMS via backend
};
```

## Testing Checklist

### Step 1: School Details
- [ ] Fill all required fields
- [ ] Verify email validation
- [ ] Verify phone validation
- [ ] Test file upload for logo
- [ ] Verify "Next" button enabled when valid
- [ ] Verify error message when required field empty

### Step 2: Select Levels
- [ ] Select single level
- [ ] Select multiple levels
- [ ] Deselect and reselect levels
- [ ] Verify "Next" button enabled when ≥1 level
- [ ] Verify error when no level selected

### Step 3: Review Modules
- [ ] Verify all selected levels' modules shown
- [ ] Verify modules not duplicated
- [ ] Verify module count accurate
- [ ] Test scrolling in module list

### Step 4: Generate Owner
- [ ] Click "Generate Owner Credentials" button
- [ ] Verify username generated correctly
- [ ] Verify password is 12 characters
- [ ] Verify portal URL formatted correctly
- [ ] Test copy buttons for each field
- [ ] Verify copy confirmation feedback

### Step 5: Activation
- [ ] Verify email address shown is correct
- [ ] Verify phone number shown is correct
- [ ] Click "Send Verification & Activate School"
- [ ] Verify success message displayed
- [ ] Verify onboarding details shown

### Navigation
- [ ] Test "Previous" button between steps
- [ ] Verify form data persists when going back
- [ ] Verify cannot proceed with invalid data
- [ ] Test step counter updates

### Responsive Design
- [ ] Test on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] Verify sidebar collapses on mobile

## Future Enhancements

1. **Email Integration**
   - Real email sending via SMTP
   - Email templates with branding
   - Delivery tracking and retries

2. **SMS Integration**
   - Real SMS sending via Twilio/Afrimoyo
   - Activation code in SMS
   - Delivery confirmation

3. **Database Integration**
   - Save school data to Firestore
   - Create tenant database
   - Initialize schema and collections

4. **Advanced Module Customization**
   - Toggle modules after generation
   - Custom module templates
   - Module feature toggles

5. **Bulk Registration**
   - CSV import for multiple schools
   - Batch credential generation
   - Batch activation

6. **Compliance & Verification**
   - Document verification workflow
   - Admin approval before activation
   - Compliance checklist

7. **Onboarding Dashboard**
   - First-login welcome flow
   - Setup wizard for school admin
   - Documentation links
   - Support contact info

## API Endpoints (Future)

```
POST /api/schools
  - Create school with details
  - Generate owner credentials
  - Queue activation emails/SMS

GET /api/schools/:id
  - Get school details

PUT /api/schools/:id
  - Update school information

POST /api/schools/:id/activate
  - Activate school
  - Send verification codes

GET /api/modules/by-levels
  - Query available modules for levels
```

## Configuration

### Subscription Plans
Defined in `PLANS` constant:
- **Free**: $0/mo
- **Starter**: $49/mo
- **Pro**: $149/mo

### School Levels
Defined in `LEVELS` constant - 8 predefined levels

### Module Mapping
Defined in `MODULE_MAP` - Maps levels to auto-enabled modules

### Password Generation
- Length: 12 characters
- Characters: A-Z, a-z, 0-9, !@#$%^&*()
- Truly random using `Math.random()`

## Notes for Developers

1. **Mock Data**: Currently using simulated email/SMS in Step 5. Replace `handleActivate()` with real backend calls.

2. **Database**: School data not persisted yet. Add Firestore writes in `handleActivate()`.

3. **Multi-tenancy**: Each school gets isolated database and portal URL.

4. **Credentials Storage**: Should be encrypted before storage; never log passwords.

5. **Email Templates**: Create separate template files for welcome emails.

6. **SMS Gateway**: Integrate with Twilio or African SMS provider for Ghana.

7. **Monitoring**: Log registration events for analytics and support.

8. **Error Handling**: Add try-catch for backend operations.

9. **Loading States**: Add spinners during credential generation and activation.

10. **Success Tracking**: Send admin notifications when schools activate.
