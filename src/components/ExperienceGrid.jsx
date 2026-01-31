import ExperienceCard from "./ExperienceCard.jsx";
import styles from "./ExperienceGrid.module.css";

export default function ExperienceGrid({ experiences, onCardClick, onBook, bookings = [], gridClassName }) {
  const safeExperiences = Array.isArray(experiences)
    ? experiences.filter((exp) => exp && typeof exp === "object" && exp.title)
    : [];

  if (safeExperiences.length === 0) {
    return <p className={styles.empty}>No experiences found.</p>;
  }

  return (
    <div className={gridClassName ? `${styles.grid} ${gridClassName}` : styles.grid}>
      {safeExperiences.map((exp) => (
        <ExperienceCard
          key={exp.id ?? exp.title}
          experience={exp}
          onClick={() => onCardClick?.(exp)}
          onBook={onBook}
          isBooked={bookings.some(b => b.id === exp.id)}
        />
      ))}
    </div>
  );
}

