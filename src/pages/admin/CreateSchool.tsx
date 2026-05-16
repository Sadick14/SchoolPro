import React, { useMemo, useState } from 'react';
import { Mail, Phone, CheckCircle, Copy, Check } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Stepper, { StepItem } from '../../components/common/Stepper';

const LEVELS = [
  'Preschool',
  'Kindergarten',
  'Primary',
  'Junior High School (JHS)',
  'Senior High School (SHS)',
  'Tertiary',
  'Vocational',
  'International Curriculum',
];

const MODULE_MAP: Record<string, string[]> = {
  'Preschool': ['Child Development Reports', 'Parent Communication', 'Attendance (Child)'],
  'Kindergarten': ['Child Development Reports', 'Parent Communication', 'Attendance'],
  'Primary': ['Curriculum Subjects', 'Class Templates', 'Attendance', 'Reports'],
  'Junior High School (JHS)': ['Subjects', 'Grading System', 'Reports', 'Attendance'],
  'Senior High School (SHS)': ['Electives', 'House System', 'Transcript', 'WASSCE Support', 'Subject Pools'],
  'Tertiary': ['Course Management', 'Transcript', 'Assessment Modules'],
  'Vocational': ['Skills Modules', 'Workshop Attendance', 'Certification Reports'],
  'International Curriculum': ['IB/IGCSE Support', 'International Transcripts'],
};

const PLANS = [
  { id: 'free', name: 'Free', price: '0' },
  { id: 'starter', name: 'Starter', price: '49' },
  { id: 'pro', name: 'Pro', price: '149' },
];

