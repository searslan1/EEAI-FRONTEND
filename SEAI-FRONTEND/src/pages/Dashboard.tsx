import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "../components/ui/button";
import Header from "../components/Header"; // Yeni Header bileşeni import ediliyor

export default function Dashboard() {
  const categories = [
    { title: "Trending Interviews", items: ["Tech CEO", "Startup Founder", "AI Researcher"] },
    { title: "Top in Technology", items: ["Software Engineer", "Data Scientist", "Product Manager"] },
    { title: "Business Leaders", items: ["Fortune 500 CEO", "Venture Capitalist", "Marketing Guru"] }
  ];

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-blue-300 lg:h-[140vh] text-gray-800">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
          <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
            <img src="/placeholder.svg" alt="Featured Interview" className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
            Exclusive Interview: Tech Visionary
          </h1>
          <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            Dive deep into the mind of a leading tech innovator.
          </p>
          <div className="flex space-x-3">
            <Button className="bg-white text-black">Play</Button>
            <Button className="bg-[gray]/70">More Info</Button>
          </div>
        </div>
        <section className="md:space-y-24">
          {categories.map((category) => (
            <div key={category.title} className="space-y-2 md:space-y-4">
              <h2 className="w-56 cursor-pointer text-sm font-semibold text-gray-700 transition duration-200 hover:text-gray-900 md:text-2xl">
                {category.title}
              </h2>
              <div className="group relative md:-ml-2">
                <div className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide hover:scrollbar-default">
                  {category.items.map((item) => (
                    <div key={item} className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
                      <img src="https://cdn.mos.cms.futurecdn.net/VFLt5vHV7aCoLrLGjP9Qwm-1200-80.jpg.webp" alt={item} className="rounded-sm object-cover md:rounded" />
                      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 hover:opacity-100">
                        <p className="text-center text-white">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <ChevronDown className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
                <ChevronDown className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
