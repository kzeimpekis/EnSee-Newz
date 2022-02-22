const endpoints = require("../endpoints.json")

exports.greetingMessage = (req, res) => {
    res.status(200).send({msg: "Welcome to my news api! Add /api to the url to read the documentation."})
};

exports.getEndpoints = (req, res) => {
    res.status(200).send(endpoints)
}