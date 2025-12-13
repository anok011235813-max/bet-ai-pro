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
        /* === STYLE BEZPOŚREDNIE (OMIJAMY GLOBALS.CSS) === */
        .mobile-concept-wrapper {
            background-color: #000;
            min-height: 100vh;
            padding: 16px;
            display: flex;
            flex-direction: column;
            font-family: sans-serif; /* Fallback */
            color: white;
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
        }
        .platform-badge {
            width: 32px;
            height: 32px;
            background: #27272a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
            color: #a1a1aa;
        }
        .mobile-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            flex: 1;
        }
        .mobile-card {
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 20px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 140px;
            position: relative;
        }
        .card-search {
            grid-column: span 2;
            min-height: 130px;
            background: #18181b;
        }
        .card-wide {
            grid-column: span 2;
            flex-direction: row;
            align-items: center;
            min-height: 80px;
            height: 80px;
        }
        .card-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .icon-box {
            background: #27272a;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card-content h2 {
            font-size: 1.2rem;
            font-weight: 700;
            margin: 16px 0 4px 0;
        }
        .card-content p {
            font-size: 0.8rem;
            color: #71717a;
            margin: 0;
        }
        .card-label {
            font-size: 1rem;
            font-weight: 700;
            color: #e4e4e7;
            margin-top: auto;
        }
        .badge-count {
            background: rgba(74, 222, 128, 0.2);
            color: #4ade80;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
        }
        .mobile-footer {
            text-align: center;
            font-size: 0.7rem;
            color: #52525b;
            margin-top: 20px;
        }
        .flex-row-content {
           display: flex;
           align-items: center;
           gap: 12px;
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
              <div className="icon-box"><Search size={20} color="#e4e4e7" /></div>
              <ArrowUpRight size={20} color="#52525b" />
            </div>
            <div className="card-content">
              <h2>Szukaj Zespołu</h2>
              <p>Analiza H2H, Historia</p>
            </div>
          </div>

          {/* 2. AKTYWNE */}
          <div className="mobile-card card-active">
            <div className="card-top">
              <div className="icon-box"><Flame size={20} color="#4ade80" /></div>
              <span className="badge-count">12</span>
            </div>
            <span className="card-label">Aktywne</span>
          </div>

          {/* 3. HISTORIA */}
          <div className="mobile-card">
            <div className="icon-box"><History size={20} color="#e4e4e7" /></div>
            <span className="card-label">Historia</span>
          </div>

          {/* 4. STATYSTYKI */}
          <div className="mobile-card">
            <div className="icon-box"><BarChart2 size={20} color="#818cf8" /></div>
            <span className="card-label">Statystyki</span>
          </div>

          {/* 5. VIP */}
          <div className="mobile-card">
            <div className="icon-box"><Crown size={20} color="#fbbf24" /></div>
            <span className="card-label">VIP</span>
          </div>

          {/* 6. CENNIK */}
          <div className="mobile-card card-wide">
            <div className="flex-row-content">
              <div className="icon-box"><Tag size={20} color="#a1a1aa" /></div>
              <div className="text-col">
                <span className="card-label" style={{marginTop: 0}}>Cennik</span>
                <span style={{fontSize: '0.75rem', color: '#71717a'}}>Plany subskrypcji</span>
              </div>
            </div>
            <ArrowUpRight size={20} color="#52525b" />
          </div>

        </div>
        
        <div className="mobile-footer">
          <p>© 2025 BET.AI Pro Version</p>
        </div>

      </div>
    </>
  );
}
