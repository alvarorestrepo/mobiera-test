import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChangePassword } from "../redux/actions";
import { useHistory } from "react-router-dom";
import validateInputs from "../functions/validateInputs";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const ChangePasswordRedux = useSelector(
    (state) => state.logged.changePassword
  );
  console.log("ChangePasswordRedux", ChangePasswordRedux);
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

  const ChangePasswordfunction = (parametro) => {
    dispatch(
      getChangePassword({
        email: `${user["email"].value}`,
        password: `${user["password"].value}`,
      })
    );
  };

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

      <button onClick={() => ChangePasswordfunction()}>Change password</button>
    </div>
  ) : (
    <div>
      <input
        className="Login__input"
        placeholder="password"
        type="password"
        value={newPassword["password"].value}
        onChange={(e) => {
          setUser({
            ...newPassword,
            password: {
              ...newPassword["password"],
              value: e.target.value,
              error: false,
            },
          });
        }}
      />
      <input
        className="Login__input"
        placeholder="Password Confirm"
        type="password"
        value={newPassword["passwordConfirm"].value}
        onChange={(e) => {
          setUser({
            ...newPassword,
            password: {
              ...newPassword["passwordConfirm"],
              value: e.target.value,
              error: false,
            },
          });
        }}
      />
    </div>
  );
};

export default ChangePassword;
