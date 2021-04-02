/**
 * User Model
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

/**
 * User Schema
 */
const UserSchema = new Schema({
    username: { type: String, index: { unique: true } },
    email: String,
    hash: String,
    salt: String,
});

/**
 * @name setPassword
 * @description Sets password to user.
 * @param {string} password Password to be set.
 */
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

/**
 * @name validatePassword
 * @description Validates if an entered password is correct.
 * @param {string} password password to be checked.
 * @returns 
 */
UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

/**
 * @name generateJWT
 * @description Generates a JWT token from user info.
 * @param {string} secret secret key to be used.
 * @returns 
 */
UserSchema.methods.generateJWT = function (secret, expiration) {
    return jwt.sign({
        username: this.username,
        expiration: expiration
    }, secret);
}

mongoose.model('User', UserSchema);