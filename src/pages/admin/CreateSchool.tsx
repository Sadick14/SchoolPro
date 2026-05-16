import React, { useMemo, useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate owner account and portal preview (mock)
    const slug = slugify(form.name || 'school');
    const username = `${slug}-owner`;
    const password = genTempPassword(12);
    const portalUrl = `${window.location.origin}/school/${slug}`;
    setGeneratedOwner({ username, password, portalUrl });

    // In a follow-up step we'll persist to Firestore and provision tenant resources.
  };

  const handleActivate = () => {
    // Simulate sending email/SMS and onboarding
    setActivated(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create School (System Operator)</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="School name" value={form.name} onChange={e => handleChange('name', e.target.value)} required />
              <Input label="School type" value={form.type} onChange={e => handleChange('type', e.target.value)} />
              <Input label="Registration number" value={form.regNumber} onChange={e => handleChange('regNumber', e.target.value)} />
              <Input label="School email" value={form.email} onChange={e => handleChange('email', e.target.value)} type="email" />
              <Input label="School phone" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
              <Input label="Website" value={form.website} onChange={e => handleChange('website', e.target.value)} />
              <Input label="Region" value={form.region} onChange={e => handleChange('region', e.target.value)} />
              <Input label="District" value={form.district} onChange={e => handleChange('district', e.target.value)} />
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest ml-1">Address</label>
                <textarea value={form.address} onChange={e => handleChange('address', e.target.value)} className="w-full backdrop-blur-sm bg-white border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-gray-800" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest ml-1">Subscription plan</label>
                <select value={form.plan} onChange={e => handleChange('plan', e.target.value)} className="w-full backdrop-blur-sm bg-white border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-gray-800">
                  {PLANS.map(p => (
                    <option key={p.id} value={p.id}>{`${p.name} ${p.price !== '0' ? `— $${p.price}/mo` : '(Free)'}`}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest ml-1">Logo</label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} />
                {logoPreview && <img src={logoPreview} alt="logo" className="h-16 w-16 object-contain rounded-lg border" />}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest ml-1">School levels</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LEVELS.map(l => (
                  <button key={l} type="button" onClick={() => toggleLevel(l)} className={`text-left p-3 rounded-lg border ${selectedLevels.includes(l) ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'}`}>
                    <div className="font-semibold text-sm">{l}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="submit">Generate Owner & Preview</Button>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="font-bold mb-3">Auto-generated modules</h3>
            {generatedModules.length === 0 && <p className="text-sm text-gray-600">Select school levels to preview enabled modules.</p>}
            <ul className="mt-2 space-y-2">
              {generatedModules.map(m => (
                <li key={m} className="flex items-center justify-between bg-white/60 border border-gray-200 rounded-lg px-3 py-2">
                  <div className="font-medium">{m}</div>
                  <div className="text-sm text-gray-500">Enabled</div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-bold mb-2">Owner account (temporary)</h4>
              {!generatedOwner && <p className="text-sm text-gray-600">Generate owner credentials after filling the form.</p>}
              {generatedOwner && (
                <div className="space-y-2">
                  <div className="bg-white/60 border border-gray-200 rounded-lg px-3 py-2">
                    <div className="text-xs text-gray-500">Username</div>
                    <div className="font-mono font-semibold">{generatedOwner.username}</div>
                  </div>
                  <div className="bg-white/60 border border-gray-200 rounded-lg px-3 py-2">
                    <div className="text-xs text-gray-500">Temporary password</div>
                    <div className="font-mono font-semibold">{generatedOwner.password}</div>
                  </div>
                  <div className="bg-white/60 border border-gray-200 rounded-lg px-3 py-2">
                    <div className="text-xs text-gray-500">School portal URL</div>
                    <div className="font-mono font-semibold break-all">{generatedOwner.portalUrl}</div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button onClick={() => navigator.clipboard.writeText(generatedOwner.portalUrl)}>Copy URL</Button>
                    <Button variant="secondary" onClick={() => navigator.clipboard.writeText(generatedOwner.password)}>Copy Password</Button>
                  </div>

                  <div className="mt-4">
                    <Button onClick={handleActivate} variant="primary">Activate School (Simulate Email/SMS)</Button>
                  </div>
                </div>
              )}

              {activated && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="font-semibold text-emerald-700">Activation simulated</div>
                  <div className="text-sm text-gray-700">Verification email queued • SMS queued • Welcome onboarding ready</div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateSchool;
