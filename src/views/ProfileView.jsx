
import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

/**
 * ProfileView - Shows only user info and loyalty status.
 * @returns {JSX.Element}
 */
const ProfileView = () => {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div className="profile-view" style={{ maxWidth: 400, margin: '0 auto', padding: 32 }}>
      <h2 style={{ color: 'var(--color-accent)' }}>Profile</h2>
      <div style={{
        background: 'var(--color-header)',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 2px 8px rgba(30,30,30,0.08)',
        marginBottom: 24
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          <span style={{ color: 'var(--color-gold)' }}>@{user.username}</span>
        </div>
        <section className="loyalty-status" style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: 16 }}>
          <strong>Loyalty Status:</strong> {user.loyalty || 'Member'}
        </section>
      </div>
      <button
        onClick={logout}
        style={{
          background: 'var(--color-accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.5em 1.5em',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
