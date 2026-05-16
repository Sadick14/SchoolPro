import React from 'react';
import { motion } from 'framer-motion';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  density?: 'comfortable' | 'compact';
}

function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  keyExtractor,
  title,
  subtitle,
  actions,
  density = 'comfortable',
}: TableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }

    return (item[column.accessor] as React.ReactNode) || '-';
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const cellPadding = density === 'compact' ? 'px-5 py-3' : 'px-6 py-4';

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        {(title || subtitle || actions) && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              {title && <div className="h-5 w-40 animate-pulse rounded-lg bg-gray-200" />}
              {subtitle && <div className="mt-2 h-3 w-56 animate-pulse rounded-lg bg-gray-100" />}
            </div>
            {actions && <div className="h-9 w-24 animate-pulse rounded-xl bg-gray-100" />}
          </div>
        )}
        <div className="animate-pulse p-6">
          <div className="mb-4 h-10 w-full rounded-xl bg-gray-100" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="mb-3 h-14 w-full rounded-xl bg-gray-50 last:mb-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
    >
      {(title || subtitle || actions) && (
        <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h3 className="text-lg font-black tracking-tight text-gray-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm font-medium text-gray-500">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  className={`${cellPadding} ${alignClasses[column.align ?? 'left']} text-[11px] font-black uppercase tracking-[0.18em] text-gray-500 ${column.headerClassName || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-14 text-center text-sm font-semibold text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <motion.tr
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.03 }}
                  key={keyExtractor(item)}
                  className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-amber-50/40' : 'hover:bg-gray-50/70'}`}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`${cellPadding} ${alignClasses[column.align ?? 'left']} whitespace-nowrap text-sm font-semibold text-gray-700 ${column.className || ''}`}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Table;
