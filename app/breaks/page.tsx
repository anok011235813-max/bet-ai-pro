import { createClient } from '@/utils/supabase';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

async function getLatestBreaks() {
  const supabase = createClient();
  const { data: latestData, error } = await supabase
    .from('team_breaks')
    .select('*')
    .order('id', { ascending: false })
    .limit(100);

  if (error || !latestData || latestData.length === 0) return { date: null, breaks: [] };

  const lastEntry = latestData[0];
  const targetDate = lastEntry['Date'];
  const breaksFromLastDay = latestData.filter((item: any) => item['Date'] === targetDate);

  return { date: targetDate, breaks: breaksFromLastDay };
}

export default async function BreaksPage() {
  const { date, breaks } = await getLatestBreaks();

  return (
    <div className="history-page-container">
      {/* KONTENER: MaxWidth 900px (Desktop +10%) */}
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', marginBottom: '30px', fontWeight: 500 }}>
            <ArrowLeft size={18} color="#d946ef" /> Wróć
        </Link>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#d946ef', marginBottom: '5px' }}>Najnowsze łamaki</h1>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{date ? `Z dnia: ${date}` : 'Brak danych'}</p>
        </header>

        <div className="tip-card" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
            <div className="history-section" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                {breaks.length > 0 ? (
                    <ul className="history-list" style={{ width: '100%' }}> 
                        {/* W CSS poniżej dodamy width: 110% na mobile dla .history-item */}
                        {breaks.map((match: any) => (
                            <li key={match.id} className="history-item">
                                
                                {/* 
                                    WIERSZ 1 (MOBILE): DATA (L) - KRAJ (C) - LIGA (R)
                                    Na Desktopie CSS to "wyprostuje" w jedną linię.
                                */}
                                <div className="meta-row">
                                    <span className="meta-date">{match['Date']}</span>
                                    <span className="meta-country">{match['Country/Continent']}</span>
                                    <span className="meta-league">{match['Competition']}</span>
                                </div>
                                
                                {/* WIERSZ 2: MECZ */}
                                <span className="history-match">
                                    <span>{match['home team']}</span>
                                    {' vs '}
                                    <span>{match['away team']}</span>
                                </span>
                                
                                {/* WYNIK (Absolutnie po prawej) */}
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

      <style>{`
        /* BAZOWY STYL (MOBILE FIRST) */
        .history-item {
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            position: relative;
            padding: 12px 14px !important; 
            padding-right: 90px !important; /* Miejsce na wynik */
            
            /* MOBILE: Rozszerzamy pasek o 10% względem kontenera */
            width: 104% !important; 
            margin-left: -2% !important; /* Wyśrodkowanie tego szerszego paska */
        }

        /* Wiersz z metadanymi (Data - Kraj - Liga) */
        .meta-row {
            display: flex;
            justify-content: space-between; /* Rozrzuca na boki */
            align-items: center;
            width: 100%;
            font-size: 0.7rem;
            color: #a1a1aa;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding-bottom: 4px;
            margin-bottom: 2px;
        }

        .meta-date { text-align: left; }
        .meta-country { 
            text-align: center; 
            color: #fff; /* Wyróżniamy kraj */
            font-weight: 500;
            flex: 1; /* Zajmuje dostępną przestrzeń środkową */
        }
        .meta-league { text-align: right; }

        .history-match {
            margin-top: 0 !important;
        }

        /* Wynik absolutnie po prawej (wyśrodkowany w pionie) */
        .history-score {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.9rem;
        }

        /* --- DESKTOP (od 768px) --- */
        @media (min-width: 768px) {
            .history-item {
                flex-direction: row !important;
                align-items: center !important;
                padding-right: 12px !important;
                padding-left: 12px !important;
                width: 100% !important; /* Resetujemy szerokość na desktopie */
                margin-left: 0 !important;
                gap: 16px !important;
            }

            .meta-row {
                width: auto;
                border-bottom: none;
                padding-bottom: 0;
                margin-bottom: 0;
                gap: 12px;
                justify-content: flex-start;
                flex: 1;
            }

            .meta-country, .meta-league, .meta-date {
                text-align: left;
                flex: initial;
            }
            
            /* Dodajemy separatory wizualne na desktopie */
            .meta-date::after, .meta-country::after {
                content: "|";
                margin-left: 12px;
                color: #3f3f46;
            }

            .history-match {
                flex: 1;
                text-align: center;
            }

            .history-score {
                position: static;
                transform: none;
            }
        }
      `}</style>
    </div>
  );
}
