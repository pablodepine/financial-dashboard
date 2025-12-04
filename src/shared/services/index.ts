// Firebase services (production)
export * from './authService';
export * from './dashboardService';
export * from './appointmentService';

// Mock services (development)
export * from './mockAuthService';
export * from './mockDashboardService';
export * from './mockAppointmentService';

// API client
export * from './api';

// Service selector based on environment
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

import { authService as firebaseAuthService } from './authService';
import { dashboardService as firebaseDashboardService } from './dashboardService';
import { appointmentService as firebaseAppointmentService } from './appointmentService';
import { mockAuthService } from './mockAuthService';
import { mockDashboardService } from './mockDashboardService';
import { mockAppointmentService } from './mockAppointmentService';

// Export the active services based on environment
export const activeAuthService = USE_MOCK ? mockAuthService : firebaseAuthService;
export const activeDashboardService = USE_MOCK ? mockDashboardService : firebaseDashboardService;
export const activeAppointmentService = USE_MOCK ? mockAppointmentService : firebaseAppointmentService;
