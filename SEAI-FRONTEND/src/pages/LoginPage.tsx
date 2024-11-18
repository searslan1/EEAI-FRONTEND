'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import TechnologiesSection from '../components/TechnologiesSection';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import LoginDialog from '../components/LoginDialog';

export default function LoginPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300">
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Hero
            onGetStarted={() => {
              if (auth.isAuthenticated) {
                alert('You are already logged in!');
              } else {
                setIsLoginOpen(true);
              }
            }}
          />
          <AboutSection />
          <TechnologiesSection />
          <NewsSection />
        </div>
      </main>
      <Footer />
      <Chatbot />
      <LoginDialog isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}
