// Plik: app/components/LoginPrompt.tsx (wersja dopieszczona)
'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPrompt() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Błąd logowania: ' + error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <article className="tip-card login-prompt-card">
      <header className="card-header">
        DOSTĘP OGRANICZONY
      </header>
      <div className="login-prompt-content">
        <h2>Zaloguj się, aby kontynuować</h2>
        <form onSubmit={handleLogin} className="login-prompt-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="form-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
            required
            className="form-input"
          />
          <button type="submit" className="button button-primary">
            Zaloguj
          </button>
          {message && <p className="form-message error-message">{message}</p>}
        </form>
      </div>
    </article>
  );
}
