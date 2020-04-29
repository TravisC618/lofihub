import validator from "validator";

export const registerValidation = (form) => {
    const { email, username, password, repeatPwd } = form;

    if (!validator.isEmail(email)) {
        return { type: "email", msg: "Invalid email formate" };
    }
    if (!validator.isLength(username, { min: 3, max: 15 })) {
        return {
            type: "username",
            msg: "The length of username shoule be 3 to 15",
        };
    }
    if (!validator.isLength(password, { min: 6, max: 20 })) {
        return {
            type: "password",
            msg: "The length of password shoule be 6 to 20",
        };
    }
    if (password !== repeatPwd) {
        return { type: "password", msg: "Two passwords are not matched" };
    }
    return null;
};
