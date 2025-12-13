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
import '../globals.css'; // Upewniamy się, że CSS jest

export default function MobileConcept() {
  return (
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
            <div className="icon-box"><Search size={24} color="#e4e4e7" /></div>
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
          <div className="flex-row">
            <div className="icon-box"><Tag size={20} color="#a1a1aa" /></div>
            <div className="text-col">
              <span className="card-label-bold">Cennik</span>
              <span className="card-sub">Plany subskrypcji</span>
            </div>
          </div>
          <ArrowUpRight size={20} color="#52525b" />
        </div>

      </div>
      
      <div className="mobile-footer">
        <p>© 2025 BET.AI Pro Version</p>
      </div>

    </div>
  );
}
