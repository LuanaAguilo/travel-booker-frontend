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
      {/* Hero eliminado. Solo grid de experiencias destacadas. */}
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
