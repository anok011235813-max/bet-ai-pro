'use client';

import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/admin'); // Po sukcesie idź do admina
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#fff' }}>
      <form onSubmit={handleLogin} style={{ padding: '40px', background: '#222', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Logowanie do Admina</h1>
        
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '10px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Hasło</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '10px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#d946ef', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          Zaloguj się
        </button>
      </form>
    </div>
  );
}
