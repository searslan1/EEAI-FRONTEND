'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import InterviewApplications from '../components/InterviewApplications';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { hrData, dailyApplications, categories, applications } from '../data/mockData';

export default function Dashboard() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-blue-300 text-gray-800">
      <Header isScrolled={isScrolled} />
      <main className="relative px-4 pb-24 pt-16 lg:pt-20">
        <HeroSection hrData={hrData} dailyApplications={dailyApplications} />
        <CategorySection categories={categories} />
        <InterviewApplications applications={applications} />
      </main>
      <Footer />
      <Chatbot /> {/* Keeps Chatbot fixed on the screen */}
    </div>
  );
}
