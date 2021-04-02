/**
 * Validator Middleware
 * @author Binh Nguyen
 * @since 0.0.1
 */
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');

/**
 * Login Validator
 */
exports.login = (req, res, next) => {
    const { body: { user } } = req;
    let errors = {};

    // validates required fields
    if (!user.username) {
        errors.username = 'Username is required.';
    }

    if (!user.password) {
        errors.password = 'Password is required.';
    } else {
        // validates password length
        let schema = new passwordValidator();
        schema.is().min(6).is().max(30);
        if (!schema.validate(user.password)) {
            errors.password = 'Password must be 6-30 characters.';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            errors: errors
        });
    } else {
        next();
    }
};

/**
 * Register Validator
 */
exports.register = (req, res, next) => {
    const { body: { user } } = req;
    let errors = {};

    if (!user) {
        return res.status(422).json({
            message: 'Invalid request.'
        });
    }

    // validates required fields
    if (!user.username) {
        errors.username = 'Username is required.';
    }

    if (!user.email) {
        errors.email = 'Email is required.';
    } else {
        // validates email format
        if (!emailValidator.validate(user.email)) {
            errors.email = 'Email is invalid.';
        }
    }

    if (!user.password) {
        errors.password = 'Password is required.';
    } else {
        // validates username and password length
        let schema = new passwordValidator();
        schema.is().min(6).is().max(30);
        if (!schema.validate(user.password)) {
            errors.password = 'Password must be 6-30 characters.';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            errors: errors
        });
    } else {
        next();
    }
};