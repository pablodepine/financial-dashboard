import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { Dashboard } from '@/types';

const COLLECTION_NAME = 'dashboards';

const getDb = () => {
  if (!db) throw new Error('Firebase not initialized');
  return db;
};

export const dashboardService = {
  async create(userId: string, name: string, description: string): Promise<Dashboard> {
    const now = new Date();
    const docRef = await addDoc(collection(getDb(), COLLECTION_NAME), {
      userId,
      name,
      description,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    });

    return {
      id: docRef.id,
      userId,
      name,
      description,
      createdAt: now,
      updatedAt: now,
    };
  },

  async getById(id: string): Promise<Dashboard | null> {
    const docRef = doc(getDb(), COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      userId: data.userId,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  },

  async getByUserId(userId: string): Promise<Dashboard[]> {
    const q = query(collection(getDb(), COLLECTION_NAME), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        name: data.name,
        description: data.description,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    });
  },

  async update(id: string, updates: Partial<Omit<Dashboard, 'id'>>): Promise<void> {
    const docRef = doc(getDb(), COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(getDb(), COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};
