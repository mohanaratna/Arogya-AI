import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Video, 
  PhoneCall, 
  Building, 
  Globe,
  ArrowRight,
  X,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { doctorsList, specialtiesList } from '../data/doctorsData';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const DoctorDiscoveryView = () => {
  const { t, lang } = useLanguage();
  const { bookAppointment, appointments, cancelAppointment, setActiveView } = useHealth();
  const { user } = useAuth();

  // Filters
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [maxFee, setMaxFee] = useState(500);

  // Booking Modal State
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-10-02');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultMode, setConsultMode] = useState('Video Consultation');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  const filteredDoctors = doctorsList.filter(doc => {
    if (selectedSpecialty !== 'All Specialties' && doc.specialty !== selectedSpecialty) return false;
    if (selectedLang !== 'All' && !doc.languages.includes(selectedLang)) return false;
    if (selectedMode !== 'All' && !doc.modes.includes(selectedMode)) return false;
    if (doc.fee > maxFee) return false;
    return true;
  });

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    const newApt = bookAppointment({
      doctorName: selectedDoc.name,
      specialty: selectedDoc.specialty,
      hospital: selectedDoc.hospital,
      date: selectedDate,
      time: selectedSlot,
      mode: consultMode,
      fee: `₹${selectedDoc.fee}`,
      doctorPhoto: selectedDoc.photo
    });

    setBookingSuccessMsg(t('doctors.bookingSuccess'));
    setTimeout(() => {
      setBookingSuccessMsg('');
      setSelectedDoc(null);
      setActiveView('appointments');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('doctors.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('doctors.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filter Doctors:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Specialty */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
          >
            {specialtiesList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Language */}
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
          >
            <option value="All">All Languages</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
            <option value="English">English</option>
          </select>

          {/* Mode */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
          >
            <option value="All">{t('doctors.allModes')}</option>
            <option value="Video Consultation">{t('doctors.videoOnly')}</option>
            <option value="In-Person Clinic">{t('doctors.inPersonOnly')}</option>
            <option value="Phone Call">{t('doctors.phoneOnly')}</option>
          </select>

          {/* Fee Range Slider */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 block">
              Max Fee: ₹{maxFee}
            </span>
            <input
              type="range"
              min="100"
              max="600"
              step="50"
              value={maxFee}
              onChange={(e) => setMaxFee(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* DOCTOR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-indigo-500 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-200 dark:border-indigo-900 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">{doc.name}</h3>
                    {doc.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />}
                  </div>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-500">{doc.qualification} • {doc.experienceYears} {t('doctors.experience')}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {doc.about}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1 font-medium">
                  <Globe className="w-3.5 h-3.5 text-teal-600" />
                  {doc.languages.join(', ')}
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                  {t('doctors.fee')} ₹{doc.fee}
                </span>
              </div>
            </div>

            <button
              onClick={() => { setSelectedDoc(doc); setSelectedSlot(doc.availableSlots[0]); }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform transform active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('doctors.bookSlot')}</span>
            </button>
          </div>
        ))}
      </div>

      {/* APPOINTMENT BOOKING MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-600 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img src={selectedDoc.photo} alt={selectedDoc.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedDoc.name}</h3>
                  <p className="text-xs text-indigo-600 font-bold">{selectedDoc.specialty}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {bookingSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-center font-bold text-sm">
                {bookingSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                
                {/* Mode selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Consultation Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDoc.modes.map(mode => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setConsultMode(mode)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-colors ${
                          consultMode === mode ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('doctors.selectDate')}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('doctors.selectTime')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.availableSlots.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          selectedSlot === slot ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fee & Patient Info */}
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800 dark:text-slate-100">
                    <span>Patient Name:</span>
                    <span>{user?.name || "Ramesh Kumar"}</span>
                  </div>
                  <div className="flex justify-between font-bold text-indigo-600 dark:text-indigo-400">
                    <span>Consultation Fee:</span>
                    <span>₹{selectedDoc.fee}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t('doctors.confirmBooking')}</span>
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
