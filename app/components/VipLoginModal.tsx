// Plik: app/components/VipLoginModal.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase'; // Upewnij się, że masz ten util
import { X, User, Lock, ArrowRight, Loader2 } from 'lucide-react';

interface VipLoginModalProps {
  onClose: () => void;
}

export default function VipLoginModal({ onClose }: VipLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Błędny email lub hasło.');
      setLoading(false);
    } else {
      // Sukces! Przekierowanie do strefy VIP
      router.push('/vip');
      onClose(); // Zamykamy modal w tle
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
        
        {/* HEADER */}
        <div className="modal-header" style={{ borderBottomColor: 'rgba(255, 215, 0, 0.1)' }}>
          <h3 style={{ color: '#FFD700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={20} /> Strefa VIP
          </h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', textAlign: 'center' }}>
          Zaloguj się, aby uzyskać dostęp do typów premium.
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '15px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        {/* FORMULARZ */}
        <form onSubmit={handleLogin} className="modal-form">
          <div className="form-group">
            <label>Email</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#666' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Wpisz swój email..." 
                className="styled-input" 
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Hasło</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#666' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="styled-input" 
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-save" 
            style={{ width: '100%', background: '#FFD700', color: '#000', marginTop: '10px', boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Zaloguj się'}
          </button>
        </form>

        {/* FOOTER */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px' }}>Nie masz jeszcze dostępu?</p>
          <Link href="/price" onClick={onClose} className="button-outline" style={{ justifyContent: 'center', borderColor: '#FFD700', color: '#FFD700' }}>
            Sprawdź Cennik VIP <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
