import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import validateInputs from "../../functions/validateInputs";
import Feedback from "../../components/Feedback/Feedback";
import { useDispatch, useSelector } from "react-redux";
import { decrypt } from "../../functions/encrypt";
import { getUser, getFeedback } from "../../redux/actions";
import styles from "./auth.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const passwordRedux = useSelector((state) => state.user.password);

  const [user, setUser] = useState({
    email: {
      value: "",
      error: false,
      message: "",
    },
    password: {
      value: "",
      error: false,
      message: "",
    },
  });

  let history = useHistory();

  const setUserPetitions = async () => {
    const validate = validateInputs([
      {
        value: user["email"].value,
        type: "email",
        nameInputInObject: "email",
      },
      {
        value: user["password"].value,
        type: "password",
        nameInputInObject: "password",
      },
    ]).filter((item) => item.validation === false);

    if (validate.length > 0) {
      let newDataLogin = user;
      validate.forEach((element) => {
        newDataLogin = {
          ...newDataLogin,
          [element.nameInputInObject]: {
            ...newDataLogin[element.nameInputInObject],
            error: true,
            message: element.textSuggestion,
          },
        };
      });
      setUser(newDataLogin);
      return;
    }

    dispatch(
      getUser({
        email: `${user["email"].value}`,
      })
    );

    let passwordDecrypt = await decrypt(user["password"].value, passwordRedux);

    if (passwordDecrypt === true) {
      history.push("/home");
      dispatch(getFeedback({ textFeedback: "bienvenido", openFeedback: true }));
    } else {
      dispatch(getFeedback({ textFeedback: "User or password incorrect", openFeedback: true }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
        <h2>Please Sign In</h2>

        <input
          className="Login__input"
          placeholder="Email"
          type="text"
          value={user["email"].value}
          onChange={(e) => {
            setUser({
              ...user,
              email: {
                ...user["email"],
                value: e.target.value,
                error: false,
              },
            });
          }}
        />
        <div className={styles.error}>
          {user["email"].error && user["email"].message}
        </div>

        <input
          className="Login__input"
          placeholder="Password"
          type="password"
          value={user["password"].value}
          onChange={(e) => {
            setUser({
              ...user,
              password: {
                ...user["password"],
                value: e.target.value,
                error: false,
              },
            });
          }}
        />
        <div className={styles.error}>
          {user["password"].error && user["password"].message}
        </div>

        <button
          className={styles.boton__auth}
          onClick={() => setUserPetitions()}
        >
          <p className={styles.text__buton_auth}>Sing In</p>
        </button>
        <button
          className={styles.boton__auth}
          onClick={() => history.push("singup")}
        >
          <p className={styles.text__buton_auth}>Sing Up</p>
        </button>
        <Feedback />

        <h2>&nbsp;</h2>
      </div>
    </div>
  );
};

export default Login;
