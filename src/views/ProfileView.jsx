import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  AlertCircle, 
  ShieldCheck, 
  Save, 
  LogOut,
  Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const ProfileView = () => {
  const { lang, setLang, t, languages } = useLanguage();
  const { user, updateUserProfile, logout } = useAuth();
  const { setActiveView } = useHealth();

  const [name, setName] = useState(user?.name || 'Ramesh Kumar');
  const [email, setEmail] = useState(user?.email || 'ramesh.kumar@example.com');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [age, setAge] = useState(user?.age || '42');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '+91 98765 00000 (Wife - Sunita)');
  const [conditions, setConditions] = useState(user?.conditions || 'Mild Hypertension');

  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      age,
      gender,
      preferredLang: lang,
      emergencyContact,
      conditions
    });
    setSavedMsg('Profile details updated successfully.');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Patient Profile & Settings
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage personal details, language preferences, and emergency contacts
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        {savedMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            {savedMsg}
          </div>
        )}

        {/* Global Language Preference */}
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-2">
          <label className="text-xs font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-teal-600" />
            Global Application Language:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {languages.map(l => (
              <button
                type="button"
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-2 rounded-xl text-xs font-bold text-left border ${
                  lang === l.code 
                    ? 'bg-teal-600 text-white border-teal-600' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {l.nativeName} ({l.name})
              </button>
            ))}
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Emergency Contact (Family / Neighbor)
            </label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Existing Health Conditions (Diabetes, BP, Asthma, etc.)
            </label>
            <input
              type="text"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => { logout(); setActiveView('home'); }}
            className="px-4 py-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 border border-red-200 dark:border-red-900 rounded-xl font-bold text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
};
