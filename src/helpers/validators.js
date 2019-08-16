
const validateEmail = (email) => {
    const REGEX_EMAIL = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.length === 0) {
        return "Email not empty"
    }
    if (!email.match(REGEX_EMAIL)) {
        return "Email is invalid format"
    }
    return "";
}

const validateUsername = (username) => {
    const REGEX_USERNAME = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,128})$/;
    if (username.length === 0) {
        return "Username not empty"
    }
    if (!username.match(REGEX_USERNAME)) {
        return "Username contain letter and number and not special character"
    }
    if (username.length < 6 || username.length > 128) {
        return "Username length from 6 to 128"
    }
    return "";
}

const validatePassword = (password) => {
    const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,128}$/;
    if (password.length === 0) {
        return "Password not empty"
    }
    if (!password.match(REGEX_PASSWORD)) {
        return "Password contain upper letter, lower letter and number, no special character"
    }
    if (password.length < 8 || password.length > 128) {
        return "Password length from 8 to 128"
    }
    return "";
}

export default {
    validateEmail,
    validateUsername,
    validatePassword
}