import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";

import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: {
      value: userRedux.name ? userRedux.name : "",
      error: false,
      message: "",
    },
    username: {
      value: userRedux.username ? userRedux.username : "",
      error: false,
      message: "",
    },
    email: {
      value: userRedux.email ? userRedux.email : "",
      error: false,
      message: "",
    },
    password: {
      value: userRedux.password ? userRedux.password : "",
      error: false,
      message: "",
    },
  });

  const update = (e, value, boolean) => {

    dispatch(
      updateUser({
        type: value,
        contend: e.target.value,
        id: userRedux.id,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3 className={styles.title}>Edit profile</h3>
        <div className={styles.input__group}>
          <input
            className="Login__input"
            placeholder="Name"
            type="text"
            defaultValue={user.name.value}
            onBlur={(e) => update(e, "name", false)}
          />
          <input
            className="Login__input"
            placeholder="Username"
            type="text"
            defaultValue={user.username.value}
            onBlur={(e) => update(e, "username", false)}
          />
          {user["username"].error && <p>{user["username"].message}</p>}
          <input
            className="Login__input"
            placeholder="Email"
            type="text"
            defaultValue={user.email.value}
            onBlur={(e) => update(e, "email", false)}
          />
          {user["email"].error && <p>{user["email"].message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
