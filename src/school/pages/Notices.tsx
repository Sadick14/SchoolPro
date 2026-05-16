import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { MessageSquare, Bell, Mail, Smartphone, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_NOTICES = [
  { id: '1', title: 'PTA Meeting Rescheduled', channel: 'SMS', date: '2 hours ago', audience: 'All Parents' },
  { id: '2', title: 'Mid-Term Break', channel: 'App Push', date: '1 day ago', audience: 'Students & Parents' },
  { id: '3', title: 'Staff Briefing', channel: 'Email', date: '3 days ago', audience: 'All Teachers' },
];

const Notices: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Communication Desk</h1>
          <p className="text-slate-400 mt-1 font-medium">Broadcast SMS, app notifications, and emails.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button icon={<Plus size={18} />}>New Broadcast</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
          {MOCK_NOTICES.map((notice, idx) => (
             <motion.div
               key={notice.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
             >
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center">
                   {notice.channel === 'SMS' ? <Smartphone size={20} /> : notice.channel === 'Email' ? <Mail size={20} /> : <Bell size={20} />}
                 </div>
                 <div>
                   <h4 className="font-bold text-white uppercase tracking-tight">{notice.title}</h4>
                   <p className="text-xs text-slate-400 font-medium">To: {notice.audience} &bull; {notice.date}</p>
                 </div>
               </div>
               <div className="hidden sm:block text-right text-xs font-bold text-slate-500 uppercase tracking-widest">
                 {notice.channel}
               </div>
             </motion.div>
          ))}
        </div>
        
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-primary-900/30 to-[#0F172A] border-primary-500/20">
             <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-slate-400">Quick Tools</h3>
             <div className="space-y-3">
                <button className="w-full flex items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-sm font-bold">
                  <Smartphone size={16} className="mr-3 text-primary-400" /> Send Batch SMS
                </button>
                <button className="w-full flex items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-sm font-bold">
                  <Mail size={16} className="mr-3 text-accent-400" /> Blast Email
                </button>
                <button className="w-full flex items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-sm font-bold">
                  <MessageSquare size={16} className="mr-3 text-success-400" /> Parent Portal Chat
                </button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notices;
