/**
 * User Model
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');
const Auth = require('../auth');

/**
 * POST register
 * @description Registers a new user account.
 * @returns 201 with auth object if success, 422/500 with error if fail.
 */
router.post('/register', async (req, res, next) => {
    const { body: { user } } = req;

    // validates required fields
    if (!user.username) {
        return res.status(422).json({
            errors: {
                username: 'Username is required.',
            },
        });
    }

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'Email is required.',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'Password is required.',
            },
        });
    }

    // validates username and password length
    let schema = new passwordValidator();
    schema.is().min(6).is().max(30);
    if (!schema.validate(user.password)) {
        return res.status(422).json({
            errors: {
                password: 'Password must be 6-30 characters.',
            }
        });
    }

    schema.is().min(4).is().max(30);
    if (!schema.validate(user.username)) {
        return res.status(422).json({
            errors: {
                username: 'Username must be 4-30 characters.',
            }
        });
    }

    // validates email format
    if (!emailValidator.validate(user.email)) {
        return res.status(422).json({
            errors: {
                email: 'Email is invalid.',
            }
        });
    }

    // checks if username/email is used
    if (await User.findOne({ 'username': user.username })) {
        return res.status(422).json({
            errors: {
                username: 'Username is already in use.',
            }
        })
    }

    if (await User.findOne({ 'email': user.email })) {
        return res.status(422).json({
            errors: {
                email: 'Email is already in use.',
            }
        })
    }

    // creates a new user if all validitions are passed
    const finalUser = new User(user);
    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.status(201).json({ user: finalUser.toAuthJSON(process.env.JWT_SECRET) })).catch((err) => {
            return res.status(500).json({
                message: err
            })
        });
});

/**
 * POST login
 * @description Login for user.
 * @returns 201 with auth object if success, 422/500 with error if fail.
 */
router.post('/login', async (req, res, next) => {
    const { body: { user } } = req;

    //TODO: implement login route
    return res.status(500).json({ message: Unimplemented });
});

/**
 * GET login
 * @description Login for user.
 * @returns 201 with auth object if success, 422/500 with error if fail.
 */
 router.get('/logout', Auth, async (req, res, next) => {
    //TODO: implement logout route
    return res.status(500).json({ message: Unimplemented });
});

module.exports = router;