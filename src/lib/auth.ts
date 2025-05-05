import { supabase } from './supabase';
import { getOfflineData, saveOfflineData } from './offlineSync';
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

interface AuthState {
  user: AuthUser | null;
  session: any | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  initialized: false,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session && data.user) {
        // Fetch additional user info from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        // Store user data offline for when offline
        await saveOfflineData('users', userData);

        set({
          user: userData as AuthUser,
          session: data.session,
          loading: false,
          initialized: true,
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Try to authenticate from offline storage
      if (!navigator.onLine) {
        try {
          const offlineUsers = await getOfflineData<any>('users');
          const user = (offlineUsers as any[]).find(u => u.email === email);
          
          if (user) {
            set({
              user: user as AuthUser,
              session: { offline: true },
              loading: false,
              initialized: true,
            });
            return;
          }
        } catch (offlineError) {
          console.error('Offline auth error:', offlineError);
        }
      }
      
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
      await supabase.auth.signOut();
      set({ user: null, session: null, loading: false });
    } catch (error: any) {
      console.error('Sign out error:', error);
      set({
        error: error.message || 'Error signing out',
        loading: false,
      });
    }
  },
}));

// Initialize auth state from session
export const initAuth = async () => {
  const { data } = await supabase.auth.getSession();
  
  if (data.session) {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.session.user.id)
      .single();
    
    if (!error && userData) {
      useAuth.setState({
        user: userData as AuthUser,
        session: data.session,
        loading: false,
        initialized: true,
      });
      
      // Store user data offline
      await saveOfflineData('users', userData);
    }
  } else {
    useAuth.setState({ loading: false, initialized: true });
  }
  
  // Setup auth state change listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (!error && userData) {
        useAuth.setState({
          user: userData as AuthUser,
          session: session,
          loading: false,
        });
        
        // Store user data offline
        await saveOfflineData('users', userData);
      }
    } else if (event === 'SIGNED_OUT') {
      useAuth.setState({ user: null, session: null });
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

// Check if the user has access to class-specific features
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
      // Check if they are a class teacher for this section
      if (sectionId) {
        const { data: section } = await supabase
          .from('sections')
          .select('*')
          .eq('id', sectionId)
          .eq('teacher_id', userId)
          .single();
        
        if (section) return true;
      }
      
      // Check if they teach any subject in this class
      const { data: teacherSubjects } = await supabase
        .from('teacher_subjects')
        .select('*')
        .eq('teacher_id', userId)
        .eq('class_id', classId);
      
      if (teacherSubjects && teacherSubjects.length > 0) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking class access:', error);
    return false;
  }
};