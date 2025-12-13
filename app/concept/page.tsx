'use client';

import React from 'react';
import { 
  Search, 
  Flame, 
  History, 
  BarChart2, 
  Crown, 
  Tag,
  ArrowUpRight
} from 'lucide-react';

export default function MobileConcept() {
  return (
    // Ustawiamy wysokość na 100vh (cały ekran) i blokujemy scrollowanie głównego kontenera,
    // żeby uzyskać efekt "aplikacji" gdzie wszystko jest pod ręką.
    <div className="h-screen bg-black text-white p-4 flex flex-col overflow-hidden">
      
      {/* --- HEADER --- */}
      {/* Prosty, zgodny z Twoim stylem */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h1 className="text-xl font-bold tracking-tight">BET.AI Pro</h1>
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
          PC
        </div>
      </div>

      {/* --- BENTO GRID (Główna Siatka) --- */}
      {/* grid-cols-2: Dwie kolumny */}
      {/* flex-1: Rozciąga siatkę na całą dostępną wysokość ekranu */}
      <div className="grid grid-cols-2 gap-3 flex-1 mb-4">

        {/* 1. WYSZUKIWARKA (Duży kafel - najważniejsza funkcja) */}
        {/* col-span-2: Zajmuje całą szerokość na górze */}
        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between active:bg-zinc-800 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <Search className="w-6 h-6 text-zinc-300" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-zinc-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100">Szukaj Zespołu</h2>
            <p className="text-xs text-zinc-500 mt-1">Analiza H2H, Historia, Statystyki</p>
          </div>
        </div>

        {/* 2. AKTYWNE TYPY (Kwadratowy) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between active:bg-zinc-800 transition-colors relative overflow-hidden">
          {/* Delikatny akcent, że coś się dzieje */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-3xl -mr-4 -mt-4"></div>
          
          <div className="flex justify-between items-start">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <Flame className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">12</span>
          </div>
          <span className="font-bold text-zinc-200 mt-2">Aktywne</span>
        </div>

        {/* 3. HISTORIA (Kwadratowy) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between active:bg-zinc-800 transition-colors">
          <div className="p-2 bg-zinc-800 rounded-lg w-fit">
            <History className="w-5 h-5 text-zinc-300" />
          </div>
          <span className="font-bold text-zinc-200 mt-2">Historia</span>
        </div>

        {/* 4. STATYSTYKI (Kwadratowy) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between active:bg-zinc-800 transition-colors">
          <div className="p-2 bg-zinc-800 rounded-lg w-fit">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-bold text-zinc-200 mt-2">Statystyki</span>
        </div>

        {/* 5. VIP (Kwadratowy) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between active:bg-zinc-800 transition-colors">
          <div className="p-2 bg-zinc-800 rounded-lg w-fit">
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
          <span className="font-bold text-zinc-200 mt-2">VIP</span>
        </div>

        {/* 6. CENNIK (Szeroki na dole - domyka układ) */}
        {/* col-span-2: Znowu szeroki na całą szerokość */}
        <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between active:bg-zinc-800 transition-colors h-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <Tag className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <span className="block font-bold text-zinc-200">Cennik</span>
              <span className="text-xs text-zinc-500">Plany subskrypcji</span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-600" />
        </div>

      </div>
      
      {/* Stopka - mały branding */}
      <div className="text-center pb-2">
        <p className="text-[10px] text-zinc-600">© 2025 BET.AI Pro Version</p>
      </div>

    </div>
  );
}
