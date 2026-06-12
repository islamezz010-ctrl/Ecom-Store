const { withValidationLogging } = require("./validationLogger");

// Export the enhanced validation middleware with logging
const validate = withValidationLogging;

module.exports = validate;
