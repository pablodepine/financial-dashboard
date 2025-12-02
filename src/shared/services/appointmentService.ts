import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { Appointment, ExpenseAppointment, IncomeAppointment } from '@/types';

const COLLECTION_NAME = 'appointments';

export const appointmentService = {
  async create(
    dashboardId: string,
    appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Appointment> {
    const now = new Date();
    const data: Record<string, unknown> = {
      dashboardId,
      name: appointment.name,
      description: appointment.description,
      type: appointment.type,
      date: Timestamp.fromDate(appointment.date),
      value: appointment.value,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };

    // Add paymentMethod if it's an expense
    if ('paymentMethod' in appointment) {
      data.paymentMethod = appointment.paymentMethod;
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);

    return {
      id: docRef.id,
      ...appointment,
      dashboardId,
      createdAt: now,
      updatedAt: now,
    } as Appointment;
  },

  async getByDashboardId(dashboardId: string): Promise<Appointment[]> {
    const q = query(collection(db, COLLECTION_NAME), where('dashboardId', '==', dashboardId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const base = {
        id: doc.id,
        dashboardId: data.dashboardId,
        name: data.name,
        description: data.description,
        type: data.type,
        date: data.date.toDate(),
        value: data.value,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };

      if (data.paymentMethod) {
        return {
          ...base,
          paymentMethod: data.paymentMethod,
        } as ExpenseAppointment;
      }

      return base as IncomeAppointment;
    });
  },

  async update(id: string, updates: Partial<Appointment>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: Record<string, unknown> = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    if (updates.date) {
      updateData.date = Timestamp.fromDate(updates.date);
    }

    await updateDoc(docRef, updateData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};
