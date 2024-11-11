'use client';

import { useState } from 'react';
// import Header from '../components/LoginHeader'
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import TechnologiesSection from '../components/TechnologiesSection';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import LoginDialog from '../components/LoginDialog';
import Chatbot from '../components/Chatbot';

export default function LoginPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300">
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Hero onGetStarted={() => setIsLoginOpen(true)} />
          <AboutSection />
          <TechnologiesSection />
          <NewsSection />
        </div>
      </main>
      <Footer />
      <Chatbot /> {/* Adds Chatbot to LoginPage */}
    </div>
  );
}
