import { useEffect } from 'react';
import { useAuthStore } from '@/stores';
import { authService } from '@/shared/services';

export const useAuth = () => {
  const { user, isLoading, error, setUser, setLoading, setError, logout } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signInWithEmail(email, password);
      setUser(user);
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
