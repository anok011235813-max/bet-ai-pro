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
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* TWÓJ WYMAGANY RETURN DLA LINKU */}
        <Link href="/" className="back-link">
            <ArrowLeft size={18} color="#d946ef" /> Wróć
        </Link>
        
        <header style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#d946ef', marginBottom: '5px' }}>Najnowsze łamaki</h1>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{date ? `Z dnia: ${date}` : 'Brak danych'}</p>
        </header>

        <div className="tip-card" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
            <div className="history-section" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                {breaks.length > 0 ? (
                    <ul className="history-list" style={{ width: '100%' }}> 
                        {breaks.map((match: any) => (
                            <li key={match.id} className="history-item">
                                
                                <div className="meta-row">
                                    <span>{match['Date']}</span>
                                    <span className="desktop-separator"> | </span>
                                    
                                    <span className="meta-country">{match['Country/Continent']}</span>
                                    
                                    <span className="desktop-separator"> | </span>
                                    <span>{match['Competition']}</span>
                                    
                                    <span className="desktop-separator"> | </span>
                                </div>

                                <div className="match-row">
                                    <span className="history-match">
                                        <span>{match['home team']}</span>
                                        {' vs '}
                                        <span>{match['away team']}</span>
                                    </span>
                                    
                                    <strong className="history-score">
                                        {match['ft result']} ({match['ht result']})
                                    </strong>
                                </div>
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
        /* FIX: USUNIĘCIE BIAŁEGO SEPARATORA Z GLOBALS */
        .history-match::before {
            content: none !important;
            display: none !important;
        }

        /* STYL DLA PRZYCISKU POWROTU */
        .back-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            width: fit-content;
        }

        .history-item {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            padding: 12px 14px !important; 
            width: 110% !important; 
            margin-left: -5% !important;
        }

        .desktop-separator { display: none; }

        .meta-row {
            display: flex;
            justify-content: space-between; 
            width: 100%;
            font-size: 0.75rem; 
            color: #a1a1aa; 
        }

        .meta-country { text-align: center; flex: 1; }

        .match-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .history-match { margin: 0 !important; font-size: 0.9rem; color: #fff; }
        .history-score { font-size: 0.9rem; color: #d946ef; }

        @media (min-width: 768px) {
            .history-item {
                flex-direction: row !important;
                align-items: center !important;
                gap: 0 !important; 
                width: 100% !important; 
                margin-left: 0 !important;
                justify-content: flex-start !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
            }

            .meta-row {
                width: auto;
                justify-content: flex-start;
                gap: 0; 
                margin: 0;
                font-size: 0.9rem !important;
                color: #a1a1aa !important;
            }

            .desktop-separator { 
                display: inline; 
                color: #3f3f46; 
                margin: 0 10px; 
            }
            
            .meta-country, .meta-league, .meta-date {
                text-align: left;
                font-size: 0.9rem !important;
                color: #a1a1aa !important;
            }

            .match-row {
                flex: 1; 
                justify-content: space-between;
                margin-left: 0; 
            }
            
            .history-match { font-size: 0.9rem !important; color: #fff !important; }
            .history-score { font-size: 0.9rem !important; }
        }
      `}</style>
    </div>
  );
}
