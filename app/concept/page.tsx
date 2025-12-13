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
    <>
      <style jsx global>{`
        /* === STYLE ZGODNE Z GLOBALS.CSS === */
        :root {
            --text-main: #ffffff;
            --text-muted: #a1a1aa;
            --accent-magenta: #d946ef;
            --accent-purple: #8b5cf6;
            --accent-green: #4ade80;
            --accent-glow: rgba(217, 70, 239, 0.4);
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
            font-weight: 800;
            color: #fff;
            margin: 0;
            letter-spacing: -0.5px;
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

        /* KARTY STYLIZOWANE JAK DESKTOP */
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

        /* Ikony w stylu desktop */
        .icon-box {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--accent-magenta); /* Domyślny kolor */
        }

        /* Specjalne kolory dla ikon */
        .card-active .icon-box { color: var(--accent-green); border-color: rgba(74, 222, 128, 0.2); background: rgba(74, 222, 128, 0.1); }
        .card-vip .icon-box { color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); background: rgba(251, 191, 36, 0.1); }
        .card-stats .icon-box { color: var(--accent-purple); border-color: rgba(139, 92, 246, 0.2); background: rgba(139, 92, 246, 0.1); }

        .card-search {
            grid-column: span 2;
            min-height: 140px;
            border-color: rgba(217, 70, 239, 0.3); /* Delikatny fioletowy border */
            background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(217, 70, 239, 0.05));
        }

        .card-wide {
            grid-column: span 2;
            flex-direction: row;
            align-items: center;
            min-height: 90px;
            height: 90px;
        }

        .card-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .card-content h2 {
            font-size: 1.3rem;
            font-weight: 700;
            color: #fff;
            margin: 16px 0 4px 0;
        }

        .card-content p {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin: 0;
        }

        .card-label {
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            margin-top: auto;
        }

        .badge-count {
            background: var(--accent-green);
            color: #000;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 800;
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
          <h1 className="brand-logo">BET.AI Pro</h1>
          <div className="platform-badge">PC</div>
        </div>

        {/* BENTO GRID */}
        <div className="mobile-grid">

          {/* 1. SZUKAJ */}
          <div className="mobile-card card-search">
            <div className="card-top">
              <div className="icon-box"><Search size={22} /></div>
              <ArrowUpRight size={22} color="#52525b" />
            </div>
            <div className="card-content">
              <h2>Szukaj Zespołu</h2>
              <p>Analiza H2H, Historia, Statystyki</p>
            </div>
          </div>

          {/* 2. AKTYWNE */}
          <div className="mobile-card card-active">
            <div className="card-top">
              <div className="icon-box"><Flame size={22} /></div>
              <span className="badge-count">12</span>
            </div>
            <span className="card-label">Aktywne</span>
          </div>

          {/* 3. HISTORIA */}
          <div className="mobile-card">
            <div className="icon-box"><History size={22} /></div>
            <span className="card-label">Historia</span>
          </div>

          {/* 4. STATYSTYKI */}
          <div className="mobile-card card-stats">
            <div className="icon-box"><BarChart2 size={22} /></div>
            <span className="card-label">Statystyki</span>
          </div>

          {/* 5. VIP */}
          <div className="mobile-card card-vip">
            <div className="icon-box"><Crown size={22} /></div>
            <span className="card-label">VIP</span>
          </div>

          {/* 6. CENNIK */}
          <div className="mobile-card card-wide">
            <div className="flex-row-content">
              <div className="icon-box"><Tag size={22} /></div>
              <div className="text-col">
                <span className="card-label" style={{marginTop: 0}}>Cennik</span>
                <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Plany subskrypcji</span>
              </div>
            </div>
            <ArrowUpRight size={22} color="#52525b" />
          </div>

        </div>
        
        <div className="mobile-footer">
          <p>© 2025 BET.AI Pro Version</p>
        </div>

      </div>
    </>
  );
}
