import { useEffect } from 'react';
import { useAuthStore } from '@/stores';
import { activeAuthService as authService } from '@/shared/services';

// Global flag to prevent multiple initializations
let authInitialized = false;

export const useAuth = () => {
  const { user, isLoading, error, setUser, setLoading, setError, logout } = useAuthStore();

  useEffect(() => {
    // Only run once globally
    if (authInitialized) return;
    authInitialized = true;

    setLoading(true);
    const unsubscribe = authService.onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      authInitialized = false; // Reset on unmount (for HMR)
    };
  }, [setUser, setLoading]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const authUser = await authService.signInWithEmail(email, password);
      setUser(authUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signUpWithEmail(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signInWithGoogle();
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login com Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
};
