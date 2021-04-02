/**
 * Database Util
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');

/**
 * @name connectDB
 * @description initializes database connection and models
 * @param {string} connStr Connection string.
 */
exports.connectDB = function (connStr) {
    // adds configs and connects
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(connStr);
    mongoose.set('debug', true);

    // Initializes models
    require('../models');

    // adds event listeners
    mongoose.connection.on('connected', function () {
        console.log("Database connection is established.");
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Database connection is closed.");
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Database connection is closed due to program termination.");
            process.exit(0);
        });
    });
}