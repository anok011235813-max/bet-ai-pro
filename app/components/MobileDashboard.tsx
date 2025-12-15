'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  Flame, 
  CheckCircle2, 
  BarChart2, 
  CalendarDays, 
  Construction,
  Lock // Dodany import kłódki
} from 'lucide-react';

export default function MobileDashboard() {
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

        .mobile-wrapper {
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

        .card-link {
            text-decoration: none;
            color: inherit;
            display: contents;
        }

        .mobile-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            backdrop-filter: blur(30px);
            border-radius: 24px;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            min-height: 160px;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            transition: transform 0.2s;
            cursor: pointer;
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
            margin-bottom: 20px;
            flex-shrink: 0;
        }

        .card-active .icon-box { color: var(--accent-green); border-color: rgba(74, 222, 128, 0.2); background: rgba(74, 222, 128, 0.1); }
        .card-stats .icon-box { color: var(--accent-purple); border-color: rgba(139, 92, 246, 0.2); background: rgba(139, 92, 246, 0.1); }
        .card-new .icon-box { color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); background: rgba(251, 191, 36, 0.1); }
        
        .card-history .icon-box { color: #4ade80; border-color: rgba(74, 222, 128, 0.2); background: rgba(74, 222, 128, 0.1); }

        .card-search { grid-column: span 2; background: linear-gradient(145deg, rgba(255,255,255,0.
