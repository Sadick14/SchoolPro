import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Bus, MapPin, Users, Plus, AlertCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ROUTES = [
  { id: '1', name: 'Spintex - Baatsona', driver: 'Kofi Mensah', bus: 'GH-1234-21', capacity: 45, assigned: 42, status: 'on_route' },
  { id: '2', name: 'East Legon - Madina', driver: 'Yaw Osei', bus: 'GR-5678-22', capacity: 30, assigned: 28, status: 'idle' },
  { id: '3', name: 'Dansoman - Korle Bu', driver: 'Kwame Appiah', bus: 'GW-9012-20', capacity: 45, assigned: 45, status: 'maintenance' },
];

const TransportManagement: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Fleet & Transport</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage school buses, routes, and student assignments.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<MapPin size={18} />}>View Map</Button>
           <Button icon={<Plus size={18} />}>New Route</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {MOCK_ROUTES.map((route, i) => (
           <motion.div
             key={route.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
           >
             <Card>
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 rounded-2xl bg-white/5 text-slate-300">
                   <Bus size={24} />
                 </div>
                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    route.status === 'on_route' ? 'bg-success-500/10 text-success-400 border border-success-500/20' :
                    route.status === 'idle' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                    'bg-error-500/10 text-error-400 border border-error-500/20'
                 }`}>
                   {route.status.replace('_', ' ')}
                 </span>
               </div>
               
               <h3 className="text-xl font-black text-white uppercase tracking-tight">{route.name}</h3>
               <p className="text-xs font-bold text-slate-500 tracking-widest mt-1">BUS: {route.bus}</p>
               
               <div className="mt-8 space-y-4">
                 <div className="flex justify-between text-xs font-bold text-slate-400">
                   <span>Capacity Used</span>
                   <span>{route.assigned} / {route.capacity}</span>
                 </div>
                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div 
                    className={`h-full rounded-full ${route.assigned >= route.capacity ? 'bg-error-500' : 'bg-primary-500'}`} 
                    style={{ width: `${(route.assigned/route.capacity)*100}%` }} 
                   />
                 </div>
               </div>

               <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                   <Users size={14} className="text-slate-500" />
                   <span>{route.driver}</span>
                 </div>
                 <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                   <Phone size={14} />
                 </button>
               </div>
             </Card>
           </motion.div>
         ))}
      </div>
    </div>
  );
};

export default TransportManagement;
