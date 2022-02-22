// Requiring files and functions
const db = require('../db/connection.js');
const { handleNonExistentValues } = require('../utils/utils.js');
const { selectCommentsByArticleIQuery, insertCommentInArticleQuery, removeCommentByIdQuery, updateCommentByIdQuery } = require('./queries.js');

// Selecting comments by article_id and handling potential errors
exports.selectCommentsByArticleId = (article_id) => {
    return db
           .query(selectCommentsByArticleIQuery, [article_id])
           .then((result) => {
            if (result.rowCount === 0) {
                return handleNonExistentValues("comments for article_id", article_id)
            }
            else {
                return result.rows; 
            }
           })
}

// Inserting comment in an article
exports.insertCommentInArticle = (article_id, username, body) => {
    return db
           .query(insertCommentInArticleQuery, [username, article_id, body])
           .then((result) => {
            if (result.rowCount === 0) {
                return handleNonExistentValues("article_id", article_id)
            }
            else {
                return result.rows[0]
            }
            })
}

// Removing a comment using its comment_id
exports.removeCommentById = (comment_id) => {
    return db
           .query(removeCommentByIdQuery, [comment_id])
           .then((result) => {
            if (result.rowCount === 0) {
                return handleNonExistentValues("comments for comment_id", comment_id)
            }
            else {
                return result.rows[0]
            }
           })
}

exports.updateCommentById = (newVote, comment_id) => {
    return db
           .query(updateCommentByIdQuery, [newVote.inc_votes, comment_id])
           .then((result) => {
               if (result.rowCount === 0) {
                   return handleNonExistentValues("comment_id", comment_id)
               }
               else {
                   return result.rows[0];
               }
           })
}