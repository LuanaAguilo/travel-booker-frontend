
import React from 'react';
import { Link } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import gridStyles from '../components/ExperienceGrid.module.css';

/**
 * BookingsView - Displays user bookings with skeleton loader and CTA for empty state.
 * @returns {JSX.Element}
 */
const BookingsView = ({ bookings = [], onCancelBooking }) => {
  return (
    <div className="bookings-view">
      <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '30px', fontWeight: '300' }}>
        My Itinerary
      </h2>
      {bookings.length === 0 ? (
        <div style={{ marginTop: 32 }}>
          <p>You have no bookings yet.</p>
          <Link to="/catalog" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Go to Catalog</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {bookings.map(booking => (
            <ExperienceCard
              key={booking.id}
              experience={booking}
              isBooking={true}
              onCancel={onCancelBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsView;
