export const usernameRegEx = new RegExp('^[a-z0-9_-]{3,16}$');
export const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
export const nameRegEx = new RegExp("^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$");

export const isUsername = (username) => {
  return userNameRegEx.test(username.toLowerCase());
};

export const isPassword = (password) => {
  return passwordRegEx.test(password);
};

// https://stackoverflow.com/a/45871742/7602110
export const isName = (name) => {
  return nameRegEx.test(name);
};