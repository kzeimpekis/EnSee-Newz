// DROP TABLES
exports.dropTableCommentsQuery = `DROP TABLE IF EXISTS comments;`
exports.dropTableArticlesQuery = `DROP TABLE IF EXISTS articles;`
exports.dropTableUsersQuery = `DROP TABLE IF EXISTS users;`
exports.dropTableTopicsQuery = `DROP TABLE IF EXISTS topics;`

// CREATE TABLES
exports.createTableTopicsQuery = `
CREATE TABLE topics (
  slug VARCHAR(50) PRIMARY KEY,
  description VARCHAR(255)
);`

exports.createTableUsersQuery = `
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    avatar_url TEXT,
    name VARCHAR(255)
);`

exports.createTableArticlesQuery = `
CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    topic VARCHAR(50) REFERENCES topics(slug),
    author VARCHAR(50) REFERENCES users(username),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`

exports.createTableCommentsQuery = `
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(50) REFERENCES users(username),
    article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
    votes INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    body TEXT
);`

// INSERT DATA
exports.insertIntoTopicsQuery = `
INSERT INTO \
topics (slug, description) \
VALUES %L \
RETURNING *;`

exports.insertIntoUsersQuery = `
INSERT INTO \
users (username, name, avatar_url) \
VALUES %L \
RETURNING *;`

exports.insertIntoArticlesQuery = `
INSERT INTO \
articles (title, topic, author, body, created_at, votes) \
VALUES %L \
RETURNING *;`

exports.insertIntoCommentsQuery = `
INSERT INTO \
comments (body, votes, author, article_id, created_at) \
VALUES %L \
RETURNING *;`