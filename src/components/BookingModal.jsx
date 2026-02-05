import React, { useState } from "react";
import styles from "./BookingModal.module.css";

export default function BookingModal({ experience, onConfirm, onCancel }) {
  const [date, setDate] = useState("");

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalCard}>
        <h2 className={styles.title}>
          Select a Date for <span className={styles.expTitle}>{experience?.title}</span>
        </h2>
        <input
          type="date"
          className={styles.dateInput}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button
            className={styles.confirmBtn}
            disabled={!date}
            onClick={() => onConfirm(experience, date)}
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
