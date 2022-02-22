// Requiring files and functions
const db = require("../db/connection");

// Non-existent value errors
exports.handleNonExistentValues = (property, value) => {
    return Promise.reject({
      status: 404,
      msg: `Non-existent ${property} with value ${value}. Please try again.`
    });
  };

// Not-a-Number errors
exports.handleNaN = (property, value) => {
if (isNaN(Number(value)) || Number(value) % 1 !== 0) {
    return Promise.reject({
        status: 400,
        msg: `Invalid ${property} with value ${value}. Must be a number.`
    });
}
};

// Invalid Parameter
exports.handleInvalidParameter = (sort="created_at", order="desc", topic="%") => {
  const allowedSortBys = ["author", "title", "article_id", "topic", "created_at", "votes", "comment_count"];
  const allowedOrderBys = ["ASC", "DESC"]
  const allowedTopics = ["%", "coding", "football", "cooking"]
    if (!allowedSortBys.includes(sort.toLowerCase())) {
        return Promise.reject({
          status: 400, 
          msg: "Invalid sort parameter."
        })
    }
    if (!allowedOrderBys.includes(order.toUpperCase())) {
      return Promise.reject({
        status: 400, 
        msg: "Invalid order parameter."
      })
    }
  if (!allowedTopics.includes(topic.toLowerCase())) {
    return Promise.reject({
      status: 400, 
      msg: "Invalid topic parameter."
      })
    }
}

// Handling Missing Key
exports.handleMissingKeys = (keys, object) => {
  for (const key of keys) {
    if (!object.hasOwnProperty(key)) {
      return Promise.reject({
        status: 400,
        msg: `Missing property: ${key}`,
      });
    }
  }
};