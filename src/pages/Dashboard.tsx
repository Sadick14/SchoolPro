import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { useAuth } from '../lib/auth';
import { 
  Users, BookOpen, CalendarCheck, Bell, School, 
  TrendingUp, TrendingDown, MoreHorizontal, Plus, 
  Wallet, PieChart, CheckCircle2 
} from 'lucide-react';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import { MOCK_STATS, MOCK_STUDENTS, MOCK_NOTIFICATIONS } from '../lib/mockData';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = MOCK_STATS;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-[2rem] animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 h-96 bg-gray-200 rounded-[2rem] animate-pulse" />
           <div className="h-96 bg-gray-200 rounded-[2rem] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Akwaaba, <span className="text-primary-600 capitalize">{user?.full_name.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Here's what's happening in your school today.
          </p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Plus size={18} />}>Manage</Button>
           <Button icon={<Wallet size={18} />}>MoMo Portal</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card p-6 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl bg-primary-100 text-primary-600 group-hover:bg-primary-200 group-hover:text-primary-700 transition-colors`}>
                {stat.label.includes('Students') ? <Users size={20} /> : 
                 stat.label.includes('Attendance') ? <CalendarCheck size={20} /> :
                 stat.label.includes('Fees') ? <Wallet size={20} /> : <School size={20} />}
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.trend.startsWith('+') ? 'text-success-600' : 'text-error-600'}`}>
                {stat.trend.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center">
              <Users size={20} className="mr-3 text-primary-600" />
              Recent Admissions
            </h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <Table
            columns={[
              { 
                header: 'Student', 
                accessor: (s) => (
                  <div className="flex items-center space-x-3">
                    <img src={s.avatar} className="w-8 h-8 rounded-lg" alt="" />
                    <span className="font-bold">{s.full_name}</span>
                  </div>
                ) 
              },
              { header: 'Class', accessor: 'class' },
              { 
                header: 'Status', 
                accessor: (s) => (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    s.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                  }`}>
                    {s.status}
                  </span>
                ) 
              },
              { header: 'Fees', accessor: 'fees_paid', className: 'text-right' },
            ]}
            data={MOCK_STUDENTS}
            keyExtractor={(s) => s.id}
          />
        </div>

        {/* Notifications & Activity */}
        <div className="space-y-8">
          <Card title="Academics & Notices" className="h-full">
            <div className="space-y-6">
              {MOCK_NOTIFICATIONS.map((note, i) => (
                <div key={note.id} className="flex space-x-4 group cursor-pointer">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    note.type === 'payment' ? 'bg-success-600' : 
                    note.type === 'academic' ? 'bg-primary-600' : 'bg-accent-600'
                  } group-hover:scale-150 transition-transform`} />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{note.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium line-clamp-2">{note.content}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-2">2 HOURS AGO</p>
                  </div>
                </div>
              ))}
              <Button variant="glass" className="w-full mt-4 text-xs">Clear Notifications</Button>
            </div>
          </Card>

          {/* Quick Stats Mini-Card */}
          <div className="premium-card p-8 bg-gradient-to-br from-primary-500 to-accent-500 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <PieChart size={120} />
             </div>
             <h3 className="text-white font-black text-xl mb-2 relative z-10">Ghana Education Service</h3>
             <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-6 relative z-10">Report Status: Finalizing</p>
             <div className="flex items-center space-x-2 text-white relative z-10 bg-white/20 p-2 rounded-xl border border-white/30 backdrop-blur-sm">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-bold uppercase">Ready for export</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;