'use client';

import Link from 'next/link';
import { 
  Search, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  CalendarDays,
  Flame
} from 'lucide-react';
import { useState, useEffect } from 'react';
import VipLoginModal from './VipLoginModal';

// ... (MockSearch i AnimatedChart bez zmian - skróciłem dla czytelności)
function MockSearch() { return <div style={{marginTop:'auto',background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.08)',padding:'12px 16px',borderRadius:'12px',display:'flex',alignItems:'center',gap:'12px',color:'#777'}}><Search size={16}/><span>Szukaj drużyny...</span></div> }
function AnimatedChart() { return <div className="stats-chart-container"><div className="stats-chart-bar" style={{height:'40%'}}/></div> }

interface SuccessPick {
  id: number;
  gospodarz: string;
  gosc: string;
  wynik: string;
  data: string;
}

export default function DashboardGrid({ successPicks }: { successPicks: SuccessPick[] }) {
  const [isVipOpen, setIsVipOpen] = useState(false);

  return (
    <>
      <div className="bento-grid">
        <Link href="/search" className="card card-search">
          <div className="card-header"><div className="icon-wrap"><Search /></div></div>
          <div><h3>Wyszukiwarka HT/FT</h3><p>Przeszukuj historyczne łamaki dla każdej drużyny.<br /> Archiwum ponad 57 tysięcy łamaków od 2015 roku.</p></div>
          <MockSearch />
        </Link>
        
        <Link href="#" className="card card-h2h"> 
          <div className="card-header">
            <div className="icon-wrap" style={{ color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.2)', background: 'rgba(251, 191, 36, 0.1)' }}>
              <CalendarDays />
            </div>
          </div>
          <div><h3>Najnowsze łamaki</h3><p>Wszystkie łamaki z dnia poprzedniego.</p></div>
          <div className="card-footer"><div className="arrow-btn"><ArrowRight size={20} /></div></div>
        </Link>
        
        <Link href="/active" className="card card-active">
          <div className="card-header">
             <div className="icon-wrap" style={{ color: 'var(--accent-green)', borderColor: 'rgba(74, 222, 128, 0.2)', background: 'rgba(74, 222, 128, 0.1)' }}>
                <Flame />
             </div>
          </div>
          <div><h3>Nasze wybrane Typy</h3><p>Propozycje łamaków na najbliższe dni.</p></div>
          <div className="card-footer"><div className="arrow-btn"><ArrowRight size={20} /></div></div>
        </Link>
        
        <div className="card card-vip" style={{ cursor: 'default', opacity: 0.7, filter: 'grayscale(0.3)' }}>
          <div className="card-header" style={{ minHeight: '40px' }}></div>
          <div><h3>Work in Progress</h3></div>
          <div className="card-footer"><div className="arrow-btn"><Lock size={20} style={{ color: '#FFD700' }} /></div></div>
        </div>
        
        <Link href="/stats" className="card card-stats">
          <div className="card-header"><div className="icon-wrap"><BarChart3 /></div></div>
          <div><h3>Statystyki</h3><p>Zobacz naszą skuteczność i kluczowe wskaźniki.</p></div>
          <AnimatedChart />
        </Link>
        
        {/* ZMIANA: ZIELONA IKONA DLA TRAFIONYCH TYPÓW */}
        <Link href="/history" className="card card-history">
          <div className="card-header">
             <div className="icon-wrap" style={{ color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.2)', background: 'rgba(74, 222, 128, 0.1)' }}>
                <CheckCircle2 />
             </div>
          </div>
          <div><h3>Trafione Typy</h3><p>Sprawdź wszystkie nasze trafione Typy.</p></div>
          <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {successPicks && successPicks.length > 0 ? (
              successPicks.map(pick => (
                <div key={pick.id} style={{
                  background: 'rgba(74, 222, 128, 0.05)', border: '1px solid rgba(74, 222, 128, 0.15)',
                  padding: '8px', borderRadius: '10px', fontSize: '0.85rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>{pick.gospodarz} VS {pick.gosc}</span>
                  <span style={{ color: '#4ade80', fontWeight: '700' }}>{pick.wynik}</span>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Brak trafionych typów do wyświetlenia.</p>
            )}
          </div>
        </Link>
      </div>
      {isVipOpen && <VipLoginModal onClose={() => setIsVipOpen(false)} />}
    </>
  );
}
