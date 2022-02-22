// Requiring files and functions
const res = require('express/lib/response');
const db = require('../db/connection.js');
const { handleNonExistentValues } = require('../utils/utils.js');
const { selectArticleByIdQuery, updateArticleByIdQuery, selectArticlesQuery, insertArticleQuery, removeArticleByIdQuery } = require("./queries")

// Selecting article by article_id and handling potential errors
exports.selectArticleById = (article_id) => {
    return db
           .query(selectArticleByIdQuery, [article_id]) 
           .then((result) => {
               if (result.rowCount === 0) {
                   return handleNonExistentValues("article_id", article_id)
               }
               else {
                   return result.rows[0]; 
               }
           }) 
}

// Updating the votes of an article
exports.updateArticleById = (newVote, article_id) => {
    return db
           .query(updateArticleByIdQuery, [newVote.inc_votes, article_id])
           .then((result) => {
               if (result.rowCount === 0) {
                   return handleNonExistentValues("article_id", article_id)
               }
               else {
                   return result.rows[0];
               }
           })
}

// Selecting articles with sort_by , order, and topic parameters
exports.selectArticles = (sort = "created_at", order = "desc", topic = "%") => {
        return db
        .query(selectArticlesQuery(topic.toLowerCase(), sort.toLowerCase(), order.toUpperCase()))
        .then((result) => {
            return result.rows;
        })
}

// Inserting an article
exports.insertArticle = (author, title, body, topic) => {
    return db
           .query(insertArticleQuery, [author, title, body, topic])
           .then((result) => {
               return result.rows[0];            
           })
}

// Removing an using its article_id
exports.removeArticleById = (article_id) => {
    return db
           .query(removeArticleByIdQuery, [article_id])
           .then((result) => {
            if (result.rowCount === 0) {
                return handleNonExistentValues("article for article_id", article_id)
            }
            else {
                return result.rows[0]
            }
           })
}