// Requiring files and functions
const {selectCommentsByArticleId, insertCommentInArticle, removeCommentById, updateCommentById} = require("../models/comments.model");
const { handleNaN, handleNonExistentValues, handleMissingKeys } = require("../utils/utils");

// Receiving comments from specific article_id
exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    Promise.all([selectCommentsByArticleId(article_id),
                 handleNaN("article_id", article_id)])
    .then((comments) => {
        res.status(200).send({comments: comments[0]})
    })
    .catch((err) => {
        next(err)
    })
}

// Posting comment on a specific article_id
exports.postCommentInArticle = (req, res, next) => {
    const { article_id } = req.params;
    const {username, body} = req.body;
    Promise.all([insertCommentInArticle(article_id, username, body),
                 handleNaN("article_id", article_id),
                 handleMissingKeys(["username", "body"], req.body)])
    .then((comment) => {
        res.status(201).send({comment: comment[0]})
    })
    .catch((err) => {
        next(err)
    })
}

// Deleting a comment using its comment_id
exports.deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params;
    Promise.all([removeCommentById(comment_id),
                 handleNaN("comment_id", comment_id)])
    .then((comment) => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    const newVote = req.body;
    Promise.all([updateCommentById(newVote, comment_id),
                 handleNaN("comment_id", comment_id),
                 handleNaN("inc_votes", newVote.inc_votes)])
    .then((comment) => {
      res.status(200).send({ comment: comment[0] })
    })
    .catch((err) => {
      next(err)
    })
}