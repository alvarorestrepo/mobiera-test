import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import validateInputs from "../functions/validateInputs";
import {encrypt} from '../functions/encrypt';

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

    let passwordEncrypt = await encrypt(user["password"].value);

      let validateEmail = await axios.get(`http://localhost:8080/users?email=${user["email"].value}`)
        .then(res => {
            if(res.data.length > 0){
                return false;
            }else{
                return true;
            }
        })
        .catch(err => {
            console.log(err)
        })

        let requestBody = {
            name: `${user["name"].value}`,
            username: `${user["username"].value}`,
            email: `${user["email"].value}`,
            password: passwordEncrypt,
        }
        if(validateEmail){
          await axios.post(apiSetUser, requestBody)
              .then(res => {
                  history.push("/")
              })
              .catch(err => {
                  console.log(err)
              })
      }else{
        alert("Error al registrar")
      }

      if( validateEmail){
        history.push("/")
      }
  }

  return (
    <div>
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
        {user["name"].error && <p>{user["name"].message}</p>}
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
      {user["username"].error && <p>{user["username"].message}</p>}
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
  {user["password"].error && <p>{user["password"].message}</p>}

      <button onClick={() => register()}>SingUp</button>
    </div>
  )
}

export default SingUp