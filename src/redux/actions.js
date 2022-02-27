import axios from 'axios';

//CONSTANTES
export const GET_USER = 'GET_USER';
export const SET_LOOGED = 'SET_LOOGED';
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const UPDATE_USER = 'UPDATE_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

//Endpoints

const apiLoginUrl  = (email, password) => {
    return `http://localhost:8080/users?email=${email}&password=${password}`
}

//GET

export const getUser = ({email, password}) => {
    return (dispatch) => {
        axios.get(apiLoginUrl(email, password))
            .then(res => {
                console.log("res",res.data[0]);
                if(res.data.length > 0){
                    dispatch({
                        type: GET_USER,
                        payload: res.data[0]
                    })
                    dispatch({
                        type: SET_LOOGED,
                        payload: {logged: true}
                    })
                }else{
                    alert("No existe el usuario");
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getChangePassword = ({email, password}) => {
    return (dispatch) => {
        axios.get(apiLoginUrl(email, password))
            .then(res => {
                console.log("res",res.data[0]);
                if(res.data.length > 0){
                    console.log("entro ");
                    dispatch({
                        type: CHANGE_PASSWORD,
                        payload: {changePassword: true}
                    })
                }else{
                    alert("No existe el usuario");
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const updateUser = ({type,contend, id}) => {
console.log("type",type);
console.log("value2",contend);

    return (dispatch) => {
        axios.patch(`http://localhost:8080/users/${id}`, {[type]: contend})
            .then(res => {
                console.log("res",res.data);
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


