/**
 * User API
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Auth = require('../../middlewares/auth');
const Validator = require('../../middlewares/validator');

/**
 * POST register
 * @description Registers a new user account.
 * @returns 201 with cookie if success, 422/500 with error if fail.
 */
router.post('/register', Validator.register, async (req, res, next) => {
    const { body: { user } } = req;

    // checks if username/email is used
    if (await User.findOne({ 'username': user.username })) {
        return res.status(422).json({
            errors: {
                username: 'Username is already in use.'
            }
        })
    }

    if (await User.findOne({ 'email': user.email })) {
        return res.status(422).json({
            errors: {
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
router.post('/login', Validator.login, async (req, res, next) => {
    const { body: { user } } = req;

    // looks for user
    return User.findOne({ 'username': user.username }).then((usr) => {
        if (usr && usr.validatePassword(user.password)) {
            // signs in when password is correct
            const token = usr.generateJWT(process.env.JWT_SECRET,
                Date.now() + parseInt(process.env.JWT_EXPIRATION));
            res.cookie(process.env.JWT_PARAM, token,
                {
                    httpOnly: true,
                    secure: false
                }
            ).status(200).json({
                message: 'Login successfully.'
            });
        } else {
            return res.status(401).json({
                errors: {
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
            .status(200).json({
                message: 'Logout successfully.'
            })
    } else {
        res.status(422).json({
            message: 'Invalid token.'
        })
    }
});

/**
 * GET search
 * @description Search for users by username.
 * @returns 200 if success, 500 if fail.
 */
router.get('/search', Auth, async (req, res, next) => {
    const searchTerm = req.query.term;
    User.find({ username: { $regex: searchTerm, $options: "i" } }, 'username').then(
        (users) => {
            // returns only usernames
            return res.status(200)
                .json({ users: users });
        },
        (err) => {
            console.log(err);
            return res.status(500).json({
                message: 'Internal server error. Please try again later.'
            });
        }
    );
});

module.exports = router;