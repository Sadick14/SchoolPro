import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { BookOpen, Users, LogIn, Library as LibraryIcon, Search, Plus, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_BOOKS = [
  { id: 'b1', title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'Literature', status: 'available', copies: 12 },
  { id: 'b2', title: 'Biology for SHS', author: 'M. Boateng', category: 'Science', status: 'borrowed', copies: 4 },
  { id: 'b3', title: 'Core Mathematics', author: 'Aki-Ola', category: 'Mathematics', status: 'available', copies: 30 },
  { id: 'b4', title: 'The Gods Are Not To Blame', author: 'Ola Rotimi', category: 'Literature', status: 'low_stock', copies: 2 },
];

const LibraryManagement: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Library & Resources</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage book inventory, digital resources, and borrowing.</p>
        </motion.div>
        
        <div className="flex items-center space-x-3">
           <Button variant="glass" icon={<Search size={18} />}>Search Catalog</Button>
           <Button icon={<Plus size={18} />}>Add Book</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Volumes</p>
            <h2 className="text-3xl font-black text-white mt-1">12,450</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
            <LibraryIcon size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Currently Borrowed</p>
            <h2 className="text-3xl font-black text-white mt-1">342</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-warning-500/10 flex items-center justify-center text-warning-400">
            <Users size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Overdue Returns</p>
            <h2 className="text-3xl font-black text-error-400 mt-1">18</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-error-500/10 flex items-center justify-center text-error-400">
            <LogIn size={24} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white tracking-tight">Recent Additions</h3>
          
          <div className="space-y-4">
            {MOCK_BOOKS.map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center shadow-premium">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{book.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{book.author} &bull; {book.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-300">{book.copies} copies</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    book.status === 'available' ? 'bg-success-500/10 text-success-400 border border-success-500/20' :
                    book.status === 'borrowed' ? 'bg-warning-500/10 text-warning-400 border border-warning-500/20' :
                    'bg-error-500/10 text-error-400 border border-error-500/20'
                  }`}>
                    {book.status.replace('_', ' ')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary-900/40 to-slate-900/80 border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Digital Library</h3>
            <p className="text-sm text-slate-400 mb-6">Students can access past questions, interactive modules, and e-books portal.</p>
            
            <div className="space-y-3">
               <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between group transition-colors">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center">
                     <BookOpen size={16} />
                   </div>
                   <span className="font-bold text-sm text-slate-200 group-hover:text-white">Past Questions</span>
                 </div>
                 <ExternalLink size={16} className="text-slate-500 group-hover:text-primary-400" />
               </button>

               <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between group transition-colors">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-accent-500/20 text-accent-400 flex items-center justify-center">
                     <LibraryIcon size={16} />
                   </div>
                   <span className="font-bold text-sm text-slate-200 group-hover:text-white">eBooks Portal</span>
                 </div>
                 <ExternalLink size={16} className="text-slate-500 group-hover:text-accent-400" />
               </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LibraryManagement;
