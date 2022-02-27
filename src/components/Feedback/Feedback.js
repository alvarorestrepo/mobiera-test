import React from 'react';
import ReactDOM from 'react-dom';
import styles from'./Feedback.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../redux/actions";


const Feedback = document.querySelector("#Feedback");
export default () => {
    const feedback = useSelector(state => state.feedback);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(getFeedback({
            textFeedback: '',
            openFeedback: false
        }));
    }

  return ReactDOM.createPortal(
    feedback.openFeedback && (
      <div className={styles.container}>
        <div className={styles.info}>
            <p className={styles.text}>{feedback.textFeedback}</p>
            <button className={styles.boton} onClick= {() => handleClose()}>
              <p className={styles.text_boton}>Cerrar</p>
            </button>
        </div>
      </div>
    ),Feedback
  );
}