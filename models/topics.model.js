const db = require('../db/connection.js');
const { selectAllTopicsQuery, insertTopicQuery } = require("./queries")

exports.selectTopics = () => {
    return db
           .query(selectAllTopicsQuery) 
           .then((result) => {
               return result.rows;
           })
}

// Inserting a topic
exports.insertTopic = (slug, description) => {
    return db
           .query(insertTopicQuery, [slug, description])
           .then((result) => {
               return result.rows[0];            
           })
}