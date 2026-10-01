import React, { createContext, useContext, useState, useEffect } from 'react';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  // Navigation View State
  const [activeView, setActiveView] = useState('home');

  // Accessibility & Bandwidth Toggles
  const [isLowBandwidth, setIsLowBandwidth] = useState(() => {
    return localStorage.getItem('swasthya_low_bandwidth') === 'true';
  });

  const [isHighContrast, setIsHighContrast] = useState(() => {
    return localStorage.getItem('swasthya_high_contrast') === 'true';
  });

  // Emergency Modal State
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState(null);

  // Health History Timeline State
  const [healthHistory, setHealthHistory] = useState(() => {
    const saved = localStorage.getItem('swasthya_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Default initial mock history entry
    return [
      {
        id: 'hist_1',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
        type: 'Symptom Triage',
        symptoms: ['Fever', 'Sore Throat', 'Mild Cough'],
        severity: 'Mild',
        category: 'Viral Upper Respiratory Infection',
        guidance: 'Rest, warm salt water gargle, hydrated fluid intake, Paracetamol if fever > 100°F.',
        referral: 'General Physician if persistent > 3 days',
        isEmergency: false
      }
    ];
  });

  // Appointments State
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('swasthya_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'apt_101',
        doctorName: 'Dr. Ananya Rao',
        specialty: 'General Physician / Internal Medicine',
        hospital: 'Apollo Health Clinic & Telehealth',
        date: '2026-10-02',
        time: '10:30 AM',
        mode: 'Video Consultation',
        status: 'Confirmed',
        fee: '₹250'
      }
    ];
  });

  const toggleLowBandwidth = () => {
    setIsLowBandwidth(prev => {
      const val = !prev;
      localStorage.setItem('swasthya_low_bandwidth', val);
      return val;
    });
  };

  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const val = !prev;
      localStorage.setItem('swasthya_high_contrast', val);
      return val;
    });
  };

  const openEmergency = (reason = null) => {
    setEmergencyReason(reason);
    setIsEmergencyOpen(true);
  };

  const closeEmergency = () => {
    setIsEmergencyOpen(false);
    setEmergencyReason(null);
  };

  const saveHistoryRecord = (record) => {
    const newRecord = {
      id: `hist_${Date.now()}`,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now(),
      ...record
    };
    const updated = [newRecord, ...healthHistory];
    setHealthHistory(updated);
    localStorage.setItem('swasthya_history', JSON.stringify(updated));
  };

  const deleteHistoryRecord = (id) => {
    const updated = healthHistory.filter(item => item.id !== id);
    setHealthHistory(updated);
    localStorage.setItem('swasthya_history', JSON.stringify(updated));
  };

  const bookAppointment = (appointmentData) => {
    const newApt = {
      id: `apt_${Date.now()}`,
      status: 'Confirmed',
      ...appointmentData
    };
    const updated = [newApt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('swasthya_appointments', JSON.stringify(updated));
    return newApt;
  };

  const cancelAppointment = (id) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'Cancelled' } : apt
    );
    setAppointments(updated);
    localStorage.setItem('swasthya_appointments', JSON.stringify(updated));
  };

  return (
    <HealthContext.Provider
      value={{
        activeView,
        setActiveView,
        isLowBandwidth,
        toggleLowBandwidth,
        isHighContrast,
        toggleHighContrast,
        isEmergencyOpen,
        emergencyReason,
        openEmergency,
        closeEmergency,
        healthHistory,
        saveHistoryRecord,
        deleteHistoryRecord,
        appointments,
        bookAppointment,
        cancelAppointment
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
