import React, { useState } from 'react';
import Card from '@/shared/components/common/Card';
import Input from '@/shared/components/common/Input';
import Button from '@/shared/components/common/Button';
import { useAuth } from '@/shared/lib/auth';

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar_url || null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Mock upload: preview locally
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const save = () => {
    // For now, update local mock user state only
    setUser({ ...(user as any), full_name: fullName, avatar_url: avatarPreview });
  };

  return (
    <div className="p-8">
      <Card title="Profile & Settings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4">
              {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400">No Avatar</div>}
            </div>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <Button variant="glass">Upload Logo / Avatar</Button>
            </label>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Email" value={user?.email || ''} disabled />
            <div className="flex items-center space-x-3 mt-4">
              <Button onClick={save} variant="primary" isLoading={uploading}>Save Profile</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
