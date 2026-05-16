import React from 'react';
import Card from '@/shared/components/common/Card';
import Table from '@/shared/components/common/Table';
import Button from '@/shared/components/common/Button';
import { MOCK_FEES } from '@/shared/lib/mockData';
import { 
  Wallet, Receipt, TrendingUp, Download, 
  ArrowUpRight, AlertCircle, PhoneCall 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sparkline from '@/shared/components/common/Sparkline';

const FeesManagement: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Financial Overview</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage tuition, PTA levies, and MoMo reconciliations.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Download size={18} />}>Report</Button>
           <Button icon={<Receipt size={18} />}>Record Payment</Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card p-8 bg-gradient-to-br from-success-600/20 to-success-900/20 border-success-500/20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-success-500/20 rounded-2xl text-success-400">
               <Wallet size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-success-400 uppercase tracking-widest">Total Collected</p>
               <h3 className="text-2xl font-black text-white">GHS 142,500.00</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-success-400">
             <ArrowUpRight size={14} className="mr-1" />
             <span>8.2% vs last term</span>
           </div>
          <div className="mt-4">
            <Sparkline data={[120, 150, 180, 160, 200, 240, 220]} width={200} height={40} stroke="#fff" />
          </div>
        </div>

        <div className="premium-card p-8 bg-gradient-to-br from-warning-600/20 to-warning-900/20 border-warning-500/20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-warning-500/20 rounded-2xl text-warning-400">
               <AlertCircle size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-warning-400 uppercase tracking-widest">Outstanding</p>
               <h3 className="text-2xl font-black text-white">GHS 24,300.00</h3>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-500">
             <span>42 students with balance</span>
          </div>
        </div>

        <div className="premium-card p-8 bg-gradient-to-br from-primary-600/20 to-primary-900/20 border-primary-500/20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-primary-500/20 rounded-2xl text-primary-400">
               <PhoneCall size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest">MoMo Payouts</p>
               <h3 className="text-2xl font-black text-white">GHS 12,800.00</h3>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-500">
             <span>Pending reconciliation: 5</span>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center">
              <Receipt size={20} className="mr-3 text-accent-400" />
              Recent Fee Transactions
            </h2>
            <div className="flex space-x-2">
              <Button variant="glass" size="sm">All</Button>
              <Button variant="glass" size="sm" className="opacity-50">Pending</Button>
            </div>
          </div>
        <Table
          columns={[
            { header: 'Student', accessor: 'student' },
            { 
              header: 'Fee Type', 
              accessor: (f) => (
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">{f.type}</span>
              ) 
            },
            { 
              header: 'Amount', 
              accessor: (f) => <span className="font-black text-white">GHS {f.amount.toLocaleString()}</span> 
            },
            { 
              header: 'Status', 
              accessor: (f) => (
                <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                  f.status === 'paid' ? 'bg-success-500/10 text-success-400' : 
                  f.status === 'partial' ? 'bg-warning-500/10 text-warning-400' : 
                  'bg-error-500/10 text-error-400'
                }`}>
                  {f.status}
                </span>
              ) 
            },
            { 
              header: 'Due Date', 
              accessor: (f) => <span className="text-slate-500 font-medium">{f.due_date}</span> 
            },
            {
              header: '',
              accessor: () => (
                <Button variant="glass" size="sm" className="py-1">Action</Button>
              ),
              className: 'text-right'
            }
          ]}
          data={MOCK_FEES}
          keyExtractor={(f) => f.id}
        />
      </div>
    </div>
  );
};

export default FeesManagement;
