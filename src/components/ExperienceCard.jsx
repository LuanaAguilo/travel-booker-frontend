import styles from "./ExperienceCard.module.css";

function ExperienceCard({ experience, onSelect }) {
  const handleClick = () => {
    if (onSelect) onSelect(experience);
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
        <div className={styles.price}>€{experience.price}</div>
      </div>
    </article>
  );
}

export default ExperienceCard;
