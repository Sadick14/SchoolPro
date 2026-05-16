import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { ClipboardCheck, FileText, BarChart, Plus, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_EXAMS = [
  { id: '1', title: 'End of Term 1 - Core Subjects', term: 'Term 1', date: 'Dec 12, 2026', status: 'upcoming' },
  { id: '2', title: 'Mid-Term Assessment', term: 'Term 1', date: 'Oct 20, 2026', status: 'completed' },
  { id: '3', title: 'WAEC Mock Exams', term: 'Term 3', date: 'Jul 15, 2026', status: 'completed' },
];

const AssessmentsList: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Examinations</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage grading, continuous assessments, and report cards.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<BarChart size={18} />}>Analytics</Button>
           <Button icon={<Plus size={18} />}>Schedule Exam</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EXAMS.map((exam, i) => (
          <motion.div
             key={exam.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
           >
             <Card>
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 rounded-2xl bg-white/5 text-primary-400">
                   <ClipboardCheck size={24} />
                 </div>
                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    exam.status === 'completed' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                    'bg-warning-500/10 text-warning-400 border border-warning-500/20'
                 }`}>
                   {exam.status}
                 </span>
               </div>
               
               <h3 className="text-xl font-black text-white uppercase tracking-tight">{exam.title}</h3>
               <p className="text-xs font-bold text-slate-500 tracking-widest mt-1">{exam.term}</p>
               
               <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                   <Calendar size={14} className="text-slate-500" />
                   <span>{exam.date}</span>
                 </div>
                 <button className="text-xs font-bold text-primary-400 hover:text-primary-300 transition-colors uppercase tracking-wider">
                   View Scope &rarr;
                 </button>
               </div>
             </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentsList;
