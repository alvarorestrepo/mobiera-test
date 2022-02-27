export default function validateInputs (arrayStrings) {
  return arrayStrings.map(string => {
    const {value, type , original, nameInputInObject} = string
    const text = value + "".trim();

    if (text.length <= 0) {
      return {
        validation:false,
        textSuggestion: 'campos vacios',
        nameInputInObject
      }
    };

    if(original){
      //Validacion de campos iguales al Original
      const dataOriginal = original === null ? "" : original.trim()
      if(text === dataOriginal){
        return {
          validation:true,
          textSuggestion: 'Campos iguales al original',
          nameInputInObject
        };
      };
    };

    //eslint-disable-next-line
    let validation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (type === 'email') {
      //validacion email correcto
      let emailValidation = validation.test(text);
      if (!emailValidation) {
        return {
          validation:false,
          textSuggestion: 'email no valido',
          nameInputInObject
        };
      };
    };

    if(type === "password"){
      let create_password = text;
      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g;
      let numbers = /[0-9]/g;
      if (
        create_password.match(numbers) &&
        create_password.match(upperCaseLetters) &&
        create_password.match(lowerCaseLetters) &&
        create_password.length >= 8
      ) {
        return {
          validation:true,
          textSuggestion: false,
        };
      } else {
        return {
          validation:false,
          textSuggestion: 'Debes incluir: Mayúsculas y números',
          nameInputInObject
        };
      }
    }

    return{
      validation: true
    };
  });
}