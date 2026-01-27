import ExperienceCard from './ExperienceCard.jsx';
import styles from './ExperienceGrid.module.css';

export default function ExperienceGrid({ experiences, onCardClick, gridClassName }) {
  if (!experiences || experiences.length === 0) {
    return <p className={styles.empty}>No experiences found.</p>;
  }
  return (
    <div className={gridClassName ? `${styles.grid} ${gridClassName}` : styles.grid}>
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} onClick={() => onCardClick?.(exp)} />
      ))}
    </div>
  );
}
