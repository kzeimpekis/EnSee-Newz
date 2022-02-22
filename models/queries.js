exports.selectAllTopicsQuery = `SELECT * FROM topics;`

exports.selectArticleByIdQuery = '\
SELECT articles.*, (SELECT COUNT(*) \
                    FROM comments \
                    WHERE comments.article_id=articles.article_id) AS comment_count \
FROM articles \
WHERE article_id=$1;'

exports.updateArticleByIdQuery = `\
UPDATE articles \
SET votes = votes + $1 \
WHERE article_id = $2 \
RETURNING *;`

exports.selectArticlesQuery = (topic, sort, order) => {
 return   `\
          SELECT articles.author, articles.title, articles.article_id, articles.topic, \
          articles.created_at, articles.votes, (SELECT COUNT(*) \
                                                FROM comments \
                                                WHERE comments.article_id=articles.article_id) AS comment_count \ 
          FROM articles \
          WHERE topic LIKE '${topic}' \
          ORDER BY ${sort} ${order};`
} 

exports.selectCommentsByArticleIQuery = `\
SELECT comment_id, votes, created_at, author, body \
FROM comments \
WHERE article_id = $1;`

exports.insertCommentInArticleQuery = `\
INSERT INTO comments \
(author, article_id, body) \
VALUES \
($1, $2, $3) \
RETURNING *;`

exports.removeCommentByIdQuery = `\
DELETE \
FROM comments \
WHERE comment_id = $1 \
RETURNING *;`

exports.selectUsersQuery = `\
SELECT username \
FROM users;`

exports.selectUserByUsernameQuery = `\
SELECT * \
FROM users \
WHERE username = $1;`

exports.updateCommentByIdQuery = `\
UPDATE comments \
SET votes = votes + $1 \
WHERE comment_id = $2 \
RETURNING *;`

exports.insertArticleQuery = `\
INSERT INTO articles \
(author, title, body, topic) \
VALUES \
($1, $2, $3, $4) \
RETURNING article_id, author, title, body, \ 
          topic, votes, created_at, (SELECT COUNT(*) \ 
                                     FROM comments \
                                     WHERE comments.article_id=articles.article_id) AS comment_count;`

exports.insertTopicQuery = `\
INSERT INTO topics \
(slug, description) \
VALUES \
($1, $2) \
RETURNING *;`

exports.removeArticleByIdQuery = `\
DELETE \
FROM articles \
WHERE article_id = $1 \
RETURNING *;`