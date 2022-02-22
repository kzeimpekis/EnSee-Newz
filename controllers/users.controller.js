// Requiring files and functions
const {selectUsers, selectUserByUsername } = require("../models/users.model.js")
const { handleInvalidParameter } = require("../utils/utils");

// Receiving all users
exports.getUsers = (req, res, next) => {
      selectUsers()
      .then((users) => {
            res.status(200).send({users: users})
      })
      .catch((err) => {
        next(err)
      });
}

exports.getUserByUsername = (req, res, next) => {
    const {username} = req.params;
    selectUserByUsername(username)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch((err) => {
        next(err)
    })
}
