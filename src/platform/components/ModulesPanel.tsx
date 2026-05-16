import React from 'react';
import ModuleToggle from './ModuleToggle';

interface ModulesPanelProps {
  modules: { id: string; name: string; description?: string; enabled: boolean }[];
  onToggle: (id: string, enabled: boolean) => void;
}

const ModulesPanel: React.FC<ModulesPanelProps> = ({ modules, onToggle }) => {
  return (
    <div className="space-y-3">
      {modules.map((m) => (
        <ModuleToggle key={m.id} {...m} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default ModulesPanel;
