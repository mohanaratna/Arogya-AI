import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import { CaptchaComponent } from '../components/CaptchaComponent';

export const AuthView = () => {
  const { t, lang, setLang, languages } = useLanguage();
  const { sendOtp, otpSession, verifyOtpAndLogin, loginWithPassword } = useAuth();
  const { setActiveView } = useHealth();

  const [mode, setMode] = useState('login'); // 'login' or 'register' or 'forgot'
  const [authMethod, setAuthMethod] = useState('otp_email'); // 'otp_email', 'otp_phone', 'password'
  
  // Form fields
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('35');
  const [genderInput, setGenderInput] = useState('Male');
  const [emergencyInput, setEmergencyInput] = useState('');
  const [conditionsInput, setConditionsInput] = useState('');

  // Security & State
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!isCaptchaVerified) {
      setErrorMsg('Please complete the "I am not a robot" security check first.');
      return;
    }

    const destination = authMethod === 'otp_email' ? emailInput : phoneInput;
    if (!destination) {
      setErrorMsg('Please enter a valid email or mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      sendOtp(destination, authMethod === 'otp_email' ? 'email' : 'phone');
      setLoading(false);
      setSuccessMsg(`${t('auth.otpSentMessage')} ${destination}. Use demo code 123456.`);
    }, 800);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = verifyOtpAndLogin(otpInput, {
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        age: ageInput,
        gender: genderInput,
        preferredLang: lang,
        emergencyContact: emergencyInput,
        conditions: conditionsInput
      });

      setLoading(false);
      if (res.success) {
        setSuccessMsg(mode === 'register' ? t('auth.registerSuccess') : t('auth.loginSuccess'));
        setTimeout(() => {
          setActiveView('dashboard');
        }, 600);
      } else {
        setErrorMsg(res.error);
      }
    }, 700);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!isCaptchaVerified) {
      setErrorMsg('Please complete the security CAPTCHA check.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const identifier = emailInput || phoneInput || 'user@example.com';
      const res = loginWithPassword(identifier, passwordInput);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(t('auth.loginSuccess'));
        setTimeout(() => setActiveView('dashboard'), 600);
      } else {
        setErrorMsg(res.error);
      }
    }, 700);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Top Header & Mode Switch */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === 'login' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              {t('nav.login')}
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === 'register' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              {t('auth.titleRegister')}
            </button>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">
            {mode === 'login' ? t('auth.titleLogin') : t('auth.titleRegister')}
          </h2>
          <p className="text-xs text-slate-500">
            Secure multi-method authentication for SwasthyaSaathi
          </p>
        </div>

        {/* Global Language Selector for Profile */}
        <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between text-xs">
          <span className="font-bold text-teal-900 dark:text-teal-200">Preferred Language:</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700 font-bold text-slate-900 dark:text-white"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
            ))}
          </select>
        </div>

        {/* Auth Method Tabs (Email OTP / Phone OTP / Password) */}
        <div className="grid grid-cols-3 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setAuthMethod('otp_email')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-colors ${
              authMethod === 'otp_email' 
                ? 'bg-teal-600 text-white border-teal-600' 
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{t('auth.emailTab')}</span>
          </button>

          <button
            onClick={() => setAuthMethod('otp_phone')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-colors ${
              authMethod === 'otp_phone' 
                ? 'bg-teal-600 text-white border-teal-600' 
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>{t('auth.phoneTab')}</span>
          </button>

          <button
            onClick={() => setAuthMethod('password')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-colors ${
              authMethod === 'password' 
                ? 'bg-teal-600 text-white border-teal-600' 
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{t('auth.passwordTab')}</span>
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* REGISTRATION SPECIFIC FIELDS */}
        {mode === 'register' && !otpSession.sent && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t('auth.namePlaceholder')} *
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('auth.agePlaceholder')} *
                </label>
                <input
                  type="number"
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value)}
                  placeholder="35"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('auth.genderSelect')}
                </label>
                <select
                  value={genderInput}
                  onChange={(e) => setGenderInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                >
                  <option value="Male">{t('auth.male')}</option>
                  <option value="Female">{t('auth.female')}</option>
                  <option value="Other">{t('auth.otherGender')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* INPUT FORM ACCORDING TO AUTH METHOD */}
        {!otpSession.sent ? (
          <form onSubmit={authMethod === 'password' ? handlePasswordLogin : handleSendOTP} className="space-y-4">
            
            {authMethod === 'otp_email' && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t('auth.emailPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  required
                />
              </div>
            )}

            {authMethod === 'otp_phone' && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder={t('auth.phonePlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  required
                />
              </div>
            )}

            {authMethod === 'password' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Email or Mobile Number *
                  </label>
                  <input
                    type="text"
                    value={emailInput || phoneInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="User ID / Email / Phone"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder={t('auth.passwordPlaceholder')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CAPTCHA Widget */}
            <CaptchaComponent 
              isVerified={isCaptchaVerified} 
              onVerify={(val) => setIsCaptchaVerified(val)} 
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{authMethod === 'password' ? t('nav.login') : t('auth.sendOTP')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* OTP VERIFICATION STEP */
          <form onSubmit={handleVerifyOTP} className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center space-y-1">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">
                {t('auth.otpSentMessage')} <strong>{otpSession.destination}</strong>
              </span>
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block">
                {t('auth.demoOTPNotice')}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t('auth.enterOTP')}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="123456"
                className="w-full tracking-widest text-center text-xl font-bold px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : t('auth.verifyOTP')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
