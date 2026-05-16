import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { BookOpen, Users, Clock, Plus, Layers, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CLASSES = [
  { id: 'cl-1', name: 'Form 1', stream: 'Science A', students: 45, teacher: 'Dr. Mensah' },
  { id: 'cl-2', name: 'Form 2', stream: 'Business B', students: 38, teacher: 'Mrs. Appiah' },
  { id: 'cl-3', name: 'Form 3', stream: 'General Arts', students: 52, teacher: 'Mr. Boateng' },
  { id: 'cl-4', name: 'Form 1', stream: 'Visual Arts', students: 30, teacher: 'Ms. Owusu' },
];

const ClassesList: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Structures</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage streams, classes, and course assignments.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Layers size={18} />}>Course Map</Button>
           <Button icon={<Plus size={18} />}>Add Class</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CLASSES.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card p-6 flex flex-col group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-primary-600/10 text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                <GraduationCap size={24} />
              </div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">
                Active
              </div>
            </div>
            
            <h3 className="text-xl font-black text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{cls.name}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{cls.stream}</p>
            
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center text-xs font-bold text-slate-400">
                <Users size={14} className="mr-2" />
                <span>{cls.students} Enrolled Students</span>
              </div>
              <div className="flex items-center text-xs font-bold text-slate-500">
                <Clock size={14} className="mr-2" />
                <span>Lead: <span className="text-slate-300 ml-1">{cls.teacher}</span></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Curriculum Summary */}
      <Card title="GES Curriculum Support" className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-tight">Active Curriculums</h4>
            <div className="space-y-3">
              {['NaCCA (Ghana)', 'WAEC Standards', 'Cambridge IGCSE'].map(c => (
                <div key={c} className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                  <span className="text-sm font-bold text-slate-200">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 bg-primary-600/10 border border-primary-500/20 rounded-3xl flex flex-col justify-center items-center text-center">
             <BookOpen size={48} className="text-primary-400 mb-4" />
             <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Academic Readiness</h4>
             <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs">
               Your school is currently configured for Ghana Education Service (GES) compliance across all streams.
             </p>
             <Button variant="glass" size="sm" className="mt-6">Edit Compliance</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClassesList;
