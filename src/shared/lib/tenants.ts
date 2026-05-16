import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where, addDoc } from 'firebase/firestore';

export interface Tenant {
  id?: string;
  name: string;
  registration_number?: string;
  email?: string;
  phone?: string;
  address?: string;
  region?: string;
  district?: string;
  logo_url?: string | null;
  plan?: string;
  created_at?: string;
}

// Returns a reference to a tenant-scoped collection, e.g. tenants/{tenantId}/{collection}
export const tenantCollection = (tenantId: string, collectionName: string) => {
  return collection(db, `tenants/${tenantId}/${collectionName}`);
};

// Create a tenant (school) document under top-level `tenants` collection
export const createTenant = async (tenant: Tenant) => {
  const tenantsCol = collection(db, 'tenants');
  const docRef = await addDoc(tenantsCol, {
    ...tenant,
    created_at: new Date().toISOString(),
  });

  const created = await getDoc(doc(db, 'tenants', docRef.id));
  return { id: docRef.id, ...(created.data() as Tenant) } as Tenant & { id: string };
};

export const getTenant = async (tenantId: string) => {
  const tenantDoc = await getDoc(doc(db, 'tenants', tenantId));
  if (!tenantDoc.exists()) return null;
  return { id: tenantDoc.id, ...(tenantDoc.data() as Tenant) } as Tenant & { id: string };
};

// Find tenant by registration number or name (simple helper)
export const findTenantBy = async (field: string, value: string) => {
  const tenantsCol = collection(db, 'tenants');
  const q = query(tenantsCol, where(field, '==', value));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Tenant) }));
};

// Initialize a default tenant structure (settings, default roles)
export const initializeTenantDefaults = async (tenantId: string) => {
  // Create default settings document
  const settingsRef = doc(db, `tenants/${tenantId}/settings/default`);
  await setDoc(settingsRef, {
    branding: {
      primary: '#F59E0B',
      accent: '#FB923C',
      logo_url: null,
    },
    academic: {
      default_term: 'Term 1',
      year: new Date().getFullYear(),
    },
    created_at: new Date().toISOString(),
  });

  // Seed a roles collection for the tenant
  const rolesCol = tenantCollection(tenantId, 'roles');
  await setDoc(doc(rolesCol, 'school_admin'), { name: 'school_admin', description: 'School administrator' });
  await setDoc(doc(rolesCol, 'teacher'), { name: 'teacher', description: 'Teacher' });
  await setDoc(doc(rolesCol, 'student'), { name: 'student', description: 'Student' });
  await setDoc(doc(rolesCol, 'parent'), { name: 'parent', description: 'Parent/Guardian' });

  return true;
};

export default {
  tenantCollection,
  createTenant,
  getTenant,
  findTenantBy,
  initializeTenantDefaults,
};
