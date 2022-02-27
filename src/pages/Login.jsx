import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import validateInputs from "../functions/validateInputs";
import { useDispatch, useSelector } from "react-redux";
import { decrypt } from "../functions/encrypt";
import { getUser } from "../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const passwordRedux = useSelector(state => state.user.password);

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
      }
    ]).filter((item) => item.validation === false);

    if(validate.length > 0){
      let newDataLogin = user;
      validate.forEach(element => {
        newDataLogin = {
          ...newDataLogin,
          [element.nameInputInObject]: {
            ...newDataLogin[element.nameInputInObject],
            error: true,
            message: element.textSuggestion
          }
        };
      });
      setUser(newDataLogin);
      return
    }

    dispatch(
        getUser({
            email: `${user["email"].value}`,
          })
        );

        let passwordDecrypt = await decrypt(user["password"].value, passwordRedux);

        if(passwordDecrypt){

          history.push("/home");
        }else{
          alert('Usuario o contraseña incorrectos');
        }

  };

  return (
    <div>
      <h1>Login</h1>
      <p>
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
        {user["email"].error && user["email"].message}
        {user["password"].error && user["password"].message}
        <button onClick={() => setUserPetitions()}>click</button>
      </p>
      <button 
        onClick= {() => history.push('singup')}>
        Sing Up
      </button>
    </div>
  );
};

export default Login;
