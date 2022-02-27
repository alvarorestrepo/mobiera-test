import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChangePassword, updateUser } from "../redux/actions";
import validateInputs from "../functions/validateInputs";
import { decrypt, encrypt } from "../functions/encrypt";

const ChangePassword = () => {
  const dispatch = useDispatch();
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

  const ChangePasswordfunction = () => {
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

    let passwordDecrypt = decrypt(user["password"].value, passwordRedux);

    if (passwordDecrypt) {
      dispatch(
        getChangePassword({
          email: `${user["email"].value}`,
        })
      );
    }
  };
const ChangePasswordCompare = async () => {

  if (newPassword['password'].value !== newPassword['passwordConfirm'].value) {
    setNewPassword({
      ...newPassword,
      passwordConfirm: {
        ...newPassword['passwordConfirm'],
        error: true,
        message: "Las contraseñas no coinciden",
      },
    });
    return;
  }

  const validate =  validateInputs([
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
      id:userId
    })
  );

}
  return !ChangePasswordRedux ? (
    <div>
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
      {user["email"].error && <p>{user["email"].message}</p>}
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

      <button onClick={() => ChangePasswordfunction()}>Validate input</button>
    </div>
  ) : (
    <div>
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
      {newPassword["password"].error && <p>{newPassword["password"].message}</p>}
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
      {newPassword["passwordConfirm"].error && (
        <p>{newPassword["passwordConfirm"].message}</p>
      )}

      <button onClick={() => ChangePasswordCompare()}>Change password</button>
    </div>
  );
};

export default ChangePassword;
