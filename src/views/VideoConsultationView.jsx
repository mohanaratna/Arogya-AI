import React, { useState, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Globe, 
  MessageSquare, 
  Send, 
  Download, 
  User, 
  ShieldCheck,
  Sparkles,
  Wifi
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const VideoConsultationView = () => {
  const { lang, t } = useLanguage();
  const { appointments, setActiveView } = useHealth();
  const { user } = useAuth();

  const [callState, setCallState] = useState('waiting'); // 'waiting', 'connected', 'ended'
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  
  // Real-Time Live Dual-Language Speech Translation state
  const [patientLiveSubtitle, setPatientLiveSubtitle] = useState("Doctor, I have had a headache and mild fever for 2 days.");
  const [patientTranslatedSubtitle, setPatientTranslatedSubtitle] = useState("డాక్టర్, నాకు 2 రోజులుగా తలనొప్పి మరియు తేలికపాటి జ్వరం ఉంది.");
  
  const [doctorLiveSubtitle, setDoctorLiveSubtitle] = useState("Do not worry. Please rest, drink warm ORS fluids, and take Paracetamol 500mg after food.");
  const [doctorTranslatedSubtitle, setDoctorTranslatedSubtitle] = useState("చింతించకండి. విశ్రాంతి తీసుకోండి, వేడి ORS ద్రవాలు తాగండి మరియు ఆహారం తర్వాత పారాసిటమాల్ 500mg తీసుకోండి.");

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Ananya Rao', text: 'Hello! I am Dr. Ananya. Live translation is enabled.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const activeApt = appointments[0] || {
    doctorName: 'Dr. Ananya Rao',
    specialty: 'General Physician / Internal Medicine',
    hospital: 'Apollo Health & Tele-PHC Network',
    fee: '₹250'
  };

  useEffect(() => {
    if (callState === 'waiting') {
      const timer = setTimeout(() => {
        setCallState('connected');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [callState]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { sender: user?.name || 'Patient', text: chatInput }]);
    setChatInput('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Video className="w-7 h-7 text-purple-600" />
            {t('video.title')}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Consulting with <strong>{activeApt.doctorName}</strong> ({activeApt.specialty})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Connection: HD 60fps</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 rounded-full text-xs font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>Dual Subtitle Active</span>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* CALL SCREEN CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Video Call Display (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-purple-950 h-[380px] md:h-[450px] shadow-2xl flex flex-col justify-between p-4">
            
            {/* Remote Doctor Stream Preview */}
            {callState === 'waiting' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-900 text-white z-20">
                <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin flex items-center justify-center">
                  <Video className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-sm font-bold animate-pulse">{t('video.waitingRoom')}</p>
              </div>
            )}

            {callState === 'connected' && (
              <div className="absolute inset-0 bg-slate-900 z-10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80" 
                  alt="Doctor Stream" 
                  className="w-full h-full object-cover opacity-90"
                />
                
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{activeApt.doctorName} (Doctor Active)</span>
                </div>
              </div>
            )}

            {/* Local Patient Self Video Preview */}
            <div className="absolute bottom-16 right-4 w-32 h-24 md:w-44 md:h-32 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl bg-slate-800 z-30 flex items-center justify-center">
              {isCamOn ? (
                <div className="w-full h-full bg-teal-900/80 flex items-center justify-center text-teal-200 text-xs font-bold">
                  <span>Your Camera Stream</span>
                </div>
              ) : (
                <VideoOff className="w-8 h-8 text-slate-500" />
              )}
            </div>

            {/* LIVE TRANSLATION DUAL SUBTITLE OVERLAY */}
            {callState === 'connected' && (
              <div className="relative z-30 mt-auto mb-14 mx-auto max-w-xl w-full bg-slate-950/85 backdrop-blur-md border border-purple-500/50 rounded-2xl p-3.5 space-y-2 text-white shadow-2xl animate-in fade-in">
                
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase text-purple-400 border-b border-purple-900 pb-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    {t('video.liveTranslationTitle')} (STT + Real-Time Translation)
                  </span>
                  <span>{lang.toUpperCase()} ↔ EN</span>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-purple-200">
                    <strong>Doctor Speech:</strong> "{doctorLiveSubtitle}"
                  </p>
                  <p className="text-emerald-300 font-bold bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-900">
                    <strong>Translated to Your Preferred Language:</strong> "{doctorTranslatedSubtitle}"
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Control Bar */}
            <div className="relative z-40 flex items-center justify-center gap-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full transition-colors ${isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'}`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCamOn(!isCamOn)}
                className={`p-3 rounded-full transition-colors ${isCamOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'}`}
              >
                {isCamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => { setCallState('ended'); setActiveView('dashboard'); }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl flex items-center gap-2 shadow-lg"
              >
                <PhoneOff className="w-5 h-5" />
                <span>{t('video.endCall')}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Sidebar (Chat & Clinical Notes) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 h-[450px] flex flex-col justify-between">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Doctor Chat & Prescription
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`p-2.5 rounded-xl ${msg.sender.includes('Dr.') ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
                  <span className="font-bold block text-[10px] opacity-75">{msg.sender}</span>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t('video.chatPlaceholder')}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button type="submit" className="p-2 bg-purple-600 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </form>

            <button 
              onClick={() => alert("Summary report downloaded to your device.")}
              className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{t('video.downloadSummary')}</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
