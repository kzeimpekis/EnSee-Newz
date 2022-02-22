// 404 errors
exports.handle404Errors = (req, res) => {
    res.status(404).send({msg: "Invalid URL"})
}

// PSQL errors
exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({msg: "Bad request"})
    }
    else {
        next(err)
    }
}

// Custom errors
exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({msg: err.msg})
    }
    else {
        next(err)
    }
}

// Constraints errors
exports.handleConstraintErrors = (err, req, res, next) => {
    if (err.code === "23503") {
        res.status(404).send({msg: err.detail})
    }
    else {
        next(err)
    }
}

// Server errors
exports.handleServerErrors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: "Internal Server Error"})
}