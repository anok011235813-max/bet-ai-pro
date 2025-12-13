'use client';

import React from 'react';
import { 
  Search, 
  Flame, 
  History, 
  BarChart2, 
  CalendarDays, // Nowa ikona dla "Kto wczoraj złamał"
  Construction, // Ikona dla Work in Progress
  ArrowUpRight
} from 'lucide-react';

export default function MobileConcept() {
  return (
    <>
      <style jsx global>{`
        /* === STYLE ZGODNE Z GLOBALS.CSS === */
        :root {
            --text-main: #ffffff;
            --text-muted: #a1a1aa;
            --accent-magenta: #d946ef;
            --accent-purple: #8b5cf6;
            --accent-green: #4ade80;
            --card-bg: rgba(255, 255, 255, 0.03);
            --card-border: rgba(255, 255, 255, 0.06);
        }

        .mobile-concept-wrapper {
            background: linear-gradient(170deg, #020203 0%, #0a030a 30%, #240a25 80%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            flex-direction: column;
            font-family: sans-serif;
            color: var(--text-main);
        }

        .mobile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .brand-logo {
            font-size: 1.5rem;
            font-weight: 900;
            margin: 0;
            letter-spacing: -0.5px;
            background: linear-gradient(90deg, #fff, #a1a1aa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase; /* WYMUSZENIE WIELKICH LITER */
        }

        .brand-logo .highlight {
             color: var(--accent-magenta);
             -webkit-text-fill-color: var(--accent-magenta);
        }

        .platform-badge {
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--card-border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 700;
            color: var(--text-muted);
        }

        .mobile-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            flex: 1;
        }

        /* KARTY */
        .mobile-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            backdrop-filter: blur(30px);
            border-radius: 24px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 150px;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .icon-box {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--accent-magenta);
        }

        /* Specjalne kolory dla ikon */
        .card-active .icon-box { color: var(--accent-green); border-color: rgba(74, 222, 128, 0.2); background: rgba(74, 222, 128, 0.1); }
        .card-history .icon-box { color: #fff; }
        .card-stats .icon-box { color: var(--accent-purple); border-color: rgba(139, 92, 246, 0.2); background: rgba(139, 92, 246, 0.1); }
        .card-yesterday .icon-box { color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); background: rgba(251, 191, 36, 0.1); }

        /* Kafelek Wyszukiwarki (Duży) */
        .card-search {
            grid-column: span 2;
            min-height: 160px; /* Nieco wyższy dla dłuższego tekstu */
            border-color: rgba(217, 70, 239, 0.3);
            background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(217, 70, 239, 0.05));
        }

        /* Kafelek Nieaktywny (WIP) */
        .card-wip {
            grid-column: span 2;
            flex-direction: row;
            align-items: center;
            min-height: 80px;
            height: 80px;
            opacity: 0.5; /* Wyszarzenie */
            border-style: dashed;
        }

        .card-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .card-content h2 {
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            margin: 16px 0 6px 0;
            line-height: 1.2;
        }

        .card-content p {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin: 0;
            line-height: 1.4;
        }

        .card-label {
            font-size: 1rem;
            font-weight: 700;
            color: #fff;
            margin-top: auto;
            line-height: 1.2;
        }

        .mobile-footer {
            text-align: center;
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: 24px;
            opacity: 0.6;
        }

        .flex-row-content {
           display: flex;
           align-items: center;
           gap: 16px;
        }
        
        .text-col {
           display: flex;
           flex-direction: column;
        }
      `}</style>

      <div className="mobile-concept-wrapper">
        
        {/* HEADER */}
        <div className="mobile-header">
          {/* Logo z Twoim gradientem i wielkimi literami */}
          <h1 className="brand-logo">BET.AI <span className="highlight">PRO</span></h1>
          <div className="platform-badge">PC</div>
        </div>

        {/* BENTO GRID */}
        <div className="mobile-grid">

          {/* 1. WYSZUKIWARKA (Duży) */}
          <div className="mobile-card card-search">
            <div className="card-top">
              <div className="icon-box"><Search size={22} /></div>
              <ArrowUpRight size={22} color="#52525b" />
            </div>
            <div className="card-content">
              <h2>Wyszukiwarka HT/FT</h2>
              <p>Przeszukaj historyczne łamaki dla każdej drużyny. Archiwum ponad 57 tysięcy łamaków od 2015 roku.</p>
            </div>
          </div>

          {/* 2. NASZE WYBRANE TYPY (Aktywne) */}
          <div className="mobile-card card-active">
            <div className="card-top">
              <div className="icon-box"><Flame size={22} /></div>
            </div>
            <div className="card-content">
                <span className="card-label">Nasze wybrane Typy</span>
                <p style={{fontSize: '0.75rem', marginTop: '4px'}}>Propozycje łamaków na najbliższe dni.</p>
            </div>
          </div>

          {/* 3. TRAFIONE TYPY (Historia) */}
          <div className="mobile-card card-history">
            <div className="icon-box"><History size={22} /></div>
            <div className="card-content">
                <span className="card-label">Trafione Typy</span>
                <p style={{fontSize: '0.75rem', marginTop: '4px'}}>Sprawdź wszystkie nasze trafione typy.</p>
            </div>
          </div>

          {/* 4. STATYSTYKI */}
          <div className="mobile-card card-stats">
            <div className="icon-box"><BarChart2 size={22} /></div>
            <div className="card-content">
                <span className="card-label">Statystyki</span>
                <p style={{fontSize: '0.75rem', marginTop: '4px'}}>Zobacz naszą skuteczność.</p>
            </div>
          </div>

          {/* 5. KTO WCZORAJ ZŁAMAŁ? (Nowy) */}
          <div className="mobile-card card-yesterday">
            <div className="icon-box"><CalendarDays size={22} /></div>
             <div className="card-content">
                <span className="card-label">Kto wczoraj złamał?</span>
                <p style={{fontSize: '0.75rem', marginTop: '4px'}}>Wszystkie łamaki z dnia poprzedniego.</p>
            </div>
          </div>

          {/* 6. WORK IN PROGRESS (Szeroki na dole, nieaktywny) */}
          <div className="mobile-card card-wip">
            <div className="flex-row-content">
              <div className="icon-box" style={{background: 'transparent', border: '1px solid #333', color: '#555'}}>
                  <Construction size={22} />
              </div>
              <div className="text-col">
                <span className="card-label" style={{marginTop: 0, color: '#555'}}>Work in Progress</span>
                <span style={{fontSize: '0.75rem', color: '#444'}}>Coming soon...</span>
              </div>
            </div>
          </div>

        </div>
        
        <div className="mobile-footer">
          <p>© 2025 BET.AI PRO Version</p>
        </div>

      </div>
    </>
  );
}
