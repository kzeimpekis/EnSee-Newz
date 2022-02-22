const { selectTopics, insertTopic } = require("../models/topics.model");
const { handleMissingKeys } = require("../utils/utils");

exports.getTopics = (req, res) => {
    selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {console.log(err)})
}

// Posting a topic
exports.postTopic = (req, res , next) => {
  const {slug, description} = req.body;
  Promise.all([insertTopic(slug, description),
               handleMissingKeys(["slug", "description"], req.body)])
  .then((topic) => {
    res.status(201).send({topic: topic[0]})
  })
  .catch((err) => {
    next(err)
  })
}