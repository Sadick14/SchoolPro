import React, { useMemo, useState } from 'react';
import { CheckCircle2, CircleDot, Clock3, LockKeyhole, Search, Workflow } from 'lucide-react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import {
  ARCHITECTURE_LAYERS,
  DOMAIN_LABELS,
  GHANA_COMPLIANCE_PACK,
  ONBOARDING_STEPS,
  OPERATION_MODES,
  PLATFORM_MODULES,
  ROLE_LABELS,
  STUDENT_LIFECYCLE,
  TENANT_ISOLATION_CONTROLS,
  implementationProgress,
  type ImplementationStatus,
  type PlatformDomain,
} from '@/shared/lib/platform';

const statusStyles: Record<ImplementationStatus, string> = {
  ready: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
  planned: 'bg-slate-100 text-slate-700 border-slate-200',
};

const statusLabels: Record<ImplementationStatus, string> = {
  ready: 'Foundation ready',
  in_progress: 'UI wired',
  planned: 'Next build',
};

const domains = Object.keys(DOMAIN_LABELS) as PlatformDomain[];

const ImplementationCommandCenter: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<PlatformDomain | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PLATFORM_MODULES.filter((module) => {
      const matchesDomain = activeDomain === 'all' || module.domain === activeDomain;
      const matchesSearch =
        !query ||
        [module.name, module.summary, module.domain, ...module.capabilities, ...module.primaryWorkflows]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return matchesDomain && matchesSearch;
    });
  }, [activeDomain, search]);

  const readyCount = PLATFORM_MODULES.filter((module) => module.status === 'ready').length;
  const tenantScopedCount = PLATFORM_MODULES.filter((module) => module.tenantScoped).length;

  return (
    <div className="space-y-8 pb-12">
      <section className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-2xl overflow-hidden relative">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-amber-100">
              Production implementation baseline
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">SchoolPro GH full ERP build command center</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              This converts the blueprint into a live implementation map: tenant control plane, school workspaces, role portals,
              Ghana-ready compliance requirements, subscription billing, and the operational modules needed for a scalable SaaS ERP.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary">Continue build</Button>
              <Button variant="glass">Review architecture</Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm font-bold text-slate-200">
              <span>Foundation progress</span>
              <span>{implementationProgress}%</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-gradient-to-r from-amber-300 to-orange-400" style={{ width: `${implementationProgress}%` }} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-2xl font-black">{PLATFORM_MODULES.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Modules</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-2xl font-black">{readyCount}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Ready</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-2xl font-black">{tenantScopedCount}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Tenant scoped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {ARCHITECTURE_LAYERS.map((layer) => {
          const Icon = layer.icon;
          return (
            <Card key={layer.title} className="h-full" variant="solid">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900">{layer.title}</h3>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">{layer.owner}</p>
                <p className="mt-4 text-sm font-medium leading-6 text-gray-600">{layer.details}</p>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1.35fr_0.65fr]">
        <Card
          title="Module implementation registry"
          headerAction={
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                className="w-64 rounded-2xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm font-semibold outline-none focus:border-amber-400"
                placeholder="Search modules..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          }
        >
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${activeDomain === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveDomain('all')}
              type="button"
            >
              All domains
            </button>
            {domains.map((domain) => (
              <button
                key={domain}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${activeDomain === domain ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setActiveDomain(domain)}
                type="button"
              >
                {DOMAIN_LABELS[domain]}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredModules.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.id} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black text-gray-900">{module.name}</h3>
                          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${statusStyles[module.status]}`}>
                            {statusLabels[module.status]}
                          </span>
                          {module.tenantScoped && (
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700">Tenant scoped</span>
                          )}
                        </div>
                        <p className="mt-2 text-sm font-medium leading-6 text-gray-600">{module.summary}</p>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Capabilities</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {module.capabilities.map((capability) => (
                                <span key={capability} className="rounded-xl bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">{capability}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Workflow owners</p>
                            <p className="mt-2 text-xs font-bold leading-5 text-gray-600">
                              View: {module.permissions.view.map((role) => ROLE_LABELS[role]).join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a className="text-sm font-black text-primary-600 hover:text-primary-700" href={module.route}>Open module →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </Card>

        <div className="space-y-8">
          <Card title="School operation modes">
            <div className="space-y-4">
              {Object.entries(OPERATION_MODES).map(([key, mode]) => (
                <div key={key} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="font-black text-gray-900">{mode.label}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-600">{mode.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mode.examples.map((example) => (
                      <span key={example} className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-gray-500">{example}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Tenant isolation controls">
            <div className="space-y-3">
              {TENANT_ISOLATION_CONTROLS.map((control) => (
                <div key={control} className="flex gap-3 text-sm font-semibold leading-6 text-gray-700">
                  <LockKeyhole className="mt-1 shrink-0 text-emerald-600" size={16} />
                  <span>{control}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <Card title="Multi-school onboarding flow">
          <div className="space-y-5">
            {ONBOARDING_STEPS.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700">{index + 1}</div>
                  {index < ONBOARDING_STEPS.length - 1 && <div className="mt-2 h-full w-px bg-gray-200" />}
                </div>
                <div className="pb-4">
                  <h3 className="font-black text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-gray-400">Owner: {ROLE_LABELS[step.owner]}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-600">{step.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.deliverables.map((deliverable) => (
                      <span key={deliverable} className="rounded-xl bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">{deliverable}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="End-to-end student lifecycle">
          <div className="space-y-4">
            {STUDENT_LIFECYCLE.map((stage, index) => (
              <div key={stage.id} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  {index === STUDENT_LIFECYCLE.length - 1 ? <CheckCircle2 className="text-emerald-600" size={20} /> : <CircleDot className="text-amber-600" size={20} />}
                  <div>
                    <h3 className="font-black text-gray-900">{stage.stage}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-gray-600">{stage.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700">{stage.systemOfRecord}</span>
                      {stage.requiredModules.map((module) => (
                        <span key={module} className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-gray-500">{module}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card title="Ghana compliance pack" className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {GHANA_COMPLIANCE_PACK.map((requirement) => (
              <div key={requirement} className="rounded-3xl border border-green-100 bg-green-50 p-5 text-sm font-bold leading-6 text-green-900">
                <CheckCircle2 className="mb-3 text-green-600" size={20} />
                {requirement}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Next implementation sprint">
          <div className="space-y-4">
            {[
              'Persist module registry in Supabase with tenant feature entitlements.',
              'Convert onboarding checklist into validated create-school wizard steps.',
              'Back finance/payroll/LMS/clinic workspaces with tenant-scoped tables and RLS policies.',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm font-semibold leading-6 text-gray-700">
                <Clock3 className="mt-1 shrink-0 text-amber-600" size={16} />
                <span>{item}</span>
              </div>
            ))}
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                <Workflow size={16} /> Build order
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">
                Control plane → tenant setup → academic core → finance ledger → people/welfare modules → reporting/API scale-out.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ImplementationCommandCenter;
