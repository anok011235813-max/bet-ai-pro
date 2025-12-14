import { createClient } from '@/utils/supabase';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import Link from 'next/link';

// Wymuszamy świeże dane
export const revalidate = 0;

interface BreakMatch {
  id: number;
  date: string;       // "12.12.2025" lub inny format z CSV
  home_team: string;  // Uwaga: w bazie masz kolumny ze spacjami "home team"?
                      // Supabase zazwyczaj zamienia spacje na podkreślenia przy imporcie,
                      // LUB musimy użyć cudzysłowów w zapytaniu.
                      // W Twoim imporcie (ImportForm) widziałem "home team", "away team".
                      // Sprawdźmy w kodzie poniżej.
  away_team: string;
  ht_result: string;
  ft_result: string;
  competition: string;
}

async function getLatestBreaks() {
  const supabase = createClient();

  // 1. Najpierw pobierzmy jeden rekord posortowany po ID malejąco (lub po dacie), 
  // żeby zobaczyć jaka jest "ostatnia data".
  // Zakładam, że masz kolumnę 'Date' (tekst) oraz 'Year', 'Month', 'Day' (liczby)?
  // W imporcie widziałem, że parsujesz Year/Month.
  
  // Bezpieczniej: Pobierzmy po prostu 50 ostatnich wpisów posortowanych po ID malejąco.
  // Zazwyczaj importujesz je chronologicznie.
  
  const { data: latestData, error } = await supabase
    .from('team_breaks')
    .select('*')
    .order('id', { ascending: false })
    .limit(100); // Pobieramy paczkę ostatnich

  if (error || !latestData || latestData.length === 0) {
    console.error("Błąd pobierania łamaków:", error);
    return { date: null, breaks: [] };
  }

  // Grupujemy po dacie, żeby znaleźć tę "najnowszą" w tej paczce.
  // Zakładam, że importujesz dzień po dniu, więc pierwsze 100 rekordów to będzie ten sam dzień (lub dwa).
  const lastEntry = latestData[0];
  const targetDate = lastEntry['Date']; // Np. "12.12.2025"

  // Filtrujemy tylko mecze z tej daty
  const breaksFromLastDay = latestData.filter((item: any) => item['Date'] === targetDate);

  return { date: targetDate, breaks: breaksFromLastDay };
}

export default async function BreaksPage() {
  const { date, breaks } = await getLatestBreaks();

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-pink-500 selection:text-white pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading">Najnowsze łamaki</h1>
            <p className="text-sm text-gray-400">
               {date ? `Z dnia: ${date}` : 'Brak danych'}
            </p>
          </div>
        </div>

        {/* LISTA MECZÓW */}
        <div className="space-y-4">
          {breaks.length > 0 ? (
            breaks.map((match: any) => (
              <div 
                key={match.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                {/* TŁO GRADIENTOWE (Delikatne żółte, bo to łamaki) */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50" />
                
                <div className="relative z-10">
                  {/* NAGŁÓWEK KARTY: LIGA I GODZINA (jeśli jest) */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-300">
                        {match['Country/Continent'] || 'Świat'}
                      </span>
                      <span className="text-xs text-gray-400 font-medium truncate max-w-[120px]">
                        {match['Competition']}
                      </span>
                    </div>
                  </div>

                  {/* DRUŻYNY */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-white">
                        {match['home team']}
                      </span>
                      {/* Wynik HT */}
                      <span className="text-sm font-mono text-gray-400 bg-black/30 px-2 py-1 rounded">
                        HT: {match['ht result']}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-white">
                        {match['away team']}
                      </span>
                      {/* Wynik FT */}
                      <span className="text-sm font-mono text-yellow-400 bg-black/30 px-2 py-1 rounded border border-yellow-500/20">
                        FT: {match['ft result']}
                      </span>
                    </div>
                  </div>

                  {/* STOPKA KARTY: Info o łamaku */}
                  <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-yellow-500">
                      <CalendarDays size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        Łamak {match['Break']}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Brak zaimportowanych łamaków.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
