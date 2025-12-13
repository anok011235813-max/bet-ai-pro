'use client';

import React from 'react';
import { 
  Search, Bell, Trophy, Calendar, 
  TrendingUp, Home, LineChart, Wallet, User,
  ChevronRight, Flame
} from 'lucide-react';

export default function MobileConcept() {
  // Przykładowe dane tylko do wizualizacji
  const categories = ['Wszystkie', '🔥 Gorące', 'Piłka Nożna', 'NBA', 'Esport', 'Tenis'];
  
  const matches = [
    {
      id: 1,
      league: "PREMIER LEAGUE",
      time: "20:45",
      live: true,
      home: "Arsenal",
      away: "Liverpool",
      score: "1-1",
      prediction: "Powyżej 2.5 gola",
      odds: 1.85,
      confidence: "High"
    },
    {
      id: 2,
      league: "LA LIGA",
      time: "Jutro, 18:00",
      live: false,
      home: "Real Madrid",
      away: "Valencia",
      score: null,
      prediction: "Real Madrid wygra",
      odds: 1.42,
      confidence: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans selection:bg-indigo-500/30">
      
      {/* --- 1. HEADER (Glassmorphism) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 px-5 pt-12 pb-4 bg-black/60 backdrop-blur-xl border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">BET.AI <span className="text-indigo-500">PRO</span></span>
        </div>
        <div className="flex gap-4">
          <Search className="w-6 h-6 text-zinc-400" />
          <div className="relative">
            <Bell className="w-6 h-6 text-zinc-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* --- PUSTA PRZESTRZEŃ POD HEADEREM --- */}
      <div className="h-28"></div>

      {/* --- 2. HERO SECTION ("Bet of the Day") --- */}
      <div className="px-4 mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-5">
          {/* Tło glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400 fill-orange-400" /> 
              Pewniak Dnia
            </span>
            <span className="text-xs text-zinc-400 font-mono">AI CONFIDENCE: 94%</span>
          </div>

          <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-zinc-800 mb-2"></div>
              <span className="text-sm font-bold">Man City</span>
            </div>
            <div className="text-2xl font-black text-zinc-500 px-4">VS</div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-zinc-800 mb-2"></div>
              <span className="text-sm font-bold">Chelsea</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-sm shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 active:scale-95 transition-transform">
            Zobacz Analizę <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- 3. FILTRY (Swipeable Pills) --- */}
      <div className="pl-4 mb-6 overflow-x-auto scrollbar-hide flex gap-3">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={`
              whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all
              ${i === 0 
                ? 'bg-white text-black shadow-lg shadow-white/10' 
                : 'bg-zinc-900/80 text-zinc-400 border border-white/5'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- 4. LISTA MECZÓW (Modern Cards) --- */}
      <div className="px-4 space-y-4">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-zinc-500" /> 
          Nadchodzące Typy
        </h3>

        {matches.map((match) => (
          <div key={match.id} className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-[24px] p-1 border border-white/5 active:scale-[0.99] transition-transform duration-200">
            {/* Wewnętrzny kontener */}
            <div className="bg-black/40 rounded-[20px] p-4">
              
              {/* Header Karty */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 tracking-wider">
                  <span className="w-1 h-4 rounded-full bg-indigo-500"></span>
                  {match.league}
                </div>
                {match.live ? (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> LIVE
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Calendar className="w-3 h-3" /> {match.time}
                  </div>
                )}
              </div>

              {/* Drużyny */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">{match.home}</span>
                  <span className="font-mono text-zinc-400">{match.score ? match.score.split('-')[0] : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">{match.away}</span>
                  <span className="font-mono text-zinc-400">{match.score ? match.score.split('-')[1] : '-'}</span>
                </div>
              </div>

              {/* Stopka Karty (Typ + Kurs) */}
              <div className="flex gap-2">
                <div className="flex-1 bg-zinc-800/50 rounded-xl px-3 py-2.5 flex flex-col justify-center border border-white/5">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Nasz Typ</span>
                  <span className="text-sm font-bold text-indigo-200 truncate">{match.prediction}</span>
                </div>
                <div className="w-20 bg-white text-black rounded-xl flex flex-col items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  <span className="text-[10px] font-bold text-zinc-400 leading-tight">KURS</span>
                  <span className="text-lg font-black leading-none">{match.odds}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* --- 5. BOTTOM NAVIGATION BAR (Floating) --- */}
      <div className="fixed bottom-6 left-4 right-4 h-16 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl flex justify-around items-center px-2 z-50">
        <button className="p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 transform -translate-y-4 border-4 border-black">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-500 hover:text-white transition-colors">
          <LineChart className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-500 hover:text-white transition-colors">
          <Wallet className="w-6 h-6" />
        </button>
        <button className="p-3 text-zinc-500 hover:text-white transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
