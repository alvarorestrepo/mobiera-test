import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getChangePassword, updateUser, getFeedback, changePasswordFalse } from "../../redux/actions";
import validateInputs from "../../functions/validateInputs";
import { decrypt, encrypt } from "../../functions/encrypt";

import styles from "./ChangePassword.module.css";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ChangePasswordRedux = useSelector(
    (state) => state.logged.changePassword
  );
  const passwordRedux = useSelector((state) => state.user.password);
  const userId = useSelector((state) => state.user.id);
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

  const [newPassword, setNewPassword] = useState({
    password: {
      value: "",
      error: false,
      message: "",
    },
    passwordConfirm: {
      value: "",
      error: false,
      message: "",
    },
  });

  const ChangePasswordfunction = async () => {
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
      let dataChangePassword = user;
      validate.forEach((element) => {
        dataChangePassword = {
          ...dataChangePassword,
          [element.nameInputInObject]: {
            ...dataChangePassword[element.nameInputInObject],
            error: true,
            message: element.textSuggestion,
          },
        };
      });
      setUser(dataChangePassword);
      return;
    }

    let passwordDecrypt = await decrypt(user["password"].value, passwordRedux);

    if (passwordDecrypt === true) {
      dispatch(
        getChangePassword({
          email: `${user["email"].value}`,
        })
      );
    }else{
      alert("Usuario o contraseña incorrectos");
    }
  };
  const ChangePasswordCompare = async () => {
    if (
      newPassword["password"].value !== newPassword["passwordConfirm"].value
    ) {
      setNewPassword({
        ...newPassword,
        passwordConfirm: {
          ...newPassword["passwordConfirm"],
          error: true,
          message: "Las contraseñas no coinciden",
        },
      });
      return;
    }

    const validate = validateInputs([
      {
        value: newPassword["password"].value,
        type: "password",
        nameInputInObject: "password",
      },
      {
        value: newPassword["passwordConfirm"].value,
        type: "password",
        nameInputInObject: "passwordConfirm",
      },
    ]).filter((item) => item.validation === false);

    if (validate.length > 0) {
      let dataChangePassword = newPassword;
      validate.forEach((element) => {
        dataChangePassword = {
          ...dataChangePassword,
          [element.nameInputInObject]: {
            ...dataChangePassword[element.nameInputInObject],
            error: true,
            message: element.textSuggestion,
          },
        };
      });
      setNewPassword(dataChangePassword);
      return;
    }

    let passwordEncrypt = await encrypt(newPassword["password"].value);

    dispatch(
      updateUser({
        contend: passwordEncrypt,
        type: "password",
        id: userId,
      })
    );
      dispatch(
        getFeedback({
          textFeedback: "Contraseña cambiada correctamente",
          openFeedback: true,
        })
      );
      dispatch(
        changePasswordFalse()
      );
      history.push("/home");
  };
  return !ChangePasswordRedux ? (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Change Password</h3>
        <div className={styles.input__group}>
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

          <button
            className={styles.boton__auth}
            onClick={() => ChangePasswordfunction()}
          >
            <p className={styles.text__buton_auth}>Validate input</p>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>New Password</h3>
        <div className={styles.input__group}>
          <input
            className="Login__input"
            placeholder="password"
            type="password"
            value={newPassword["password"].value}
            onChange={(e) => {
              setNewPassword({
                ...newPassword,
                password: {
                  ...newPassword["password"],
                  value: e.target.value,
                  error: false,
                },
              });
            }}
          />
          <div className={styles.error}>
            {newPassword["password"].error && newPassword["password"].message}
          </div>
          <input
            className="Login__input"
            placeholder="Password Confirm"
            type="password"
            value={newPassword["passwordConfirm"].value}
            onChange={(e) => {
              setNewPassword({
                ...newPassword,
                passwordConfirm: {
                  ...newPassword["passwordConfirm"],
                  value: e.target.value,
                  error: false,
                },
              });
            }}
          />
          <div className={styles.error}>
            {newPassword["passwordConfirm"].error &&
              newPassword["passwordConfirm"].message}
          </div>

          <button
            className={styles.boton__auth}
            onClick={() => ChangePasswordCompare()}
          >
            <p className={styles.text__buton_auth}>Change password</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
