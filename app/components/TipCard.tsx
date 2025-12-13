// Plik: app/components/TipCard.tsx (FINALNA, POPRAWNA WERSJA)
'use client'

interface HistoryEntry {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  league: string;
}

interface Tip {
  id: number;
  kraj: string;
  rozgrywki: string;
  data: string;
  godzina: string;
  gospodarz: string;
  gosc: string;
  wynik: string | null;
  status: string;
  teaminfocus: string;
  kupon: string;
  historia: HistoryEntry[];
}

function parseDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string') return new Date(0);
  const parts = dateStr.split('.').map(Number);
  if (parts.length !== 3) return new Date(0);
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

function TeamName({ name, isInFocus }: { name: string; isInFocus: boolean }) {
  return ( <span className={isInFocus ? 'team-in-focus' : ''}>{name}</span> );
}

function CouponStatus({ status }: { status: string }) {
  if (!status) return null;
  const isWin = status.toLowerCase() === 'wygrany';
  const displayText = isWin ? 'Trafiony' : status;
  return ( <span className={`coupon-status ${isWin ? 'win' : 'loss'}`}>{displayText}</span> );
}

export default function TipCard({ tip }: { tip: Tip }) {
    const sortedHistory = tip.historia 
      ? [...tip.historia].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()) 
      : [];

    return (
        <article className={`tip-card status-${tip.status}`}>
            <header className="card-header">
                <span>{tip.kraj} | {tip.rozgrywki}</span>
                <span>{tip.data} | {tip.godzina}</span>
            </header>
            
            <div className="match-info">
                <h2>
                    <TeamName name={tip.gospodarz} isInFocus={tip.teaminfocus === tip.gospodarz} />
                    <span className="vs"> VS </span>
                    <TeamName name={tip.gosc} isInFocus={tip.teaminfocus === tip.gosc} />
                </h2>
            </div>
            
            {(tip.wynik || tip.kupon) && (
                <div className="final-result">
                    <div className="score-container">
                        {tip.wynik && ( <span className="final-score"><span className="score-prefix">Wynik:</span> {tip.wynik}</span> )}
                    </div>
                    <CouponStatus status={tip.kupon} />
                </div>
            )}

            {sortedHistory.length > 0 && (
                <div className="history-section">
                    <h4 className="history-title">Historia Spotkań:</h4>
                    <ul className="history-list">
                        {sortedHistory.map((entry, index) => (
                            // POPRAWIONA, PŁASKA STRUKTURA
                            <li key={index} className="history-item">
                                <span className="history-date">{entry.date}</span>
                                <span className="history-league">{entry.league}</span>
                                <span className="history-match">
                                    <TeamName name={entry.homeTeam} isInFocus={tip.teaminfocus === entry.homeTeam} />
                                    {' vs '}
                                    <TeamName name={entry.awayTeam} isInFocus={tip.teaminfocus === entry.awayTeam} />
                                </span>
                                <strong className="history-score">{entry.score}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
}
