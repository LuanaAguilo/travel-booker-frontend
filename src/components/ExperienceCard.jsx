import styles from './ExperienceCard.module.css';

export default function ExperienceCard({ experience, onClick, onBook, onCancel, isBooking, isBooked }) {
  const category = experience.category || "";
  let badgeClass = styles.badge;
  if (category && styles[category.toLowerCase()]) {
    badgeClass += ` ${styles[category.toLowerCase()]}`;
  }
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={experience.image || '/default-experience.jpg'}
        alt={experience.title}
        className={styles.image}
      />
      <div className={styles.content}>
        <span className={badgeClass}>{category || 'Experience'}</span>
        <h3 className={styles.title}>{experience.title}</h3>
        {isBooking ? (
          <button
            className={styles.bookingBtn}
            onClick={e => { e.stopPropagation(); onCancel?.(experience); }}
          >
            Cancel Booking
          </button>
        ) : (
          isBooked ? (
            <span className={styles.bookedLabel}>Booked</span>
          ) : (
            <>
              <p className={styles.price}>€{experience.price}</p>
              {onBook && (
                <button
                  className={styles.bookingBtn}
                  onClick={e => { e.stopPropagation(); onBook(experience); }}
                >
                  Book
                </button>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
