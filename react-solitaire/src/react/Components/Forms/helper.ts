export const validateEmail = (email: any) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof email === "object") {
    const result = email.find((e: any) => !regex.test(e));
    return result ? true : false;
  }

  return !regex.test(email);
};

export const checkEmail = (rule: any, value: any, callback: any, intl: any) => {
  if (value && validateEmail(value)) {
    callback(intl.formatMessage({ id: "form.error.email" }));
  } else {
    callback();
  }
};

export function validatePwd(pwd: any) {
  // should have at least: 1 special character, 1 uppercase, 1 lowercase, 1 digit and min of 5
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{5,}$/;
  return !regex.test(pwd);
}

export const checkPassword = (
  rule: any,
  value: any,
  callback: any,
  intl: any
) => {
  if (value && validatePwd(value)) {
    callback(intl.formatMessage({ id: "form.error.password" }));
  } else {
    callback();
  }
};
