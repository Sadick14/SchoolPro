import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { Building, Users, AlertCircle, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_HOSTELS = [
  { id: '1', name: 'Boys Block A', warden: 'Mr. Osei', capacity: 120, occupied: 110, status: 'good' },
  { id: '2', name: 'Girls Block A', warden: 'Mrs. Mensah', capacity: 150, occupied: 150, status: 'full' },
  { id: '3', name: 'Annex Block', warden: 'Mr. Ansah', capacity: 80, occupied: 45, status: 'maintenance' },
];

const HostelManagement: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Hostels & Residency</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage student boarding, rooms, and wardens.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Search size={18} />}>Find Student</Button>
           <Button icon={<Plus size={18} />}>Allocate Room</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_HOSTELS.map((hostel, i) => (
          <motion.div
             key={hostel.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
           >
             <Card className="group cursor-pointer">
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 rounded-xl bg-white/5 text-slate-300 group-hover:bg-primary-600/20 group-hover:text-primary-400 transition-colors">
                   <Building size={24} />
                 </div>
                 <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    hostel.status === 'full' ? 'bg-error-500/10 text-error-400 border border-error-500/20' :
                    hostel.status === 'good' ? 'bg-success-500/10 text-success-400 border border-success-500/20' :
                    'bg-warning-500/10 text-warning-400 border border-warning-500/20'
                 }`}>
                   {hostel.status}
                 </span>
               </div>
               
               <h3 className="text-xl font-black text-white uppercase tracking-tight">{hostel.name}</h3>
               <p className="text-xs font-bold text-slate-500 mt-1">Warden: <span className="text-slate-300">{hostel.warden}</span></p>
               
               <div className="mt-8 pt-4 border-t border-white/5">
                 <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                   <span>Occupancy</span>
                   <span>{hostel.occupied} / {hostel.capacity} Beds</span>
                 </div>
                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div 
                    className={`h-full rounded-full transition-all duration-500 ${hostel.occupied >= hostel.capacity ? 'bg-error-500' : 'bg-primary-500'}`} 
                    style={{ width: `${(hostel.occupied/hostel.capacity)*100}%` }} 
                   />
                 </div>
               </div>
             </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HostelManagement;
