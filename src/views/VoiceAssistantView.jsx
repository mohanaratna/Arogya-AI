import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  RotateCcw, 
  AlertTriangle, 
  Sparkles, 
  Globe, 
  CheckCircle2,
  PhoneCall,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { analyzeSymptomsPipeline } from '../data/symptomRules';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const VoiceAssistantView = () => {
  const { lang, setLang, t, languages } = useLanguage();
  const { openEmergency, saveHistoryRecord } = useHealth();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Follow up state
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [durationInput, setDurationInput] = useState('2');
  const [severityInput, setSeverityInput] = useState('5');
  const [ageInput, setAgeInput] = useState('40');
  const [conditionsInput, setConditionsInput] = useState('');

  // AI Response
  const [aiResult, setAiResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: "Namaste! I am your SwasthyaSaathi AI Voice Assistant. Tap the microphone below and tell me about your health concern or symptoms in your language."
    }
  ]);

  // Speech Recognition API setup
  useEffect(() => {
    let recognition = null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && isListening) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        // Map language code to BCP 47 tag
        const langMap = {
          en: 'en-IN',
          te: 'te-IN',
          hi: 'hi-IN',
          ta: 'ta-IN',
          kn: 'kn-IN'
        };
        recognition.lang = langMap[lang] || 'en-IN';

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscript(transcriptText);
        };

        recognition.onerror = (event) => {
          console.log("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        console.error("Speech Recognition initialization error:", err);
        setIsListening(false);
      }
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening, lang]);

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setTranscript('');
      setIsListening(true);
    }
  };

  const processUserQuery = (queryText) => {
    if (!queryText.trim()) return;

    const userMsg = { sender: 'user', text: queryText };
    setChatHistory(prev => [...prev, userMsg]);

    // Perform clinical pipeline analysis
    const pipelineResult = analyzeSymptomsPipeline({
      freeText: queryText,
      age: parseInt(ageInput, 10),
      durationDays: parseInt(durationInput, 10),
      severityScore: parseInt(severityInput, 10),
      existingConditions: conditionsInput
    });

    setAiResult(pipelineResult);

    // Save to health timeline automatically
    saveHistoryRecord({
      type: 'Voice AI Assessment',
      symptoms: [queryText],
      severity: pipelineResult.severity,
      category: pipelineResult.possibleCategories[0]?.name || 'General Health Guidance',
      guidance: pipelineResult.precautions.join(' '),
      referral: pipelineResult.nextAction,
      isEmergency: pipelineResult.isEmergency
    });

    // Check emergency trigger
    if (pipelineResult.isEmergency) {
      openEmergency(`Voice Assistant detected critical emergency signs: ${pipelineResult.redFlags.join(', ')}`);
    }

    // Construct response in current language
    let responseText = `${pipelineResult.urgencyLabel}. `;
    responseText += `Possible category: ${pipelineResult.possibleCategories[0]?.name}. `;
    responseText += `Key advice: ${pipelineResult.precautions[0]} ${pipelineResult.precautions[1] || ''}`;

    const aiMsg = { sender: 'ai', text: responseText, result: pipelineResult };
    setChatHistory(prev => [...prev, aiMsg]);
    speakResponse(responseText);

    setTextInput('');
    setTranscript('');
    setShowFollowUp(false);
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN' };
      utterance.lang = langMap[lang] || 'en-IN';
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mic className="w-7 h-7 text-teal-600" />
              {t('voice.title')}
            </h1>
            <p className="text-xs md:text-sm text-slate-500">{t('voice.desc')}</p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-950/40 p-2 rounded-2xl border border-teal-200 dark:border-teal-800">
            <Globe className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold text-teal-950 dark:text-teal-200">Voice Language:</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="px-3 py-1 bg-white dark:bg-slate-800 rounded-xl font-bold text-xs border border-teal-300 dark:border-teal-700 text-slate-900 dark:text-white"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* Main Recording Interface */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 text-center relative overflow-hidden">
        
        {/* Animated Microphone Hub */}
        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
          
          <button
            onClick={handleToggleListening}
            className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-all shadow-2xl transform active:scale-95 ${
              isListening
                ? 'bg-red-600 text-white animate-pulse-mic'
                : 'bg-gradient-to-tr from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 shadow-emerald-900/50'
            }`}
          >
            {isListening ? (
              <MicOff className="w-14 h-14 md:w-16 md:h-16 animate-bounce" />
            ) : (
              <Mic className="w-14 h-14 md:w-16 md:h-16" />
            )}
          </button>

          <span className="text-sm font-extrabold tracking-wide uppercase">
            {isListening ? (
              <span className="text-red-400 flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin" /> {t('voice.listeningState')}
              </span>
            ) : (
              t('voice.startListening')
            )}
          </span>

        </div>

        {/* Live Recognized Speech Display */}
        {(transcript || isListening) && (
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-2xl mx-auto space-y-2 animate-in fade-in">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {t('voice.recognizedText')}
            </span>
            <p className="text-base font-semibold text-teal-300 min-h-[30px]">
              "{transcript || "Speak now..."}"
            </p>

            {transcript && (
              <button
                onClick={() => processUserQuery(transcript)}
                className="mt-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-colors shadow-md"
              >
                {t('voice.sendQuery')}
              </button>
            )}
          </div>
        )}

        {/* Text Input Fallback */}
        <div className="max-w-2xl mx-auto flex items-center gap-2 pt-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && processUserQuery(textInput)}
            placeholder={t('voice.typeFallback')}
            className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-teal-400"
          />
          <button
            onClick={() => processUserQuery(textInput)}
            className="px-5 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold rounded-2xl flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Follow-up Questions Panel */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {t('voice.followUpTitle')}
          </h3>
          <button
            onClick={() => setShowFollowUp(!showFollowUp)}
            className="text-xs text-teal-600 font-bold hover:underline"
          >
            {showFollowUp ? "Hide Parameters" : "Customize Parameters"}
          </button>
        </div>

        {showFollowUp && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {t('voice.qDuration')}
              </label>
              <input
                type="number"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {t('voice.qSeverity')} ({severityInput}/10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={severityInput}
                onChange={(e) => setSeverityInput(e.target.value)}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {t('voice.qConditions')}
              </label>
              <input
                type="text"
                value={conditionsInput}
                onChange={(e) => setConditionsInput(e.target.value)}
                placeholder="e.g. Diabetes, BP"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* AI Response Card & Audio Replay */}
      {aiResult && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border-2 border-teal-500/40 shadow-xl space-y-6 animate-in slide-in-from-bottom-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${aiResult.severityBadgeClass}`}>
                {aiResult.severity} Severity
              </span>
              <span className="text-xs text-slate-500 font-semibold">{aiResult.urgencyLabel}</span>
            </div>

            <div className="flex items-center gap-2">
              {isPlayingAudio ? (
                <button
                  onClick={handleStopAudio}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <VolumeX className="w-4 h-4" />
                  {t('voice.stopAudio')}
                </button>
              ) : (
                <button
                  onClick={() => speakResponse(aiResult.precautions.join(' '))}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  {t('voice.playAudio')}
                </button>
              )}
            </div>
          </div>

          {/* Red Flag Emergency Override Notice */}
          {aiResult.isEmergency && (
            <div className="p-4 rounded-2xl bg-red-600 text-white space-y-2">
              <div className="font-extrabold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <span>{t('triage.redFlagWarning')}</span>
              </div>
              <p className="text-xs opacity-95">
                Red flags detected: {aiResult.redFlags.join(', ')}. Please call 108 immediately.
              </p>
              <a
                href="tel:108"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-red-700 font-black text-xs rounded-xl shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                DIAL 108 AMBULANCE NOW
              </a>
            </div>
          )}

          {/* Guidance details */}
          <div className="space-y-3 text-sm text-slate-800 dark:text-slate-200">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase text-xs tracking-wider text-teal-600">
              SwasthyaSaathi Safe Recommendations:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm">
              {aiResult.precautions.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">Recommended Next Step:</span>
            <p className="text-teal-700 dark:text-teal-300 font-bold">{aiResult.nextAction}</p>
          </div>

        </div>
      )}

    </div>
  );
};
