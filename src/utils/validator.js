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

    const passwordErr = passwordValidation(form);
    if (passwordErr) {
        return passwordErr;
    }

    return null;
};

export const passwordValidation = (form) => {
    const { password, repeatPwd } = form;

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

export const strengthValidatiton = (pwd) => {
    if (pwd.length < 0) return;
    if (pwd.length < 6 || pwd.length > 20) {
        return "*Length should be longer than 6 and shorter than 20";
    }
    if (validator.isAlpha(pwd) || validator.isNumeric(pwd)) {
        return "Low";
    }
    if (validator.isAlphanumeric(pwd)) {
        return "Middle";
    }

    return "High";
};
