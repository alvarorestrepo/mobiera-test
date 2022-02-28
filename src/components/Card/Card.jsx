import React from "react";
import styles from "./Card.module.css";

const Card = ({
  category,
  description,
  id,
  image,
  price,
  count,
  rate,
  title,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img className={styles.img} src={image} alt={title} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__title}>{title}</div>
        <div className={styles.contend_price}>
          <p className={styles.price}>Price:</p>
          <div className={styles.card__price}>${price}</div>
        </div>
        <div className={styles.contend_price}>
          <p className={styles.price}>Count:</p>
          <div className={styles.card__count}>{count}</div>
        </div>
        <div className={styles.contend_price}>
          <p className={styles.price}>Category:</p>
          <div className={styles.card__count}>{category}</div>
        </div>
        <div className={styles.contend_price}>
          <p className={styles.price}>Rate:</p>
          <div className={styles.card__count}>{rate}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
