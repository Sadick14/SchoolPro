import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';

export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'parent' | 'student';

interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  school_id: string | null;
  avatar_url: string | null;
}

// Demo accounts for testing (email -> password)
const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  'admin@schoolpro.demo': {
    password: 'demo123',
    user: {
      id: 'demo-admin-1',
      email: 'admin@schoolpro.demo',
      full_name: 'Samuel Mensah',
      role: 'school_admin',
      school_id: 'sch-1',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel',
    }
  },
  'teacher@schoolpro.demo': {
    password: 'demo123',
    user: {
      id: 'demo-teacher-1',
      email: 'teacher@schoolpro.demo',
      full_name: 'Ama Boateng',
      role: 'teacher',
      school_id: 'sch-1',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ama',
    }
  },
  'parent@schoolpro.demo': {
    password: 'demo123',
    user: {
      id: 'demo-parent-1',
      email: 'parent@schoolpro.demo',
      full_name: 'Kofi Adjei',
      role: 'parent',
      school_id: 'sch-1',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi',
    }
  },
  'student@schoolpro.demo': {
    password: 'demo123',
    user: {
      id: 'demo-student-1',
      email: 'student@schoolpro.demo',
      full_name: 'Kwame Mensah',
      role: 'student',
      school_id: 'sch-1',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame',
    }
  },
};

interface AuthState {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  firebaseUser: null,
  loading: true,
  error: null,
  initialized: false,
  isDemoMode: false,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // Check demo accounts first
      const demoAccount = DEMO_ACCOUNTS[email.toLowerCase()];
      if (demoAccount && demoAccount.password === password) {
        set({
          user: demoAccount.user,
          firebaseUser: null,
          isDemoMode: true,
          loading: false,
          initialized: true,
        });
        return;
      }

      // Fall back to Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fUser = userCredential.user;

      // Fetch additional user info from Firestore
      const userDoc = await getDoc(doc(db, 'users', fUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as AuthUser;
        set({
          user: { ...userData, id: fUser.uid },
          firebaseUser: fUser,
          isDemoMode: false,
          loading: false,
          initialized: true,
        });
      } else {
        throw new Error('User profile not found in system.');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      set({
        error: error.message || 'Error signing in',
        loading: false,
        initialized: true,
      });
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      const state = useAuth.getState();
      if (state.isDemoMode) {
        // For demo mode, just clear the user
        set({ user: null, firebaseUser: null, loading: false, isDemoMode: false });
      } else {
        // For Firebase, sign out properly
        await firebaseSignOut(auth);
        set({ user: null, firebaseUser: null, loading: false });
      }
    } catch (error: any) {
      console.error('Sign out error:', error);
      set({
        error: error.message || 'Error signing out',
        loading: false,
      });
    }
  },
}));

// Initialize auth state from Firebase
export const initAuth = () => {
  return onAuthStateChanged(auth, async (fUser) => {
    if (fUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', fUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as AuthUser;
          useAuth.setState({
            user: { ...userData, id: fUser.uid },
            firebaseUser: fUser,
            loading: false,
            initialized: true,
          });
        }
      } catch (error) {
        console.error('Error initializing user profile:', error);
        useAuth.setState({ loading: false, initialized: true });
      }
    } else {
      useAuth.setState({ user: null, firebaseUser: null, loading: false, initialized: true });
    }
  });
};

// Check if the user has the required role
export const hasRole = (user: AuthUser | null, roles: UserRole | UserRole[]): boolean => {
  if (!user) return false;
  
  if (Array.isArray(roles)) {
    return roles.includes(user.role);
  }
  
  return user.role === roles;
};

// Check if the user has access to class-specific features (Firestore version)
export const hasClassAccess = async (
  userId: string,
  classId: string,
  sectionId?: string
): Promise<boolean> => {
  try {
    const user = useAuth.getState().user;
    
    if (!user) return false;
    
    // Super admins and school admins have access to everything
    if (user.role === 'super_admin' || user.role === 'school_admin') {
      return true;
    }
    
    // For teachers, check if they are assigned to this class
    if (user.role === 'teacher') {
      // Logic for teacher access will go here once collections are setup
      // For now, return false to be safe
      return false; 
    }
    
    return false;
  } catch (error) {
    console.error('Error checking class access:', error);
    return false;
  }
};