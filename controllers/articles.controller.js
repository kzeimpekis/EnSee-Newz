// Requiring files and functions
const {selectArticleById, updateArticleById, selectArticles, insertArticle, removeArticleById} = require("../models/articles.model");
const { handleNaN, handleInvalidParameter, handleMissingKeys } = require("../utils/utils");

// Receiving the article with specific article_id
exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params;  
    Promise.all([selectArticleById(article_id),
                 handleNaN("article_id", article_id)])
    .then((article) => {
      res.status(200).send({ article: article[0] })
    })
    .catch((err) => {
        next(err)
    })
}

// Patching an article using its article_id
exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    const newVote = req.body;
    Promise.all([updateArticleById(newVote, article_id),
                 handleNaN("article_id", article_id),
                 handleNaN("inc_votes", newVote.inc_votes)])
    .then((article) => {
      res.status(200).send({ article: article[0] })
    })
    .catch((err) => {
      next(err)
    })
}

// Receiving multiple articles with sort_by , order, and topic parameters
exports.getArticles = (req, res, next) => {
  const {sort, order, topic} = req.query;
    Promise.all([selectArticles(sort, order, topic), 
                 handleInvalidParameter(sort, order, topic)])
    .then((articles) => {
        if (articles[0].length === 0) {
          res.status(200).send({msg: "No entry with specified valid topic."})
        } 
        else {
          res.status(200).send({articles: articles[0]})
        }     
    })
    .catch((err) => {
      next(err)
    });
}

// Posting an article
exports.postArticle = (req, res , next) => {
  const {author, title, body, topic} = req.body;
  Promise.all([insertArticle(author, title, body, topic),
               handleMissingKeys(["author", "title", "body", "topic"], req.body)])
  .then((article) => {
    res.status(201).send({article: article[0]})
  })
  .catch((err) => {
    next(err)
  })
}

// Deleting an article using its article_id
exports.deleteArticleById = (req, res, next) => {
  const {article_id} = req.params;
  Promise.all([removeArticleById(article_id),
               handleNaN("article_id", article_id)])
  .then(() => {
      res.status(204).send()
  })
  .catch((err) => {
      next(err)
  })
}