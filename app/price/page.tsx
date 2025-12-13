// Plik: app/price/page.tsx
import Link from 'next/link';
import { ArrowLeft, Check, Crown } from 'lucide-react';

export default function PricePage() {
  return (
    <div className="history-page-container" style={{ maxWidth: '1000px' }}>
      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> Wróć do strony głównej
      </Link>
      
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFD700', marginBottom: '10px' }}>
          Wybierz Swój Pakiet
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Dołącz do elitarnego grona i ogrywaj bukmachera z nami.
        </p>
      </header>

      <div className="pricing-grid">
        
        {/* PAKIET 1: TYDZIEŃ */}
        <div className="price-card">
          <div className="price-header">
            <h3>Start</h3>
            <span className="duration">7 Dni</span>
          </div>
          <div className="price-value">
            99,99 <span className="currency">PLN</span>
          </div>
          <ul className="benefits-list">
            <li><Check size={16} className="check-icon"/> Dostęp do typów VIP</li>
            <li><Check size={16} className="check-icon"/> Powiadomienia e-mail</li>
            <li><Check size={16} className="check-icon"/> Wsparcie techniczne</li>
          </ul>
          <button className="buy-btn">Wybieram</button>
        </div>

        {/* PAKIET 2: MIESIĄC (Wyróżniony) */}
        <div className="price-card featured">
          <div className="popular-badge">NAJCZĘŚCIEJ WYBIERANY</div>
          <div className="price-header">
            <h3>Pro</h3>
            <span className="duration">1 Miesiąc</span>
          </div>
          <div className="price-value">
            199,99 <span className="currency">PLN</span>
          </div>
          <ul className="benefits-list">
            <li><Check size={16} className="check-icon"/> <strong>Wszystko z pakietu Start</strong></li>
            <li><Check size={16} className="check-icon"/> Analizy Premium</li>
            <li><Check size={16} className="check-icon"/> Statystyki H2H+</li>
            <li><Check size={16} className="check-icon"/> Dostęp 24/7</li>
          </ul>
          <button className="buy-btn featured-btn">Wybieram</button>
        </div>

        {/* PAKIET 3: 3 MIESIĄCE */}
        <div className="price-card">
          <div className="price-header">
            <h3>Expert</h3>
            <span className="duration">3 Miesiące</span>
          </div>
          <div className="price-value">
            399,99 <span className="currency">PLN</span>
          </div>
          <ul className="benefits-list">
            <li><Check size={16} className="check-icon"/> Pełny dostęp długoterminowy</li>
            <li><Check size={16} className="check-icon"/> Priorytetowe wsparcie</li>
            <li><Check size={16} className="check-icon"/> Oszczędność czasu</li>
          </ul>
          <button className="buy-btn">Wybieram</button>
        </div>

      </div>
    </div>
  );
}
