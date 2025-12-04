import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';
import type { User } from '@/types';

export const authService = {
  async signInWithEmail(email: string, password: string): Promise<User> {
    if (!auth) throw new Error('Firebase not initialized');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return this.mapFirebaseUser(userCredential.user);
  },

  async signUpWithEmail(email: string, password: string): Promise<User> {
    if (!auth) throw new Error('Firebase not initialized');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return this.mapFirebaseUser(userCredential.user);
  },

  async signInWithGoogle(): Promise<User> {
    if (!auth || !googleProvider) throw new Error('Firebase not initialized');
    const userCredential = await signInWithPopup(auth, googleProvider);
    return this.mapFirebaseUser(userCredential.user);
  },

  async signOut(): Promise<void> {
    if (!auth) throw new Error('Firebase not initialized');
    await signOut(auth);
  },

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!auth) {
      // Return a no-op unsubscribe function if Firebase is not initialized
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(this.mapFirebaseUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  },

  mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    };
  },
};
