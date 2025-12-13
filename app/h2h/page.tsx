// Plik: app/h2h/page.tsx
import { createClient } from '@/utils/supabase';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 0;

async function getBestH2H() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('best_h2h')
    .select('*'); // Pobieramy wszystko, sortowanie zrobimy w JS

  if (error) {
    console.error("Błąd pobierania H2H:", error);
    return [];
  }
  
  if (!data) return [];

  // SORTOWANIE: Od pary, która ma najwięcej meczów w historii (historia.length malejąco)
  return data.sort((a, b) => {
    const historyA = Array.isArray(a.historia) ? a.historia.length : 0;
    const historyB = Array.isArray(b.historia) ? b.historia.length : 0;
    return historyB - historyA;
  });
}

const cleanScore = (score: string) => {
  if (!score) return '-:-';
  return score.replace(/''/g, '');
};

export default async function H2HPage() {
  const pairs = await getBestH2H();

  return (
    <div className="history-page-container">
      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> Wróć do strony głównej
      </Link>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#d946ef' }}>
          Najlepsze H2H
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Odkryj pary które regularnie łamią między sobą.
        </p>
      </header>

      <div className="tip-card-list">
        {pairs.length > 0 ? (
          pairs.map((pair) => (
            <div key={pair.id} className="tip-card">
              
              {/* HEADER: Wierne odwzorowanie Active Tips */}
              <div className="card-header">
                {/* LEWA STRONA: KRAJ (Tu jest miejsce na kontekst geograficzny) */}
                <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {pair.kraj}
                </span>
                
                {/* PRAWA STRONA: PUSTA (Brak daty/godziny w H2H) */}
                <span></span>
              </div>

              {/* MATCH INFO */}
              <div className="match-info">
                <h2>
                  {pair.gospodarz} 
                  <span className="vs">VS</span> 
                  {pair.gosc}
                </h2>
              </div>

              {/* HISTORIA */}
              <div className="history-section">
                <div className="history-title">Historia Spotkań:</div>
                
                <div className="history-list">
                  {(Array.isArray(pair.historia) ? pair.historia : []).map((mecz: any, index: number) => (
                    <div key={index} className="history-item">
                      <span className="history-date">{mecz.data}</span>
                      <span className="history-league">{mecz.liga}</span>
                      <span className="history-match">{mecz.gospodarz_mecz} vs {mecz.gosc_mecz}</span>
                      <span className="history-score">{cleanScore(mecz.score)}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <p>Brak danych H2H.</p>
          </div>
        )}
      </div>
    </div>
  );
}
