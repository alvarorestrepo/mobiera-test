import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import validateInputs from "../../functions/validateInputs";
import { encrypt } from "../../functions/encrypt";
import styles from "./auth.module.css";

const SingUp = () => {
  const history = useHistory();
  const apiSetUser = "http://localhost:8080/users";

  const [user, setUser] = useState({
    name: {
      value: "",
      error: false,
      message: "",
    },
    username: {
      value: "",
      error: false,
      message: "",
    },
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

  const register = async () => {
    const validate = validateInputs([
      {
        value: user["name"].value,
        type: "text",
        nameInputInObject: "name",
      },
      {
        value: user["username"].value,
        type: "text",
        nameInputInObject: "username",
      },
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

    let passwordEncrypt = await encrypt(user["password"].value);

    let validateEmail = await axios
      .get(`http://localhost:8080/users?email=${user["email"].value}`)
      .then((res) => {
        if (res.data.length > 0) {
          return false;
        } else {
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let requestBody = {
      name: `${user["name"].value}`,
      username: `${user["username"].value}`,
      email: `${user["email"].value}`,
      password: passwordEncrypt,
    };
    if (validateEmail) {
      await axios
        .post(apiSetUser, requestBody)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Error al registrar");
    }

    if (validateEmail) {
      history.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>
      <div className={styles.center}>
        <h2>Please Sign Up</h2>

        <input
          className="Login__input"
          placeholder="name"
          type="text"
          value={user["name"].value}
          onChange={(e) => {
            setUser({
              ...user,
              name: {
                ...user["name"],
                value: e.target.value,
                error: false,
              },
            });
          }}
        />
        <div className={styles.error}>
          {user["name"].error ? user["name"].message : ""}
        </div>
        <input
          className="Login__input"
          placeholder="username"
          type="text"
          value={user["username"].value}
          onChange={(e) => {
            setUser({
              ...user,
              username: {
                ...user["username"],
                value: e.target.value,
                error: false,
              },
            });
          }}
        />
        <div className={styles.error}>
          {user["username"].error && user["username"].message}
        </div>
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
          placeholder="password"
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

        <button className={styles.boton__auth} onClick={() => register()}>
          <p className={styles.text__buton_auth}>Sing Up</p>
        </button>
        <div className={styles.link__auth} onClick={() => history.push('/')}>
          <p className={styles.text__next}>Go to sing in</p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
