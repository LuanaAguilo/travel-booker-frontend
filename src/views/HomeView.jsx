import { useEffect, useState } from 'react';
import { getExperiences } from '../services/api';
import ExperienceGrid from '../components/ExperienceGrid';
import './HomeView.css';

export default function HomeView() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getExperiences()
      .then(data => setExperiences(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section style={{
        background: 'linear-gradient(100deg, var(--color-header) 60%, var(--color-accent) 100%)',
        color: 'var(--color-text-light)',
        padding: '3rem 1rem',
        borderRadius: '1.5rem',
        margin: '2rem auto',
        textAlign: 'center',
        maxWidth: 700,
        boxShadow: '0 2px 24px rgba(123,30,58,0.12)',
        border: '2px solid var(--color-accent)',
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--color-accent)', textShadow: '0 2px 8px rgba(123,30,58,0.15)' }}>MadVentures</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', margin: '1rem 0 0 0', fontWeight: 500 }}>
          Discover, book, and experience the best of Madrid.
        </p>
      </section>
      <section>
        <h2 style={{ color: '#b71c1c', marginBottom: '1rem' }}>Featured Experiences</h2>
        {loading ? <p>Loading…</p> : error ? <p style={{ color: 'crimson' }}>{error}</p> : (
          <div className="featured-horizontal">
            <ExperienceGrid
              experiences={['Gastronomy', 'Culture', 'Adventure']
                .map(cat => experiences.find(e => e.category === cat))
                .filter(Boolean)}
              gridClassName="horizontal-flex"
            />
          </div>
        )}
      </section>
    </div>
  );
}
