import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { supabase } from './supabase';

// Define the schema for our offline database
interface SchoolManagementDB extends DBSchema {
  syncQueue: {
    key: string;
    value: {
      id: string;
      table: string;
      operation: 'INSERT' | 'UPDATE' | 'DELETE';
      data: any;
      timestamp: number;
    };
    indexes: { 'by-timestamp': number };
  };
  schools: {
    key: string;
    value: any;
  };
  users: {
    key: string;
    value: any;
    indexes: { 'by-email': string; 'by-role': string; 'by-school': string };
  };
  students: {
    key: string;
    value: any;
    indexes: { 'by-class': string; 'by-school': string };
  };
  classes: {
    key: string;
    value: any;
    indexes: { 'by-school': string };
  };
  sections: {
    key: string;
    value: any;
    indexes: { 'by-class': string };
  };
  subjects: {
    key: string;
    value: any;
    indexes: { 'by-school': string };
  };
  teacher_subjects: {
    key: string;
    value: any;
    indexes: { 'by-teacher': string; 'by-class': string; 'by-subject': string };
  };
  attendance: {
    key: string;
    value: any;
    indexes: { 'by-date': string; 'by-student': string; 'by-class': string };
  };
  assessments: {
    key: string;
    value: any;
    indexes: { 'by-class': string; 'by-subject': string };
  };
  assessment_marks: {
    key: string;
    value: any;
    indexes: { 'by-assessment': string; 'by-student': string };
  };
  fees: {
    key: string;
    value: any;
    indexes: { 'by-school': string; 'by-class': string };
  };
  fee_payments: {
    key: string;
    value: any;
    indexes: { 'by-student': string; 'by-fee': string };
  };
  notifications: {
    key: string;
    value: any;
    indexes: { 'by-school': string; 'by-audience': string };
  };
}

// Initialize the IndexedDB
let db: IDBPDatabase<SchoolManagementDB>;

export async function initOfflineDB() {
  db = await openDB<SchoolManagementDB>('school-management-system', 1, {
    upgrade(db) {
      // Create stores for each table with indexes
      const syncQueueStore = db.createObjectStore('syncQueue', { keyPath: 'id' });
      syncQueueStore.createIndex('by-timestamp', 'timestamp');

      const usersStore = db.createObjectStore('users', { keyPath: 'id' });
      usersStore.createIndex('by-email', 'email');
      usersStore.createIndex('by-role', 'role');
      usersStore.createIndex('by-school', 'school_id');

      db.createObjectStore('schools', { keyPath: 'id' });

      const studentsStore = db.createObjectStore('students', { keyPath: 'id' });
      studentsStore.createIndex('by-class', 'current_class_id');
      studentsStore.createIndex('by-school', 'school_id');

      const classesStore = db.createObjectStore('classes', { keyPath: 'id' });
      classesStore.createIndex('by-school', 'school_id');

      const sectionsStore = db.createObjectStore('sections', { keyPath: 'id' });
      sectionsStore.createIndex('by-class', 'class_id');

      const subjectsStore = db.createObjectStore('subjects', { keyPath: 'id' });
      subjectsStore.createIndex('by-school', 'school_id');

      const teacherSubjectsStore = db.createObjectStore('teacher_subjects', { keyPath: 'id' });
      teacherSubjectsStore.createIndex('by-teacher', 'teacher_id');
      teacherSubjectsStore.createIndex('by-class', 'class_id');
      teacherSubjectsStore.createIndex('by-subject', 'subject_id');

      const attendanceStore = db.createObjectStore('attendance', { keyPath: 'id' });
      attendanceStore.createIndex('by-date', 'date');
      attendanceStore.createIndex('by-student', 'student_id');
      attendanceStore.createIndex('by-class', 'class_id');

      const assessmentsStore = db.createObjectStore('assessments', { keyPath: 'id' });
      assessmentsStore.createIndex('by-class', 'class_id');
      assessmentsStore.createIndex('by-subject', 'subject_id');

      const assessmentMarksStore = db.createObjectStore('assessment_marks', { keyPath: 'id' });
      assessmentMarksStore.createIndex('by-assessment', 'assessment_id');
      assessmentMarksStore.createIndex('by-student', 'student_id');

      const feesStore = db.createObjectStore('fees', { keyPath: 'id' });
      feesStore.createIndex('by-school', 'school_id');
      feesStore.createIndex('by-class', 'class_id');

      const feePaymentsStore = db.createObjectStore('fee_payments', { keyPath: 'id' });
      feePaymentsStore.createIndex('by-student', 'student_id');
      feePaymentsStore.createIndex('by-fee', 'fee_id');

      const notificationsStore = db.createObjectStore('notifications', { keyPath: 'id' });
      notificationsStore.createIndex('by-school', 'school_id');
      notificationsStore.createIndex('by-audience', 'target_audience');
    },
  });

  return db;
}

// Function to add an item to the sync queue
export async function addToSyncQueue(
  table: string,
  operation: 'INSERT' | 'UPDATE' | 'DELETE',
  data: any
) {
  if (!db) await initOfflineDB();
  
  const syncItem = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    table,
    operation,
    data,
    timestamp: Date.now(),
  };
  
  await db.add('syncQueue', syncItem);
}

// Function to get data from offline storage
export async function getOfflineData<T>(table: string, id?: string): Promise<T | T[]> {
  if (!db) await initOfflineDB();
  
  if (id) {
    return db.get(table, id) as Promise<T>;
  } else {
    return db.getAll(table) as Promise<T[]>;
  }
}

// Function to save data to offline storage
export async function saveOfflineData(table: string, data: any): Promise<void> {
  if (!db) await initOfflineDB();
  
  await db.put(table, data);
  
  // Add to sync queue if we're offline
  if (!navigator.onLine) {
    await addToSyncQueue(table, data.id ? 'UPDATE' : 'INSERT', data);
  }
}

// Function to delete data from offline storage
export async function deleteOfflineData(table: string, id: string): Promise<void> {
  if (!db) await initOfflineDB();
  
  await db.delete(table, id);
  
  // Add to sync queue if we're offline
  if (!navigator.onLine) {
    await addToSyncQueue(table, 'DELETE', { id });
  }
}

// Function to sync data with Supabase when back online
export async function syncWithServer(): Promise<void> {
  if (!db) await initOfflineDB();
  
  const syncItems = await db.getAllFromIndex('syncQueue', 'by-timestamp');
  
  for (const item of syncItems) {
    try {
      switch (item.operation) {
        case 'INSERT':
          await supabase.from(item.table).insert(item.data);
          break;
        case 'UPDATE':
          await supabase.from(item.table).update(item.data).eq('id', item.data.id);
          break;
        case 'DELETE':
          await supabase.from(item.table).delete().eq('id', item.data.id);
          break;
      }
      
      // Remove from sync queue after successful sync
      await db.delete('syncQueue', item.id);
    } catch (error) {
      console.error('Error syncing item:', item, error);
      // We don't remove from queue so it can try again later
    }
  }
}

// Listen for online status to trigger sync
if (typeof window !== 'undefined') {
  window.addEventListener('online', async () => {
    console.log('Back online, syncing data...');
    try {
      await syncWithServer();
    } catch (error) {
      console.error('Error during sync:', error);
    }
  });
}