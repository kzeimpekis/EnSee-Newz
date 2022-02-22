exports.formatTopicData = (topicData) => {
    const formattedTopics = topicData.map(topic => [topic.slug, topic.description]);
    return formattedTopics;
}

exports.formatUserData = (userData) => {
    const formattedUsers = userData.map(user => [user.username, user.name, user.avatar_url]);
    return formattedUsers;
}

exports.formatArticleData = (articleData) => {
    const formattedArticles = articleData.map(article => [article.title, article.topic, article.author, article.body, article.created_at, article.votes]);
    return formattedArticles;
}

exports.formatCommentData = (commentData) => {
    const formattedComments = commentData.map(comment => [comment.body, comment.votes, comment.author, comment.article_id, comment.created_at]);
    return formattedComments;
}