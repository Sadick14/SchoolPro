import React from 'react';
import { motion } from 'framer-motion';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
}

function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  keyExtractor,
}: TableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    
    return (item[column.accessor] as React.ReactNode) || '-';
  };
  
  if (isLoading) {
    return (
      <div className="backdrop-blur-sm bg-white/90 border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
        <div className="animate-pulse p-8">
          <div className="h-8 bg-gray-200 rounded-xl w-full mb-6"></div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-14 bg-gray-100 rounded-xl w-full mb-3 last:mb-0"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto backdrop-blur-sm bg-white/90 border border-gray-200 rounded-[2rem] shadow-lg"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-amber-400 to-orange-400 text-white">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-8 py-5 text-left text-[11px] font-extrabold uppercase tracking-[0.2em] ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-8 py-12 text-center text-sm font-medium text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
                key={keyExtractor(item)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={`px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-800 ${column.className || ''}`}
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
}

export default Table;