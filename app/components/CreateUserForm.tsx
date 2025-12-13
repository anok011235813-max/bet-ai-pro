// Plik: app/components/CreateUserForm.tsx
'use client'

import React, { useState } from 'react'
import { createNewUser } from '../admin/actions' // Upewnij się, że importujesz z dobrego miejsca
import { Plus, Loader2 } from 'lucide-react'

interface CreateUserFormProps {
  onUserCreated: () => void
}

export default function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setMessage(null)

    const result = await createNewUser(formData)

    if (result.success) {
      setMessage({ text: result.message, type: 'success' })
      onUserCreated()
      // Reset formularza po sukcesie można zrobić przez key lub ref, 
      // ale w prostym przypadku wystarczy wyczyścić stan, jeśli byśmy go trzymali.
      // Tutaj formularz czyści się sam przez natywne action, ale warto dodać:
      const form = document.getElementById('create-user-form') as HTMLFormElement
      if(form) form.reset()
    } else {
      setMessage({ text: result.message, type: 'error' })
    }
    setLoading(false)
  }

  return (
    <div className="create-user-wrapper">
      <form 
        id="create-user-form"
        action={handleSubmit}
        className="admin-form-row"
      >
        <div className="input-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            className="admin-input"
          />
        </div>
        
        <div className="input-group">
          <input 
            type="text" 
            name="password" 
            placeholder="Hasło" 
            required 
            minLength={6}
            className="admin-input"
          />
        </div>

        <div className="input-group">
          <select name="role" className="admin-select" defaultValue="user">
            {/* TERAZ JEST SPÓJNIE Z EDYCJĄ: */}
            <option value="user">Użytkownik (Standard)</option>
            <option value="vip">Użytkownik Premium (VIP)</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div className="input-group">
          <input 
            type="date" 
            name="valid_until" 
            className="admin-input" 
            title="Ważność konta (opcjonalnie)"
          />
          <span className="input-hint">Ważność (opcjonalne)</span>
        </div>

        <button type="submit" disabled={loading} className="btn-create">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <><Plus size={18} /> Stwórz</>}
        </button>
      </form>

      {message && (
        <div className={`form-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <style jsx>{`
        .admin-form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          align-items: start;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
        }

        .admin-input, .admin-select {
          width: 100%;
          padding: 10px 14px;
          background: #18181b;
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .input-hint {
          font-size: 0.7rem;
          color: #666;
          margin-top: 4px;
          margin-left: 4px;
        }

        .btn-create {
          background: var(--accent-purple);
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px; /* Dopasowanie wysokości do inputów */
          transition: 0.2s;
        }

        .btn-create:hover { background: var(--accent-magenta); }

        .form-message {
          margin-top: 12px;
          padding: 10px;
          border-radius: 6px;
          font-size: 0.9rem;
          text-align: center;
        }
        .form-message.success { background: rgba(74, 222, 128, 0.1); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.2); }
        .form-message.error { background: rgba(248, 113, 113, 0.1); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.2); }
      `}</style>
    </div>
  )
}
