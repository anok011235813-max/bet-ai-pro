// Plik: app/admin/page.tsx
'use client'

import React, { useEffect, useState, startTransition } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import type { User as AuthUser } from '@supabase/supabase-js'
import CreateUserForm from '../components/CreateUserForm'
import EditUserModal from '../components/EditUserModal'
import { deleteUser } from './actions'
import ImportForm from '../components/ImportForm'
import { LayoutDashboard, Users, Database, LogOut, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface AppUser {
  id: string;
  email: string | undefined;
  role: string;
  valid_until: string | null;
}

export default function AdminPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<AppUser[]>([])
  const [editingUser, setEditingUser] = useState<AppUser | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const fetchUsers = async () => {
    const { data, error } = await supabase.rpc('get_all_users_with_details')
    if (error) {
      alert('Błąd pobierania użytkowników: ' + error.message)
    } else {
      setUsers(data || [])
    }
  }

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data } = await supabase.from('users').select('role').eq('id', user.id).single()
        if (data?.role === 'admin') {
          setIsAdmin(true)
          fetchUsers()
        } else {
          router.push('/')
        }
      } else {
        router.push('/')
      }
      setLoading(false)
    }
    checkAdminAccess()
  }, [router, supabase])

  const handleUserCreated = () => {
    startTransition(() => {
      fetchUsers();
    });
  };

  const handleDeleteUser = async (userId: string, userEmail: string | undefined) => {
    if (confirm(`Czy na pewno chcesz usunąć użytkownika ${userEmail}?`)) {
      const result = await deleteUser(userId);
      alert(result.message);
      if (result.success) {
        startTransition(() => { fetchUsers(); });
      }
    }
  }

  const handleUserUpdated = () => {
    startTransition(() => { fetchUsers(); });
  }

  if (loading) return <div className="admin-loading">Weryfikacja uprawnień...</div>
  if (!isAdmin) return null

  return (
    <>
      <div className="admin-container">
        
        {/* HEADER */}
        <header className="admin-header">
          <div>
            <h1 className="admin-title">
              <ShieldCheck className="icon-title" /> Panel Administratora
            </h1>
            <p className="admin-subtitle">
              Zalogowany jako: <span className="highlight">{user?.email}</span>
            </p>
          </div>
          <div className="header-actions">
            <Link href="/" className="button-outline">
              <LayoutDashboard size={18} /> Wróć do Aplikacji
            </Link>
          </div>
        </header>
        
        <div className="admin-grid">
          
          {/* LEWA KOLUMNA: UŻYTKOWNICY */}
          <div className="admin-col-main">
            
            {/* Sekcja: Dodawanie */}
            <section className="admin-card">
              <div className="card-header-admin">
                <Users className="card-icon" />
                <h3>Dodaj Nowego Użytkownika</h3>
              </div>
              <div className="form-wrapper">
                <CreateUserForm onUserCreated={handleUserCreated} />
              </div>
            </section>

            {/* Sekcja: Lista */}
            <section className="admin-card">
              <div className="card-header-admin">
                <h3>Lista Użytkowników ({users.length})</h3>
              </div>
              
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Rola</th>
                      <th>Ważność konta</th>
                      <th style={{textAlign: 'right'}}>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? users.map(appUser => (
                      <tr key={appUser.id}>
                        <td className="font-medium">{appUser.email}</td>
                        <td>
                          <span className={`role-badge ${appUser.role}`}>
                            {appUser.role}
                          </span>
                        </td>
                        <td>
                          {appUser.valid_until 
                            ? new Date(appUser.valid_until).toLocaleDateString() 
                            : <span className="text-muted">Bezterminowo</span>}
                        </td>
                        <td>
                          <div className="row-actions">
                            <button onClick={() => setEditingUser(appUser)} className="btn-icon edit">
                              Edytuj
                            </button>
                            <button onClick={() => handleDeleteUser(appUser.id, appUser.email)} className="btn-icon delete">
                              Usuń
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>Brak użytkowników</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* PRAWA KOLUMNA: IMPORT */}
          <div className="admin-col-side">
            <section className="admin-card import-card">
              <div className="card-header-admin">
                <Database className="card-icon" />
                <h3>Centrum Danych</h3>
              </div>
              <p className="card-desc">Aktualizuj bazę danych typów oraz H2H przesyłając pliki XLSX/JSON.</p>
              
              <div className="import-wrapper">
                <ImportForm />
              </div>
            </section>
          </div>

        </div>
      </div>

      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </>
  )
}
