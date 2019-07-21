const RULES_USERNAME = [
  {
    required: true,
    message: "Required"
  },
  {
    whitespace: true,
    message: "Not contain space"
  },
  {
    pattern: /^[A-Za-z]+\d+.*$/,
    message: "Contain letter and number and not special character" 
  },
  {
    min: 6,
    message: "Min length is 6 character"
  },
  {
    max: 128,
    message: "Max length is 6 character"
  }
];

const RULES_PASSWORD = [
  {
    required: true,
    message: "Required"
  },
  {
    whitespace: true,
    message: "Not contain space"
  },
  {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/,
    message: "Content upper letter, lower letter and number, no special character"
  },
  {
    min: 8,
    message: "Min length is 8 character"
  },
  {
    max: 128,
    message: "Max length is 128 character"
  }
];

const RULES_EMAIL = [
  {
    required: true,
    message: "Required"
  },
  {
    type: "email",
    message: "Not format email"
  }
];

export { RULES_USERNAME, RULES_PASSWORD, RULES_EMAIL };
