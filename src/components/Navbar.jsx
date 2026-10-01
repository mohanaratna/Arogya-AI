import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Stethoscope, 
  Mic, 
  Camera, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock, 
  User, 
  Menu, 
  X, 
  Globe, 
  Zap, 
  Eye, 
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { lang, setLang, t, languages } = useLanguage();
  const { 
    activeView, 
    setActiveView, 
    isLowBandwidth, 
    toggleLowBandwidth, 
    isHighContrast, 
    toggleHighContrast,
    openEmergency 
  } = useHealth();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: HeartHandshake },
    { id: 'symptomChecker', label: t('nav.symptomChecker'), icon: Stethoscope },
    { id: 'voiceAssistant', label: t('nav.voiceAssistant'), icon: Mic },
    { id: 'photoAnalysis', label: t('nav.photoAnalysis'), icon: Camera },
    { id: 'healthInfo', label: t('nav.healthInfo'), icon: BookOpen },
    { id: 'doctors', label: t('nav.doctors'), icon: Users },
    { id: 'appointments', label: t('nav.appointments'), icon: Calendar },
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[33px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                {t('appName')}
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold border border-teal-300 dark:border-teal-800">
                  AI Guidance
                </span>
              </span>
              <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 block font-medium">
                Accessible Health Companion
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl font-semibold text-xs xl:text-sm flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls (Language Selector, High Contrast, Auth, Emergency FAB) */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Low Bandwidth Toggle */}
            <button
              onClick={toggleLowBandwidth}
              title="Toggle Low Bandwidth Mode"
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border transition-colors ${
                isLowBandwidth 
                  ? 'bg-amber-100 text-amber-900 border-amber-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>{isLowBandwidth ? "Lite Mode ON" : "Lite"}</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              title="Toggle High Contrast Mode"
              className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                isHighContrast 
                  ? 'bg-yellow-400 text-black border-black' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <Globe className="w-4 h-4 text-teal-600" />
                <span>{languages.find(l => l.code === lang)?.nativeName}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-teal-50 dark:hover:bg-slate-800 ${
                        lang === l.code ? 'text-teal-600 font-bold bg-teal-50/50' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{l.nativeName} ({l.name})</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Auth Menu */}
            {isAuthenticated ? (
              <button
                onClick={() => handleNavClick('profile')}
                className="px-3 py-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1.5 border border-teal-200 dark:border-teal-800 hover:bg-teal-100"
              >
                <User className="w-4 h-4" />
                <span>{user?.name?.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                {t('nav.login')}
              </button>
            )}

            {/* Emergency FAB Button */}
            <button
              onClick={() => openEmergency("User triggered emergency button")}
              className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center gap-1 shadow-md animate-pulse"
            >
              <PhoneCall className="w-4 h-4" />
              <span>108</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openEmergency("Mobile Emergency Trigger")}
              className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              108
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-2xl">
          
          {/* Language Grid */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              Select Preferred Language:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold text-left ${
                    lang === l.code 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-3 ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Auth Button for Mobile */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => handleNavClick('profile')}
                  className="font-bold text-sm text-teal-600 flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  {user?.name}
                </button>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-xs text-red-600 font-bold px-3 py-1 rounded-lg border border-red-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl text-center"
              >
                {t('nav.login')}
              </button>
            )}
          </div>

        </div>
      )}
    </header>
  );
};
