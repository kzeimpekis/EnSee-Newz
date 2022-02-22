// Requiring files and functions
const express = require("express");
const {greetingMessage, getEndpoints}  = require("./controllers/api.controller")
const {getTopics, postTopic} = require("./controllers/topics.controller")
const {getArticleById, patchArticleById, getArticles, postArticle, deleteArticleById} = require("./controllers/articles.controller");
const { 
    handle404Errors, 
    handlePsqlErrors, 
    handleCustomErrors, 
    handleServerErrors,
    handleConstraintErrors} = require("./errors/errors");
const {getCommentsByArticleId, postCommentInArticle, deleteCommentById, patchCommentById} = require("./controllers/comments.controller");
const {getUsers, getUserByUsername} = require("./controllers/users.controller")

// Creating instance
const app = express();

// Endpoints
app.get("/", greetingMessage)
app.get("/api", getEndpoints)
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)
app.use(express.json());
app.patch("/api/articles/:article_id", patchArticleById)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)
app.post("/api/articles/:article_id/comments", postCommentInArticle)
app.delete("/api/comments/:comment_id", deleteCommentById)
app.get("/api/users", getUsers)
app.get("/api/users/:username", getUserByUsername)
app.patch("/api/comments/:comment_id", patchCommentById)
app.post("/api/articles", postArticle)
app.post("/api/topics", postTopic)
app.delete("/api/articles/:article_id", deleteArticleById)

// Errors Handling
app.all("*", handle404Errors)
app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleConstraintErrors)
app.use(handleServerErrors)

// Exporting the instance
module.exports = app;