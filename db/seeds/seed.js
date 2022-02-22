const db = require("../connection");
const { 
  dropTableCommentsQuery,
  dropTableArticlesQuery, 
  dropTableUsersQuery, 
  dropTableTopicsQuery, 
  createTableTopicsQuery, 
  createTableUsersQuery, 
  createTableArticlesQuery, 
  createTableCommentsQuery, 
  insertIntoTopicsQuery,
  insertIntoUsersQuery,
  insertIntoArticlesQuery,
  insertIntoCommentsQuery
} = require("./utils.js/queries");

const format = require("pg-format");
const { formatTopicData, formatUserData, formatArticleData, formatCommentData } = require("./utils.js/utils");

const seed = ({ topicData, userData, articleData, commentData}) => {
  return db
         .query(dropTableCommentsQuery)
         .then(() => {
           return db.query(dropTableArticlesQuery)
         })
         .then(() => {
           return db.query(dropTableUsersQuery)
         })
         .then(() => {
           return db.query(dropTableTopicsQuery)
         })
         .then(() => {
           return db.query(createTableTopicsQuery)
         }) 
         .then(() => {
           return db.query(createTableUsersQuery)
         }) 
         .then(() => {
           return db.query(createTableArticlesQuery)
         }) 
         .then(() => {
           return db.query(createTableCommentsQuery)
         })
         .then(() => {
           const formattedTopics = formatTopicData(topicData);
           const sql = format(insertIntoTopicsQuery, formattedTopics);
           return db.query(sql)
         })
         .then(() => {
          const formattedUsers = formatUserData(userData);
          const sql = format(insertIntoUsersQuery, formattedUsers);
          return db.query(sql)
         })
         .then(() => {
          const formattedArticles = formatArticleData(articleData);
          const sql = format(insertIntoArticlesQuery, formattedArticles);
          return db.query(sql)
         })
         .then(() => {
          const formattedComments = formatCommentData(commentData);
          const sql = format(insertIntoCommentsQuery, formattedComments);
          return db.query(sql)
         })
};

module.exports = seed;
