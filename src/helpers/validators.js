
const validateEmail = (email) => {
    let message = "";
    const REGEX_EMAIL = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email.match(REGEX_EMAIL)) {
        message = "Email is invalid format"
    }
    return message;
}

const validateUsername = (username) => {
    let message = "";
    const REGEX_USERNAME = /^[A-Za-z]+\d+.*$/;
    if (!username.match(REGEX_USERNAME)) {
        message = "Username contain letter and number and not special character"
    }
    return message;
}

const validatePassword = (password) => {
    let message = "";
    const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/;
    if (!password.match(REGEX_PASSWORD)) {
        message = "Password contain upper letter, lower letter and number, no special character"
    }
    return message;
}

export default {
    validateEmail,
    validateUsername,
    validatePassword
}