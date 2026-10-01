import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Lock, 
  UserCheck,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealth } from '../context/HealthContext';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export const PhotoAnalysisView = () => {
  const { t } = useLanguage();
  const { setActiveView, openEmergency } = useHealth();

  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [screeningResult, setScreeningResult] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Camera activation using Web RTC getUserMedia
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera access unavailable. Please upload a photo file instead.");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/jpeg');
      setPhotoDataUrl(data);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoDataUrl(event.target.result);
        setScreeningResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzePhoto = () => {
    if (!photoDataUrl) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      // Simulation of visual analysis screening engine
      const mockResult = {
        qualityStatus: 'Good / Clear Lighting',
        isQualityGood: true,
        visibleFindings: [
          'Localized erythematous rash with mild scaling',
          'Superficial epidermal skin irritation'
        ],
        possibleConditions: [
          { category: 'Contact Dermatitis / Skin Allergy', confidence: '72% Similarity' },
          { category: 'Superficial Fungal Tinea Reaction', confidence: '60% Similarity' },
          { category: 'Insect Stung Skin Reaction', confidence: '45% Similarity' }
        ],
        confidenceScore: '72% (Preliminary Screening Only)',
        uncertaintyNote: 'Visual analysis is limited by lighting and resolution. Physical palpation by a doctor is needed for accurate diagnosis.',
        severity: 'Mild to Moderate',
        precautions: [
          'Keep the affected area clean and dry.',
          'Do NOT scratch or rub the skin to prevent secondary bacterial infection.',
          'Avoid applying harsh chemical soaps or unverified household ointments.'
        ],
        recommendedSpecialist: 'Dermatologist (Skin Specialist)',
        isUrgent: false
      };

      setScreeningResult(mockResult);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center">
            <Camera className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t('photo.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('photo.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <DisclaimerBadge />

      {/* Main Image Capture Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Live Camera Stream */}
        {isCameraActive && (
          <div className="relative rounded-2xl overflow-hidden bg-black max-w-lg mx-auto">
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Snap Photo</span>
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Upload Buttons when no photo */}
        {!photoDataUrl && !isCameraActive && (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-4 hover:border-teal-500 transition-colors">
            <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload or Capture Health Photo
              </h3>
              <p className="text-xs text-slate-500">
                Supports JPG, PNG photos of skin rashes, bites, wounds, or eye redness.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={startCamera}
                className="px-5 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md"
              >
                <Camera className="w-4 h-4" />
                <span>{t('photo.openCamera')}</span>
              </button>

              <label className="px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md">
                <Upload className="w-4 h-4" />
                <span>{t('photo.uploadFile')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* Selected Photo Preview */}
        {photoDataUrl && (
          <div className="space-y-4 max-w-md mx-auto text-center">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              {t('photo.previewTitle')}
            </h4>

            <div className="relative rounded-2xl overflow-hidden border-2 border-teal-500 shadow-xl max-h-72 bg-slate-950 flex items-center justify-center">
              <img src={photoDataUrl} alt="Health Symptom Preview" className="max-h-72 object-contain" />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => { setPhotoDataUrl(null); setScreeningResult(null); }}
                className="px-4 py-2 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t('photo.retakeBtn')}</span>
              </button>

              <button
                onClick={handleAnalyzePhoto}
                disabled={isAnalyzing}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-lg"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>{t('photo.analyzeBtn')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Privacy Checkbox */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            id="privacy"
            checked={privacyCheck}
            onChange={(e) => setPrivacyCheck(e.target.checked)}
            className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
          />
          <label htmlFor="privacy" className="flex items-center gap-1 font-semibold cursor-pointer">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('photo.privacyCheck')}</span>
          </label>
        </div>

      </div>

      {/* SCREENING RESULT CARD */}
      {screeningResult && (
        <div className="bg-white dark:bg-slate-900 border-2 border-sky-500 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in slide-in-from-bottom-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t('photo.qualityGood')}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Confidence: {screeningResult.confidenceScore}
            </span>
          </div>

          {/* Visible Findings */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
              {t('photo.findings')}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              {screeningResult.visibleFindings.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Possible Conditions */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
              {t('photo.possibleConditions')}
            </h4>
            <div className="space-y-2">
              {screeningResult.possibleConditions.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 flex items-center justify-between text-xs sm:text-sm font-bold text-sky-950 dark:text-sky-200">
                  <span>{item.category}</span>
                  <span className="text-sky-700 dark:text-sky-400">{item.confidence}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Uncertainty Note */}
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
            <strong>Uncertainty Explanation:</strong> {screeningResult.uncertaintyNote}
          </div>

          {/* Recommended Specialist Button */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 block">Recommended Specialist:</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">{screeningResult.recommendedSpecialist}</span>
            </div>

            <button
              onClick={() => setActiveView('doctors')}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-md"
            >
              <UserCheck className="w-4 h-4" />
              <span>Book Dermatologist Consultation</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
