'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Patient,
  Alert,
  Payment,
} from './types';
import {
  mockPatients,
  mockAlerts,
  mockPayments,
} from './mock-data';

interface AppContextType {
  // State
  patients: Patient[];
  alerts: Alert[];
  payments: Payment[];
  currentUser: {
    name: string;
    role: 'nutritionist' | 'admin';
  } | null;
  selectedPatient: Patient | null;

  // Patient functions
  addPatient: (patient: Patient) => void;
  updatePatient: (patientId: string, updates: Partial<Patient>) => void;
  selectPatient: (patientId: string | null) => void;
  getPatientById: (patientId: string) => Patient | undefined;

  // Alert functions
  markAlertRead: (alertId: string) => void;
  getUnreadAlerts: () => Alert[];
  dismissAlert: (alertId: string) => void;

  // Payment functions
  addPayment: (payment: Payment) => void;
  updatePayment: (paymentId: string, updates: Partial<Payment>) => void;
  getPatientPayments: (patientId: string) => Payment[];
  getOverduePayments: () => Payment[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentUser] = useState({
    name: 'Dr. Carlos Oliveira',
    role: 'nutritionist' as const,
  });

  // Patient functions
  const addPatient = useCallback((patient: Patient) => {
    setPatients((prev) => [...prev, patient]);
  }, []);

  const updatePatient = useCallback((patientId: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === patientId
          ? { ...patient, ...updates }
          : patient
      )
    );
    // Update selected patient if it's the one being updated
    if (selectedPatient?.id === patientId) {
      setSelectedPatient((prev) =>
        prev ? { ...prev, ...updates } : null
      );
    }
  }, [selectedPatient]);

  const selectPatient = useCallback((patientId: string | null) => {
    if (patientId === null) {
      setSelectedPatient(null);
    } else {
      const patient = patients.find((p) => p.id === patientId);
      if (patient) {
        setSelectedPatient(patient);
      }
    }
  }, [patients]);

  const getPatientById = useCallback(
    (patientId: string) => {
      return patients.find((p) => p.id === patientId);
    },
    [patients]
  );

  // Alert functions
  const markAlertRead = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? { ...alert, read: true }
          : alert
      )
    );
  }, []);

  const getUnreadAlerts = useCallback(() => {
    return alerts.filter((alert) => !alert.read);
  }, [alerts]);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  }, []);

  // Payment functions
  const addPayment = useCallback((payment: Payment) => {
    setPayments((prev) => [...prev, payment]);
  }, []);

  const updatePayment = useCallback((paymentId: string, updates: Partial<Payment>) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? { ...payment, ...updates }
          : payment
      )
    );
  }, []);

  const getPatientPayments = useCallback(
    (patientId: string) => {
      return payments.filter((payment) => payment.patientId === patientId);
    },
    [payments]
  );

  const getOverduePayments = useCallback(() => {
    return payments.filter((payment) => payment.status === 'overdue');
  }, [payments]);

  const value: AppContextType = {
    patients,
    alerts,
    payments,
    currentUser,
    selectedPatient,
    addPatient,
    updatePatient,
    selectPatient,
    getPatientById,
    markAlertRead,
    getUnreadAlerts,
    dismissAlert,
    addPayment,
    updatePayment,
    getPatientPayments,
    getOverduePayments,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
