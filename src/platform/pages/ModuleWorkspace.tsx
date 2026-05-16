import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, UsersRound } from 'lucide-react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { DOMAIN_LABELS, ROLE_LABELS, getModuleById } from '@/shared/lib/platform';

interface ModuleWorkspaceProps {
  moduleId?: string;
}

const ModuleWorkspace: React.FC<ModuleWorkspaceProps> = ({ moduleId }) => {
  const params = useParams();
  const activeModuleId = moduleId ?? params.moduleId ?? '';
  const module = getModuleById(activeModuleId);

  if (!module) {
    return <Navigate to="/implementation" replace />;
  }

  const Icon = module.icon;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link to="/implementation" className="inline-flex items-center text-sm font-black text-primary-600 hover:text-primary-700">
            <ArrowLeft size={16} className="mr-2" /> Back to implementation command center
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-orange-700">
              <Icon size={30} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-500">{DOMAIN_LABELS[module.domain]}</p>
              <h1 className="text-4xl font-black tracking-tight text-gray-900">{module.name}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-4xl text-sm font-medium leading-7 text-gray-600">{module.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="glass">Configure module</Button>
          <Button>Start workflow</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Capabilities" className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {module.capabilities.map((capability) => (
              <div key={capability} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mb-4 text-emerald-600" size={22} />
                <h3 className="font-black text-gray-900">{capability}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                  Tenant-scoped implementation area for {capability.toLowerCase()} with audit-ready operations and role-aware access.
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Access model">
          <div className="space-y-5">
            <div className="rounded-3xl bg-gray-50 p-5">
              <UsersRound className="mb-3 text-blue-600" size={22} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Can view</p>
              <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{module.permissions.view.map((role) => ROLE_LABELS[role]).join(', ')}</p>
            </div>
            <div className="rounded-3xl bg-gray-50 p-5">
              <ShieldCheck className="mb-3 text-amber-600" size={22} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Can manage</p>
              <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{module.permissions.manage.map((role) => ROLE_LABELS[role]).join(', ')}</p>
            </div>
            <div className="rounded-3xl bg-gray-900 p-5 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-200">Scope</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-200">
                {module.tenantScoped ? 'School tenant data with row-level isolation and module entitlement checks.' : 'Global platform data managed by System Operators.'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Primary operational workflows">
          <div className="space-y-4">
            {module.primaryWorkflows.map((workflow, index) => (
              <div key={workflow} className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700">{index + 1}</div>
                <div>
                  <h3 className="font-black text-gray-900">{workflow}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                    The workflow will be backed by tenant-aware validation, approval trails, notifications, and exportable audit events.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Ghana-specific requirements">
          {module.ghanaRequirements?.length ? (
            <div className="space-y-4">
              {module.ghanaRequirements.map((requirement) => (
                <div key={requirement} className="rounded-3xl border border-green-100 bg-green-50 p-5 text-sm font-bold leading-6 text-green-900">
                  {requirement}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-gray-50 p-6 text-sm font-semibold leading-7 text-gray-600">
              No special Ghana-only constraints are required beyond tenant isolation, role permissions, and standard SchoolPro GH audit policies.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ModuleWorkspace;
