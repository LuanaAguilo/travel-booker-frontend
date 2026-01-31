import styles from "./ExperienceCard.module.css";

export default function ExperienceCard({ experience, onClick, onBook, onCancel, isBooking, isBooked }) {
  const category = experience.category || "";
  let badgeClass = styles.badge;
  if (category && styles[category.toLowerCase()]) {
    badgeClass += ` ${styles[category.toLowerCase()]}`;
  }
function ExperienceCard({ experience, onClick }) {
  const handleClick = () => {
    if (onClick) onClick(experience);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={experience.image}
          alt={experience.title}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{experience.category}</div>
        <h3 className={styles.title}>{experience.title}</h3>

        <div className={styles.metaRow}>
          <div className={styles.price}>€{experience.price}</div>
          <div className={styles.city}>{experience.city}</div>
        </div>
        {experience.description && (
          <div className={styles.description}>{experience.description}</div>
        )}
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
    </article>
  );
}

export default ExperienceCard;
