/**
 * Validator Middleware
 * @author Binh Nguyen
 * @since 0.0.1
 */
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

/**
 * Login Validator
 */
exports.login = (req, res, next) => {
  const {
    body: { user },
  } = req;
  let errors = {};

  // validates required fields
  if (!user.username) {
    errors.username = "Username is required.";
  }

  if (!user.password) {
    errors.password = "Password is required.";
  } else {
    // validates password length
    let schema = new passwordValidator();
    schema.is().min(6).is().max(30);
    if (!schema.validate(user.password)) {
      errors.password = "Password must be 6-30 characters.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      errors: errors,
    });
  } else {
    next();
  }
};

/**
 * Register Validator
 */
exports.register = (req, res, next) => {
  const {
    body: { user },
  } = req;
  let errors = {};

  if (!user) {
    return res.status(422).json({
      message: "Invalid request.",
    });
  }

  // validates required fields
  if (!user.username) {
    errors.username = "Username is required.";
  }

  if (!user.email) {
    errors.email = "Email is required.";
  } else {
    // validates email format
    if (!emailValidator.validate(user.email)) {
      errors.email = "Email is invalid.";
    }
  }

  if (!user.password) {
    errors.password = "Password is required.";
  } else {
    // validates username and password length
    let schema = new passwordValidator();
    schema.is().min(6).is().max(30);
    if (!schema.validate(user.password)) {
      errors.password = "Password must be 6-30 characters.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      errors: errors,
    });
  } else {
    next();
  }
};

/**
 * Search Validator
 */
exports.searchUser = (req, res, next) => {
  const term = req.query.term;
  // validates search term
  if (!term || term.length < 3) {
    return res.status(422).json({
      message: "Please enter at least 3 characters to start searching.",
    });
  }

  next();
};

/**
 * Start Conversation Validator
 */
exports.newConversation = (req, res, next) => {
  const username = req.user.username;
  const {
    body: { conversation },
  } = req;
  let errors = {};

  // validates required fields
  if (!username || !conversation) {
    errors.from = "Invalid request.";
  }

  if (!conversation.to) {
    errors.to = "Please choose a recipient.";
  }

  if (!conversation.message) {
    errors.message = "Please enter a message.";
  }

  // validates from and to not the same
  if (
    conversation.from &&
    conversation.to &&
    conversation.from === conversation.to
  ) {
    errors.from = "Cannot start a conversation with yourself.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      errors: errors,
    });
  } else {
    next();
  }
};
