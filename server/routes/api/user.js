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
 * @returns 201 with cookie if success, 422/500 with error if fail.
 */
router.post('/register', async (req, res, next) => {
    const { body: { user } } = req;
    if(!user) {
        return res.status(422).json({
            message: 'Invalid request.'
        });
    }

    // validates required fields
    if (!user.username) {
        return res.status(422).json({
            error: {
                username: 'Username is required.'
            }
        });
    }

    if (!user.email) {
        return res.status(422).json({
            error: {
                email: 'Email is required.'
            }
        });
    }

    if (!user.password) {
        return res.status(422).json({
            error: {
                password: 'Password is required.'
            }
        });
    }

    // validates username and password length
    let schema = new passwordValidator();
    schema.is().min(6).is().max(30);
    if (!schema.validate(user.password)) {
        return res.status(422).json({
            error: {
                password: 'Password must be 6-30 characters.'
            }
        });
    }

    // validates email format
    if (!emailValidator.validate(user.email)) {
        return res.status(422).json({
            error: {
                email: 'Email is invalid.'
            }
        });
    }

    // checks if username/email is used
    if (await User.findOne({ 'username': user.username })) {
        return res.status(422).json({
            error: {
                username: 'Username is already in use.'
            }
        })
    }

    if (await User.findOne({ 'username': user.username })) {
        return res.status(422).json({
            error: {
                username: 'Username is already in use.'
            }
        })
    }

    if (await User.findOne({ 'email': user.email })) {
        return res.status(422).json({
            error: {
                email: 'Email is already in use.'
            }
        })
    }

    // creates a new user if all validitions are passed
    const finalUser = new User(user);
    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => {
            // signs in when register is done
            const token = finalUser.generateJWT(process.env.JWT_SECRET,
                Date.now() + parseInt(process.env.JWT_EXPIRATION));
            res.cookie(process.env.JWT_PARAM, token,
                {
                    httpOnly: true,
                    secure: false
                }
            ).status(201).json({
                message: 'Register successfully.'
            });
        });
});

/**
 * POST login
 * @description Login for user.
 * @returns 201 with cookie if success, 422/500 with error if fail.
 */
router.post('/login', async (req, res, next) => {
    const { body: { user } } = req;

    // validates required fields
    if (!user.username) {
        return res.status(422).json({
            error: {
                username: 'Username is required.'
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            error: {
                password: 'Password is required.'
            },
        });
    }

    // validates username and password length
    let schema = new passwordValidator();
    schema.is().min(6).is().max(30);
    if (!schema.validate(user.password)) {
        return res.status(422).json({
            error: {
                password: 'Password must be 6-30 characters.'
            }
        });
    }

    // looks for user
    return User.findOne({ 'username': user.username }).then((usr) => {
        if(usr && usr.validatePassword(user.password)) {
            // signs in when password is correct
            const token = usr.generateJWT(process.env.JWT_SECRET, 
                Date.now() + parseInt(process.env.JWT_EXPIRATION));
            res.cookie(process.env.JWT_PARAM, token, 
                {
                    httpOnly: true,
                    secure: false
                }
                ).status(201).json({
                    message: 'Login successfully.'
                });
        } else {
            return res.status(422).json({
                error: {
                    username: 'Incorrect username/password.'
                }
            });
        }
    });
});

/**
 * GET logout
 * @description Logout for user.
 * @returns 201 if success, 422 if fail.
 */
 router.get('/logout', Auth, async (req, res, next) => {
    if (req.cookies[process.env.JWT_PARAM]) {
        res.clearCookie(process.env.JWT_PARAM)
        .status(201).json({
            message: 'Logout successfully.'
        })
    } else {
        res.status(422).json({
            message: 'Invalid token.'
        })
    }
});

module.exports = router;