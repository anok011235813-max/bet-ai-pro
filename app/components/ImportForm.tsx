// Plik: app/components/ImportForm.tsx
'use client'

import { useState } from "react";
import { importTipsFromJSON, importH2HFromJSON, importBreaksFromCSV } from "@/app/admin/actions";
import { FileSpreadsheet, FileJson, FileText } from 'lucide-react'; // Opcjonalnie ikony, jeśli masz lucide-react

export default function ImportForm() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean, message: string } | null>(null);

    // 1. Obsługa importu Typów (XLSX)
    const handleXlsxSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        setLoading(true);
        setResult(null);

        const formData = new FormData(form);
        const res = await importTipsFromJSON(formData);
        
        setResult(res);
        setLoading(false);
        if (res.success) form.reset();
    };

    // 2. Obsługa importu H2H (JSON)
    const handleJsonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        setLoading(true);
        setResult(null);

        const formData = new FormData(form);
        const res = await importH2HFromJSON(formData);

        setResult(res);
        setLoading(false);
        if (res.success) form.reset();
    };

    // 3. Obsługa importu Team Breaks (CSV) - NOWOŚĆ
    const handleBreaksSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        setLoading(true);
        setResult(null);

        if (!confirm("UWAGA! To działanie usunie WSZYSTKIE obecne dane w tabeli 'team_breaks' i zastąpi je nowymi z pliku. Czy kontynuować?")) {
            setLoading(false);
            return;
        }

        const formData = new FormData(form);
        // Musimy upewnić się, że pole w formularzu nazywa się 'file', bo tak oczekuje action.ts
        const res = await importBreaksFromCSV(formData);

        setResult(res);
        setLoading(false);
        if (res.success) form.reset();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* --- SEKCJA 1: TYPY (XLSX) --- */}
            <div className="import-card-section" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <FileSpreadsheet size={20} color="#1EE6CA" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', margin: 0 }}>Import Typów (XLSX)</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Zasilanie tabeli <code>tips</code>. Dodaje nowe rekordy.
                </p>
                <form onSubmit={handleXlsxSubmit}>
                    <input
                        type="file"
                        name="jsonFile"
                        accept=".xlsx"
                        required
                        className="file-input-admin"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-import"
                        style={{ background: 'var(--accent-green)', color: '#000' }}
                    >
                        {loading ? 'Przetwarzanie...' : 'Wgraj plik Excel'}
                    </button>
                </form>
            </div>

            {/* --- SEKCJA 2: H2H (JSON) --- */}
            <div className="import-card-section" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <FileJson size={20} color="#8b5cf6" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', margin: 0 }}>Import Best of H2H (JSON)</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Zasilanie tabeli <code>best_h2h</code>. Dodaje nowe rekordy.
                </p>
                <form onSubmit={handleJsonSubmit}>
                    <input
                        type="file"
                        name="jsonFile"
                        accept=".json"
                        required
                        className="file-input-admin"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-import"
                        style={{ background: 'var(--accent-purple)', color: '#fff' }}
                    >
                        {loading ? 'Przetwarzanie...' : 'Wgraj plik JSON'}
                    </button>
                </form>
            </div>

            {/* --- SEKCJA 3: TEAM BREAKS (CSV) --- */}
            <div className="import-card-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <FileText size={20} color="#d946ef" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', margin: 0 }}>Import Łamaki (CSV)</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <strong style={{color: '#f87171'}}>UWAGA: NADPISUJE DANE!</strong> Tabela <code>team_breaks</code> zostanie wyczyszczona przed importem.
                </p>
                <form onSubmit={handleBreaksSubmit}>
                    <input
                        type="file"
                        name="file" // Ważne: musi być 'file' zgodnie z action.ts
                        accept=".csv"
                        required
                        className="file-input-admin"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-import"
                        style={{ background: 'var(--accent-magenta)', color: '#fff' }}
                    >
                        {loading ? 'Przetwarzanie...' : 'Wgraj plik CSV'}
                    </button>
                </form>
            </div>

            {/* --- KOMUNIKAT WYNIKU --- */}
            {result && (
                <div 
                    className={`import-result-msg ${result.success ? 'success' : 'error'}`}
                    style={{ 
                        padding: '1rem', 
                        borderRadius: '8px', 
                        marginTop: '1rem',
                        textAlign: 'center',
                        animation: 'fadeIn 0.5s ease'
                    }}
                >
                    <strong>{result.success ? 'Sukces!' : 'Błąd!'}</strong> {result.message}
                </div>
            )}

            <style jsx>{`
                .file-input-admin {
                    width: 100%;
                    padding: 10px;
                    background: #18181b;
                    border: 1px dashed var(--card-border);
                    border-radius: 8px;
                    color: var(--text-muted);
                    margin-bottom: 12px;
                    font-size: 0.9rem;
                }
                .btn-import {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .btn-import:hover:not(:disabled) {
                    filter: brightness(1.1);
                    transform: translateY(-1px);
                }
                .btn-import:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .import-result-msg.success {
                    background: rgba(74, 222, 128, 0.1);
                    color: #4ade80;
                    border: 1px solid rgba(74, 222, 128, 0.2);
                }
                .import-result-msg.error {
                    background: rgba(248, 113, 113, 0.1);
                    color: #f87171;
                    border: 1px solid rgba(248, 113, 113, 0.2);
                }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
