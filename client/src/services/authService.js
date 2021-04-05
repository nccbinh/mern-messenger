/**
 * Authentication Service
 * @author Binh Nguyen
 * @since 0.1.0
 */

/**
 * @name login
 * @description calls login api for logging in
 * @returns login information
 */
exports.login = async function (username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { username: username, password: password } })
    };
    const res = await fetch(
        `api/user/login`, requestOptions
    ).then(res => res.json());
    return res;
};

/**
 * @name register
 * @description calls register api for registering a new user
 * @returns register information
 */
exports.register = async function (username, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { username: username, email: email, password: password } })
    };
    const res = await fetch(
        `api/user/register`, requestOptions
    ).then(res => res.json());
    return res;
};