import React, { useState } from 'react';
import Table from '@/shared/components/common/Table';
import Button from '@/shared/components/common/Button';
import Input from '@/shared/components/common/Input';
import { MOCK_STUDENTS } from '@/shared/lib/mockData';
import { Search, UserPlus, Filter, Download, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admission_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Student Registry</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage admissions, profiles and academic status.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Download size={18} />}>Export</Button>
           <Button icon={<UserPlus size={18} />}>New Admission</Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input 
            placeholder="Search by name or admission ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>
        <Button variant="glass" icon={<Filter size={18} />}>Filter: All Forms</Button>
        <Button variant="glass">Stream: All</Button>
      </div>

      {/* Table Section */}
      <Table
        columns={[
          { 
            header: 'Student Name', 
            accessor: (s) => (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase tracking-tight text-xs">{s.full_name}</div>
                  <div className="text-[10px] text-slate-500 font-black mt-0.5">{s.admission_id}</div>
                </div>
              </div>
            ) 
          },
          { 
            header: 'Academic Info', 
            accessor: (s) => (
              <div>
                <div className="font-bold text-primary-400">{s.class}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">{s.stream}</div>
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
                {s.status}
              </span>
            ) 
          },
          { 
            header: 'Attendance', 
            accessor: (s) => (
              <div className="w-full max-w-[100px]">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase">
                  <span>Usage</span>
                  <span>{s.attendance}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div 
                    className={`h-full rounded-full ${parseInt(s.attendance) > 80 ? 'bg-success-500' : 'bg-warning-500'}`} 
                    style={{ width: s.attendance }} 
                   />
                </div>
              </div>
            ) 
          },
          {
            header: '',
            accessor: () => (
              <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
                <MoreVertical size={16} />
              </button>
            ),
            className: 'text-right'
          }
        ]}
        data={filteredStudents}
        keyExtractor={(s) => s.id}
      />
    </div>
  );
};

export default StudentsList;
