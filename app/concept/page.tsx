'use client';

import React from 'react';
import { 
  Search, 
  Flame, 
  History, 
  BarChart2, 
  CalendarDays, 
  Construction
} from 'lucide-react';

export default function MobileConcept() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        :root {
            --font-heading: 'Space Grotesk', sans-serif;
            --font-body: 'Outfit', sans-serif;
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
            font-family: var(--font-body);
            color: var(--text-main);
        }

        .mobile-header {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 24px;
            padding-top: 10px;
        }

        .brand-logo {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
            background: linear-gradient(90deg, #fff, #a1a1aa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
        }

        .brand-logo .highlight {
             color: var(--accent-magenta);
             -webkit-text-fill-color: var(--accent-magenta);
        }

        .mobile-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            flex: 1;
        }

        /* === GŁÓWNA KLASA KARTY (WSPÓLNA DLA WSZYSTKICH) === */
        .mobile-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border); /* Jednolity border wszędzie */
            backdrop-filter: blur(30px);
            border-radius: 24px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* To kluczowe dla równych odstępów */
            min-height: 150px;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        
        .mobile-card:active {
            transform: scale(0.98);
            background: rgba(255, 255, 255, 0.05);
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
            margin-bottom: 12px; /* Stały odstęp pod ikoną */
        }

        /* Kolory ikon */
        .card-active .icon-box { color: var(--accent-green); border-color: rgba(74, 222, 128, 0.2); background: rgba(74, 222, 128, 0.1); }
        .card-history .icon-box { color: #fff; }
        .card-stats .icon-box { color: var(--accent-purple); border-color: rgba(139, 92, 246, 0.2); background: rgba(139, 92, 246, 0.1); }
        .card-yesterday .icon-box { color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); background: rgba(251, 191, 36, 0.1); }

        /* Wyszukiwarka (Duży) - nadpisujemy tylko rozmiar */
        .card-search {
            grid-column: span 2;
            min-height: 160px;
            /* Usunięty fioletowy border i gradient, teraz jest jak inne */
        }

        /* Work In Progress */
        .card-wip {
            grid-column: span 2;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start; /* Inny układ dla paska */
            min-height: 80px;
            height: 80px;
            opacity: 0.5;
            border-style: dashed;
            gap: 16px;
        }
        
        .card-wip .icon-box {
             margin-bottom: 0; /* Tutaj resetujemy margines */
        }

        /* TYPOGRAFIA */
        .card-content h2 {
            font-family: var(--font-heading);
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            margin: 0 0 8px 0;
            line-height: 1.2;
        }

        .search-desc {
             display: block; /* Każde zdanie w nowej linii */
             font-family: var(--font-body);
             font-size: 0.85rem;
             color: var(--text-muted);
             margin-bottom: 4px; /* Odstęp między zdaniami */
             line-height: 1.4;
        }

        .card-label {
            font-family: var(--font-heading);
            font-size: 1rem;
            font-weight: 700;
            color: #fff;
            line-height: 1.2;
            margin-bottom: 4px;
        }
        
        .card-subtext {
            font-family: var(--font-body);
            font-size: 0.75rem;
            color: var(--text-muted);
            line-height: 1.3;
        }
        
        /* Kontener dla treści w małych kafelkach */
        .small-card-content {
             margin-top: auto; /* Wypycha treść na sam dół */
        }

      `}</style>

      <div className="mobile-concept-wrapper">
        
        {/* HEADER */}
        <div className="mobile-header">
          <h1 className="brand-logo">BET.AI <span className="highlight">PRO</span></h1>
        </div>

        {/* BENTO GRID */}
        <div className="mobile-grid">

          {/* 1. WYSZUKIWARKA HT/FT (Bez strzałki, bez fioletu, 2 linie opisu) */}
          <div className="mobile-card card-search">
            <div className="icon-box"><Search size={22} /></div>
            <div className="card-content">
              <h2>Wyszukiwarka HT/FT</h2>
              <span className="search-desc">Przeszukaj historyczne łamaki dla każdej drużyny.</span>
              <span className="search-desc">Archiwum ponad 57 tysięcy łamaków od 2015 roku.</span>
            </div>
          </div>

          {/* 2. NASZE WYBRANE TYPY */}
          <div className="mobile-card card-active">
            <div className="icon-box"><Flame size={22} /></div>
            <div className="small-card-content">
                <div className="card-label">Nasze wybrane Typy</div>
                <div className="card-subtext">Propozycje łamaków na najbliższe dni.</div>
            </div>
          </div>

          {/* 3. TRAFIONE TYPY */}
          <div className="mobile-card card-history">
            <div className="icon-box"><History size={22} /></div>
            <div className="small-card-content">
                <div className="card-label">Trafione Typy</div>
                <div className="card-subtext">Sprawdź wszystkie nasze trafione typy.</div>
            </div>
          </div>

          {/* 4. STATYSTYKI */}
          <div className="mobile-card card-stats">
            <div className="icon-box"><BarChart2 size={22} /></div>
            <div className="small-card-content">
                <div className="card-label">Statystyki</div>
                <div className="card-subtext">Zobacz naszą skuteczność i kluczowe wskaźniki.</div>
            </div>
          </div>

          {/* 5. KTO WCZORAJ ZŁAMAŁ? */}
          <div className="mobile-card card-yesterday">
            <div className="icon-box"><CalendarDays size={22} /></div>
             <div className="small-card-content">
                <div className="card-label">Kto wczoraj złamał?</div>
                <div className="card-subtext">Wszystkie łamaki z dnia poprzedniego.</div>
            </div>
          </div>

          {/* 6. WORK IN PROGRESS */}
          <div className="mobile-card card-wip">
              <div className="icon-box" style={{background: 'transparent', border: '1px solid #333', color: '#555'}}>
                  <Construction size={22} />
              </div>
              <div className="text-col">
                <div className="card-label" style={{color: '#555'}}>Work in Progress</div>
              </div>
          </div>

        </div>

      </div>
    </>
  );
}
