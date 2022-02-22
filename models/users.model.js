// Requiring files and functions
const db = require('../db/connection.js');
const { handleNonExistentValues } = require('../utils/utils.js');
const { selectUsersQuery, selectUserByUsernameQuery } = require("./queries")

// Selecting all the users
exports.selectUsers = () => {
    return db
           .query(selectUsersQuery)
           .then((result) => {
                return result.rows;
           })
}

// Selecting user by username
exports.selectUserByUsername = (username) => {
    return db
           .query(selectUserByUsernameQuery, [username])
           .then((result) => {
            if (result.rowCount === 0) {
                return handleNonExistentValues("username", username)
            }
            else {
                return result.rows[0];
            }
           })
}