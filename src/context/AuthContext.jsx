import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Demo user preset or stored session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('swasthya_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo user for easy preview
    return {
      id: 'usr_101',
      name: 'Ramesh Kumar',
      email: 'ramesh.kumar@example.com',
      phone: '9876543210',
      age: 42,
      gender: 'Male',
      preferredLang: 'en',
      emergencyContact: '+91 98765 00000 (Wife - Sunita)',
      conditions: 'Mild Hypertension (Blood Pressure)',
      isAuthenticated: true
    };
  });

  const [otpSession, setOtpSession] = useState({
    sent: false,
    type: null, // 'email' or 'phone'
    destination: '',
    code: '123456'
  });

  const sendOtp = (destination, type) => {
    setOtpSession({
      sent: true,
      type,
      destination,
      code: '123456' // Standard demo code
    });
    return true;
  };

  const verifyOtpAndLogin = (otpInput, userData = {}) => {
    if (otpInput === '123456' || otpInput === '000000') {
      const loggedUser = {
        id: user?.id || `usr_${Date.now()}`,
        name: userData.name || user?.name || 'Swasthya Patient',
        email: userData.email || user?.email || 'patient@swasthya.org',
        phone: userData.phone || user?.phone || '9876543210',
        age: userData.age || user?.age || 35,
        gender: userData.gender || user?.gender || 'Not specified',
        preferredLang: userData.preferredLang || 'en',
        emergencyContact: userData.emergencyContact || '108 Ambulance / Family',
        conditions: userData.conditions || 'None reported',
        isAuthenticated: true
      };
      setUser(loggedUser);
      localStorage.setItem('swasthya_user', JSON.stringify(loggedUser));
      setOtpSession({ sent: false, type: null, destination: '', code: '' });
      return { success: true };
    } else {
      return { success: false, error: 'Invalid OTP code. Please enter 123456 for demo verification.' };
    }
  };

  const loginWithPassword = (identifier, password) => {
    if (!identifier || !password) {
      return { success: false, error: 'Please fill in all credentials.' };
    }
    const loggedUser = {
      id: 'usr_101',
      name: 'Ramesh Kumar',
      email: identifier.includes('@') ? identifier : 'ramesh.kumar@example.com',
      phone: !identifier.includes('@') ? identifier : '9876543210',
      age: 42,
      gender: 'Male',
      preferredLang: 'en',
      emergencyContact: '+91 98765 00000',
      conditions: 'Mild Hypertension',
      isAuthenticated: true
    };
    setUser(loggedUser);
    localStorage.setItem('swasthya_user', JSON.stringify(loggedUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swasthya_user');
  };

  const updateUserProfile = (updatedFields) => {
    if (!user) return;
    const newProfile = { ...user, ...updatedFields };
    setUser(newProfile);
    localStorage.setItem('swasthya_user', JSON.stringify(newProfile));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.isAuthenticated,
        sendOtp,
        otpSession,
        verifyOtpAndLogin,
        loginWithPassword,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
