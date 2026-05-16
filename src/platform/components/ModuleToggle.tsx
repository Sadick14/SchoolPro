import React from 'react';
import Button from '@/shared/components/common/Button';

interface ModuleToggleProps {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  onToggle: (id: string, enabled: boolean) => void;
}

const ModuleToggle: React.FC<ModuleToggleProps> = ({ id, name, description, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
      <div>
        <div className="font-bold text-black">{name}</div>
        {description && <div className="text-xs text-slate-400 mt-1">{description}</div>}
      </div>
      <div className="flex items-center space-x-3">
        <span className={`text-xs font-bold ${enabled ? 'text-success-400' : 'text-slate-400'}`}>{enabled ? 'Enabled' : 'Disabled'}</span>
        <Button size="sm" variant={enabled ? 'outline' : 'primary'} onClick={() => onToggle(id, !enabled)}>
          {enabled ? 'Disable' : 'Enable'}
        </Button>
      </div>
    </div>
  );
};

export default ModuleToggle;