const STEPS: StepItem[] = [
  { id: 'school-info', title: 'School Details', description: 'Basic information' },
  { id: 'levels', title: 'School Levels', description: 'Academic levels' },
  { id: 'modules', title: 'Auto Modules', description: 'Review modules' },
  { id: 'owner', title: 'Owner Account', description: 'Generate credentials' },
  { id: 'activation', title: 'Activation', description: 'Send verification' },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function genTempPassword(len = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

const CreateSchool: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    type: '',
    regNumber: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    district: '',
    website: '',
    plan: 'free',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [generatedOwner, setGeneratedOwner] = useState<{ username: string; password: string; portalUrl: string } | null>(null);
  const [activated, setActivated] = useState(false);
  const [activationDetails, setActivationDetails] = useState<{ email: string; sms: string; onboarding: boolean } | null>(null);

  const logoPreview = useMemo(() => (logoFile ? URL.createObjectURL(logoFile) : null), [logoFile]);

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => (prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]));
  };

  const generatedModules = useMemo(() => {
    const set = new Set<string>();
    selectedLevels.forEach(l => {
      const mods = MODULE_MAP[l] || [];
      mods.forEach(m => set.add(m));
    });
    return Array.from(set);
  }, [selectedLevels]);

  const handleChange = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  // Step 1 validation: School Details
  const isStep1Valid = form.name && form.email && form.phone && form.type && form.region && form.district;

  // Step 2 validation: Levels selected
  const isStep2Valid = selectedLevels.length > 0;

  // Step 3: Auto modules (just review, always valid)
  const isStep3Valid = true;

  // Step 4: Owner account generation
  const isStep4Valid = generatedOwner !== null;

  // Step 5: Activation
  const isStep5Valid = activated;

  const handleNextStep = () => {
    // Validate current step before moving
    if (currentStep === 0 && !isStep1Valid) {
      alert('Please fill in all required school details');
      return;
    }
    if (currentStep === 1 && !isStep2Valid) {
      alert('Please select at least one school level');
      return;
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGenerateOwner = () => {
    const slug = slugify(form.name || 'school');
    const username = `${slug}-owner`;
    const password = genTempPassword(12);
    const portalUrl = `${window.location.origin}/school/${slug}`;
    setGeneratedOwner({ username, password, portalUrl });
  };

  const handleActivate = () => {
    // Simulate sending email/SMS and onboarding
    setActivationDetails({
      email: `Verification email sent to ${form.email}`,
      sms: `Activation SMS sent to ${form.phone}`,
      onboarding: true,
    });
    setActivated(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">School Registration Wizard</h1>
        <p className="text-gray-600">Step-by-step guide to create and activate a new school on the platform</p>
      </div>

      {/* Stepper */}
      <Card className="p-6 mb-8">
        <Stepper steps={STEPS} currentStep={currentStep} variant="horizontal" />
      </Card>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 1: School Details */}
          {currentStep === 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Step 1: Create School Details</h2>
              <p className="text-gray-600 mb-6">Enter basic information about the school</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="School name *" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g., Accra High School" required />
                <Input label="School type *" value={form.type} onChange={e => handleChange('type', e.target.value)} placeholder="e.g., International School" />
                <Input label="Registration number *" value={form.regNumber} onChange={e => handleChange('regNumber', e.target.value)} placeholder="e.g., REG-2023-001" />
                <Input label="School email *" value={form.email} onChange={e => handleChange('email', e.target.value)} type="email" placeholder="admin@school.edu.gh" />
                <Input label="School phone *" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+233 XX XXX XXXX" />
                <Input label="Website" value={form.website} onChange={e => handleChange('website', e.target.value)} placeholder="https://school.edu.gh" />
                <Input label="Region *" value={form.region} onChange={e => handleChange('region', e.target.value)} placeholder="e.g., Greater Accra" />
                <Input label="District *" value={form.district} onChange={e => handleChange('district', e.target.value)} placeholder="e.g., Accra Metropolitan" />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest">Address</label>
                <textarea value={form.address} onChange={e => handleChange('address', e.target.value)} placeholder="Full school address" className="w-full backdrop-blur-sm bg-white border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-gray-800" rows={3} />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest">Subscription plan</label>
                <select value={form.plan} onChange={e => handleChange('plan', e.target.value)} className="w-full backdrop-blur-sm bg-white border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-gray-800">
                  {PLANS.map(p => (
                    <option key={p.id} value={p.id}>{`${p.name} ${p.price !== '0' ? `— $${p.price}/mo` : '(Free)'}`}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest">School logo</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="text-sm" />
                  {logoPreview && <img src={logoPreview} alt="logo" className="h-16 w-16 object-contain rounded-lg border border-gray-200" />}
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: School Levels */}
          {currentStep === 1 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Step 2: Select School Levels</h2>
              <p className="text-gray-600 mb-6">Choose which academic levels this school offers. You can select multiple levels.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEVELS.map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => toggleLevel(l)}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      selectedLevels.includes(l)
                        ? 'bg-blue-50 border-blue-400 shadow-md'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">{l}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedLevels.includes(l) ? '✓ Selected' : 'Click to select'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800"><strong>Selected levels:</strong> {selectedLevels.length > 0 ? selectedLevels.join(', ') : 'None selected yet'}</p>
              </div>
            </Card>
          )}

          {/* Step 3: Auto-Module Review */}
          {currentStep === 2 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Step 3: Auto-Generated Modules</h2>
              <p className="text-gray-600 mb-6">Based on the selected school levels, these modules will be automatically enabled:</p>
              
              {generatedModules.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">No modules generated. Please go back and select school levels.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {generatedModules.map(m => (
                    <div key={m} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Check size={18} className="text-green-600" />
                        <div>
                          <div className="font-semibold text-sm text-green-900">{m}</div>
                        </div>
                      </div>
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Enabled</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">💡 <strong>Tip:</strong> Modules can be customized in school settings after creation.</p>
              </div>
            </Card>
          )}

          {/* Step 4: Generate Owner Account */}
          {currentStep === 3 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Step 4: Create School Owner Account</h2>
              <p className="text-gray-600 mb-6">Generate temporary credentials for the school administrator</p>
              
              {!generatedOwner ? (
                <Button onClick={handleGenerateOwner} className="w-full">Generate Owner Credentials</Button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle size={18} />
                      <strong>Credentials Generated Successfully</strong>
                    </div>
                    <p className="text-sm text-green-700">Share these credentials with the school administrator</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Username</div>
                      <div className="flex items-center justify-between">
                        <div className="font-mono font-semibold text-gray-900">{generatedOwner.username}</div>
                        <button
                          onClick={() => copyToClipboard(generatedOwner.username, 'username')}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Copy size={16} className={copied === 'username' ? 'text-green-600' : 'text-gray-600'} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Temporary Password</div>
                      <div className="flex items-center justify-between">
                        <div className="font-mono font-semibold text-gray-900">{generatedOwner.password}</div>
                        <button
                          onClick={() => copyToClipboard(generatedOwner.password, 'password')}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Copy size={16} className={copied === 'password' ? 'text-green-600' : 'text-gray-600'} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">School Portal URL</div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-mono text-sm text-gray-900 truncate">{generatedOwner.portalUrl}</div>
                        <button
                          onClick={() => copyToClipboard(generatedOwner.portalUrl, 'url')}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Copy size={16} className={copied === 'url' ? 'text-green-600' : 'text-gray-600'} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800"><strong>⚠️ Important:</strong> The password is temporary. The school administrator must change it upon first login.</p>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Step 5: Activation */}
          {currentStep === 4 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Step 5: School Activation</h2>
              <p className="text-gray-600 mb-6">Send verification and activation messages to the school</p>
              
              {!activated ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                    <div className="text-sm text-blue-800"><strong>Email:</strong> {form.email}</div>
                    <div className="text-sm text-blue-800"><strong>Phone:</strong> {form.phone}</div>
                  </div>

                  <Button onClick={handleActivate} className="w-full">
                    Send Verification & Activate School
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle size={18} />
                      <strong>School Activation Complete!</strong>
                    </div>
                  </div>

                  {activationDetails && (
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-3">
                        <Mail size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Verification Email Queued</div>
                          <div className="text-xs text-gray-600 mt-1">{activationDetails.email}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-3">
                        <Phone size={18} className="text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Activation SMS Queued</div>
                          <div className="text-xs text-gray-600 mt-1">{activationDetails.sms}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="font-semibold text-sm text-gray-900 mb-2">✓ Onboarding Sequence Initiated</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Welcome email with next steps</li>
                          <li>• Documentation and training resources</li>
                          <li>• Support contact information</li>
                          <li>• Initial setup assistance</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm text-emerald-800"><strong>🎉 Success!</strong> {form.name} has been successfully registered and activated on SchoolPro.</p>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="font-bold mb-4 text-lg">Registration Summary</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">School Name</div>
                <div className="font-semibold text-gray-900">{form.name || 'Not provided'}</div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Email</div>
                <div className="text-sm text-gray-700">{form.email || 'Not provided'}</div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Phone</div>
                <div className="text-sm text-gray-700">{form.phone || 'Not provided'}</div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Region / District</div>
                <div className="text-sm text-gray-700">{form.region && form.district ? `${form.region}, ${form.district}` : 'Not provided'}</div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Subscription Plan</div>
                <div className="text-sm text-gray-700">{PLANS.find(p => p.id === form.plan)?.name || 'Free'}</div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Selected Levels</div>
                {selectedLevels.length > 0 ? (
                  <div className="space-y-1">
                    {selectedLevels.map(l => (
                      <div key={l} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded w-full break-words">{l}</div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">No levels selected</div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Auto-Generated Modules</div>
                {generatedModules.length > 0 ? (
                  <div className="space-y-1">
                    {generatedModules.map(m => (
                      <div key={m} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">{m}</div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">Modules will appear here</div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <Button
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          variant="secondary"
        >
          ← Previous
        </Button>

        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {STEPS.length}
        </div>

        <Button
          onClick={handleNextStep}
          disabled={currentStep === STEPS.length - 1 && !activated}
        >
          {currentStep === STEPS.length - 1 ? 'Complete' : 'Next →'}
        </Button>
      </div>
    </div>
  );
};

export default CreateSchool;
