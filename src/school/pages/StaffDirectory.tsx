import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import Table from '@/shared/components/common/Table';
import { UserCircle, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_STAFF = [
  { id: 'S001', name: 'Dr. Kwame Nkrumah', role: 'Headmaster', department: 'Administration', status: 'active' },
  { id: 'S002', name: 'Mrs. Yaa Asantewaa', role: 'Senior Science Tutor', department: 'Science', status: 'active' },
  { id: 'S003', name: 'Mr. Kofi Annan', role: 'Accountant', department: 'Finance', status: 'on_leave' },
  { id: 'S004', name: 'Ms. Abena Osei', role: 'Librarian', department: 'Library', status: 'active' },
];

const StaffDirectory: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Staff & HR</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage school personnel, payroll links, and leave.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Filter size={18} />}>Departments</Button>
           <Button icon={<Plus size={18} />}>Add Staff</Button>
        </div>
      </div>

      <Table
        columns={[
          { 
            header: 'Staff Member', 
            accessor: (s) => (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center text-slate-400">
                  <UserCircle size={24} />
                </div>
                <div>
                  <div className="font-bold text-white uppercase tracking-tight text-xs">{s.name}</div>
                  <div className="text-[10px] text-slate-500 font-black mt-0.5">{s.id}</div>
                </div>
              </div>
            ) 
          },
          { 
            header: 'Position', 
            accessor: (s) => (
              <div>
                <div className="font-bold text-primary-400">{s.role}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">{s.department}</div>
              </div>
            ) 
          },
          { 
            header: 'Status', 
            accessor: (s) => (
              <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                s.status === 'active' 
                ? 'bg-success-500/10 text-success-400 border border-success-500/20' 
                : 'bg-warning-500/10 text-warning-400 border border-warning-500/20'
              }`}>
                {s.status.replace('_', ' ')}
              </span>
            ) 
          }
        ]}
        data={MOCK_STAFF}
        keyExtractor={(s) => s.id}
      />
    </div>
  );
};

export default StaffDirectory;
