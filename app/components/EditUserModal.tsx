// Plik: app/components/EditUserModal.tsx
'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase'
import { X } from 'lucide-react'

interface AppUser {
  id: string
  email: string | undefined
  role: string
  valid_until: string | null
}

interface EditUserModalProps {
  user: AppUser
  onClose: () => void
  onUserUpdated: () => void
}

export default function EditUserModal({ user, onClose, onUserUpdated }: EditUserModalProps) {
  const [role, setRole] = useState(user.role)
  const [validUntil, setValidUntil] = useState(
    user.valid_until ? new Date(user.valid_until).toISOString().split('T')[0] : ''
  )
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const updates: any = { role }
    if (validUntil) {
      updates.valid_until = new Date(validUntil).toISOString()
    } else {
      updates.valid_until = null // Usunięcie daty
    }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    setLoading(false)

    if (error) {
      alert('Błąd aktualizacji: ' + error.message)
    } else {
      onUserUpdated()
      onClose()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        
        {/* Header modala */}
        <div className="modal-header">
          <h3>Edytuj Użytkownika</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Informacje o userze */}
        <div className="user-info-summary">
          <p>Użytkownik: <span className="highlight">{user.email}</span></p>
        </div>

        {/* Formularz */}
        <form onSubmit={handleUpdate} className="modal-form">
          <div className="form-group">
            <label>Rola w systemie</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="styled-input"
            >
              <option value="user">Użytkownik (Standard)</option>
              <option value="admin">Administrator</option>
              <option value="vip">VIP / Premium</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ważność konta (opcjonalnie)</label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="styled-input"
            />
            <small className="hint">Zostaw puste, aby dostęp był bezterminowy.</small>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Anuluj
            </button>
            <button type="submit" disabled={loading} className="btn-save">
              {loading ? 'Zapisywanie...' : 'Zapisz Zmiany'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
