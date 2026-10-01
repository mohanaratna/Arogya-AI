import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { HealthProvider, useHealth } from './context/HealthContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyBanner } from './components/EmergencyBanner';
import { EmergencyModal } from './components/EmergencyModal';

import { HomeView } from './views/HomeView';
import { AuthView } from './views/AuthView';
import { VoiceAssistantView } from './views/VoiceAssistantView';
import { SymptomChecker } from './views/SymptomChecker';
import { PhotoAnalysisView } from './views/PhotoAnalysisView';
import { HealthInfoView } from './views/HealthInfoView';
import { DoctorDiscoveryView } from './views/DoctorDiscoveryView';
import { VideoConsultationView } from './views/VideoConsultationView';
import { DashboardView } from './views/DashboardView';
import { ProfileView } from './views/ProfileView';

const MainContent = () => {
  const { activeView, isHighContrast, isLowBandwidth } = useHealth();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'auth':
        return <AuthView />;
      case 'voiceAssistant':
        return <VoiceAssistantView />;
      case 'symptomChecker':
        return <SymptomChecker />;
      case 'photoAnalysis':
        return <PhotoAnalysisView />;
      case 'healthInfo':
        return <HealthInfoView />;
      case 'doctors':
      case 'appointments':
        return <DoctorDiscoveryView />;
      case 'videoConsultation':
        return <VideoConsultationView />;
      case 'dashboard':
        return <DashboardView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isHighContrast ? 'high-contrast' : ''} ${isLowBandwidth ? 'low-bandwidth' : ''}`}>
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderView()}
      </main>

      <Footer />
      <EmergencyModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HealthProvider>
          <MainContent />
        </HealthProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
