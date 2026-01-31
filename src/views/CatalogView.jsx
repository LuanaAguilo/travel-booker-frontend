import { useEffect, useState } from 'react';
import { getExperiences } from '../services/api';
import ExperienceGrid from '../components/ExperienceGrid';
import './HomeView.css';

const categories = [
  { label: 'Gastronomy', value: 'Gastronomy' },
  { label: 'Culture', value: 'Culture' },
  { label: 'Adventure', value: 'Adventure' },
];

export default function CatalogView({ onBook, bookings }) {
  const [experiences, setExperiences] = useState([]);
  const [filter, setFilter] = useState('Gastronomy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getExperiences()
      .then(data => setExperiences(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = experiences.filter(e => e.category === filter);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, margin: '1.5rem 0' }}>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            style={{
              background: filter === cat.value ? '#b71c1c' : '#fff',
              color: filter === cat.value ? '#fff' : '#b71c1c',
              border: '1px solid #b71c1c',
              borderRadius: 999,
              padding: '0.5em 1.5em',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {loading ? <p>Loading…</p> : error ? <p style={{ color: 'crimson' }}>{error}</p> : (
        <div className="horizontal-flex">
          <ExperienceGrid experiences={filtered} gridClassName="horizontal-flex" onBook={onBook} bookings={bookings} />
        </div>
      )}
    </div>
  );
}
