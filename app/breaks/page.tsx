import { createClient } from '@/utils/supabase';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Wymuszamy brak cache, żeby widzieć nowe importy od razu
export const revalidate = 0;

async function getLatestBreaks() {
  const supabase = createClient();
  
  // Pobieramy paczkę ostatnich, żeby znaleźć najnowszą datę
  const { data: latestData, error } = await supabase
    .from('team_breaks')
    .select('*')
    .order('id', { ascending: false })
    .limit(100);

  if (error || !latestData || latestData.length === 0) {
    return { date: null, breaks: [] };
  }

  // Bierzemy datę z pierwszego rekordu i filtrujemy resztę
  const lastEntry = latestData[0];
  const targetDate = lastEntry['Date'];
  const breaksFromLastDay = latestData.filter((item: any) => item['Date'] === targetDate);

  return { date: targetDate, breaks: breaksFromLastDay };
}

export default async function BreaksPage() {
  const { date, breaks } = await getLatestBreaks();

  return (
    <div className="history-page-container">
      {/* HEADER (Styl z ActivePage) */}
      {/* ZMIANA: Zwiększam maxWidth do 800px (to da więcej miejsca na Desktopie) */}
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', marginBottom: '30px', fontWeight: 500 }}>
            <ArrowLeft size={18} color="#d946ef" /> Wróć
        </Link>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#d946ef', marginBottom: '5px' }}>
            Najnowsze łamaki
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
            {date ? `Z dnia: ${date}` : 'Brak danych'}
            </p>
        </header>

        {/* 
            LISTA MECZÓW - STYLIZACJA 1:1 Z TIPCARD 
        */}
        <div className="tip-card" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
            <div className="history-section" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                {breaks.length > 0 ? (
                    <ul className="history-list">
                        {breaks.map((match: any) => (
                            <li key={match.id} className="history-item">
                                {/* DATA */}
                                <span className="history-date">{match['Date']}</span>
                                
                                {/* LIGA */}
                                <span className="history-league">{match['Competition']}</span>
                                
                                {/* MECZ (Gospodarz vs Gość) */}
                                <span className="history-match">
                                    <span>{match['home team']}</span>
                                    {' vs '}
                                    <span className="team-in-focus">{match['away team']}</span>
                                </span>
                                
                                {/* WYNIK (FT + HT) */}
                                <strong className="history-score">
                                    {match['ft result']} ({match['ht result']})
                                </strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ textAlign: 'center', color: '#a1a1aa', marginTop: '40px' }}>Brak danych w bazie.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
