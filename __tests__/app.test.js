// Requiring files and functions
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require("supertest");
const app = require("../app");
const endpoints = require("../endpoints.json")

// Seeding and ending the database
beforeEach(() => seed(testData));
afterAll(() => db.end());

// Tests for the endpoint GET /
describe("GET /", () => {
    test("200: Responds with the welcome message", () => {
        return request(app)
        .get("/")
        .expect(200)
        .then((res) => {
            expect(res.body.msg).toBe("Welcome to my news api! Add /api to the url to read the documentation.")
        })
    })
})

// Tests for the endpoint GET /api
describe("GET /api", () => {
    test("200: Responds with endpoints object documentation", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((res) => {
                expect(res.body).toStrictEqual(endpoints)
            })
    })
})

// Tests fot the endpoing GET /api/topics
describe("GET /api/topics", () => {
    test("200: Responds with an array of topic objects", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                expect(res.body.topics).toBeInstanceOf(Array);
            })
    })
    test("200: Responds with properties slug and description", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                res.body.topics.forEach((topic) => {
                    expect(topic).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)
                        })
                    );
                });
            })
    })
})

// Tests for the endpoint GET /api/articles/:article_id
describe("GET /api/articles/:article_id", () => {
    test("200: Responds with an article object", () => {
        const article_id = 1;
        return request(app)
            .get(`/api/articles/${article_id}`)
            .expect(200)
            .then((res) => {
                expect(res.body).toBeInstanceOf(Object);
            })
    })
    test("200: Responds with an article object with the pre-defined properties", () => {
        const article_id = 1;
        return request(app)
            .get(`/api/articles/${article_id}`)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        article: {
                            article_id: expect.any(Number),
                            title: expect.any(String),
                            body: expect.any(String),
                            votes: expect.any(Number),
                            topic: expect.any(String),
                            author: expect.any(String),
                            created_at: expect.any(String),
                            comment_count: expect.any(String)
                        }
                    })
                )
            })
    })
    test("404: Responds with specific msg when requested a non-existent article_id", () => {
        const article_id = 1000;
        return request(app)
               .get(`/api/articles/${article_id}`)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent article_id with value ${article_id}. Please try again.`)
               })  
    })
    test("400: Responds with error msg when the article_id is in non-numeric format", () => {
        const article_id = "Northcoders";
        return request(app)
               .get(`/api/articles/${article_id}`)
               .expect(400)
               .then((res) => {
                   expect(res.body.msg).toBe(`Invalid article_id with value ${article_id}. Must be a number.`)
               }) 
    })
})

// Tests for the endpoint PATCH /api/articles/:article_id
describe("PATCH /api/articles/:article_id", () => {
    test("200: Responds with an article object", () => {
        const newVote = { inc_votes: 1 };
        const article_id = 1;
        return request(app)
               .patch(`/api/articles/${article_id}`)
               .send(newVote)
               .expect(200)
               .then((res) => {
                  expect(res.body).toBeInstanceOf(Object);
               })
    })
    test("200: Responds with an updated article object, with increased votes.", () => {
        const newVote = { inc_votes: 1 };
        const article_id = 1;
        return request(app)
               .patch(`/api/articles/${article_id}`)
               .send(newVote)
               .expect(200)
               .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                      article: {
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        topic: 'coding',
                        author: 'butter_bridge',
                        body: 'I find this existence challenging',
                        created_at: expect.any(String),
                        votes: 101,
                      }
                    })
                  );
               })
    })
    test("400: Responds with error msg when the article_id is in non-numeric format", () => {
        const newVote = { inc_votes: 1 };
        const article_id = "Northcoders";
        return request(app)
               .patch(`/api/articles/${article_id}`)
               .send(newVote)
               .expect(400)
               .then((res) => {
                   expect(res.body.msg).toBe(`Invalid article_id with value ${article_id}. Must be a number.`)
               }) 
    })
    test("404: Responds with specific msg when requested a non-existent article_id", () => {
        const newVote = { inc_votes: 1 };
        const article_id = 1000;
        return request(app)
               .patch(`/api/articles/${article_id}`)
               .send(newVote)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent article_id with value ${article_id}. Please try again.`)
               })  
    })
    test('400: Responds with error msg and when an invalid vote type is entered.', () => {
        const newVotes = { inc_votes: "Northcoders" };
        const article_id = 1;
        return request(app)
          .patch(`/api/articles/${article_id}`)
          .send(newVotes)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe(`Invalid inc_votes with value ${newVotes.inc_votes}. Must be a number.`);
          });
    });
})

// Tests for the endpoint GET /api/articles
describe("GET /api/articles", () => {
    test("200: Responds with an array of articles with specific format and default parameters", () => {
        return request(app)
               .get("/api/articles")
               .expect(200)
               .then((res) => {
                   expect(res.body.articles).toBeInstanceOf(Array);
                   expect(res.body.articles).toHaveLength(12);
                   res.body.articles.forEach((article) => {
                       expect(article).toMatchObject({
                           author: expect.any(String),
                           title: expect.any(String),
                           article_id: expect.any(Number),
                           topic: expect.any(String),
                           created_at: expect.any(String),
                           votes: expect.any(Number),
                           comment_count: expect.any(String)
                       })
                   })
                   expect(res.body.articles).toBeSortedBy("created_at", { descending: true })
               })         
        })
    describe("Sorting", () => {
        test("200: Responds with an array of article objects, sorted by the column 'votes'.", () => {
            return request(app)
                   .get("/api/articles?sort=votes")
                   .expect(200)
                   .then((res) => {
                       expect(res.body.articles).toBeSortedBy("votes", {descending: true, coerce: true})
                   })
        })
        test("200: Responds with an array of article objects, sorted by the column 'comment_count'.", () => {
            return request(app)
                   .get("/api/articles?sort=comment_count")
                   .expect(200)
                   .then((res) => {
                       expect(res.body.articles).toBeSortedBy("comment_count", {descending: true, coerce: true})
                   })
        })
        test("400: Responds with error and msg when passed an invalid sort parameter.", () => {
            return request(app)
                   .get("/api/articles?sort=northcoders")
                   .expect(400)
                   .then((res) => {
                       expect(res.body.msg).toBe("Invalid sort parameter.");
              });
          });
          test("200: Responds with articles object when passed a sort parameter with upperCase/lowerCase characters.", () => {
            return request(app)
                   .get("/api/articles?sort=VoTeS")
                   .expect(200)
                   .then((res) => {
                       expect(res.body.articles).toBeSortedBy("votes", {descending: true, coerce: true});
              });
          });
    })
    describe("Ordering", () => {
        test("200: Responds with an array of article objects, ordered by default 'descending' order.", () => {
            return request(app)
                   .get("/api/articles")
                   .expect(200)
                   .then((res) => {
                       expect(res.body.articles).toBeSortedBy("created_at", {descending: true})
                   })
        })
        test("200: Responds with an array of article objects, ordered by 'ascending' order.", () => {
            return request(app)
                   .get("/api/articles?order=ASC")
                   .expect(200)
                   .then((res) => {
                       expect(res.body.articles).toBeSortedBy("created_at", {descending: false})
                   })
        })
        test("400: Responds with error and msg when passed an invalid order parameter.", () => {
            return request(app)
                   .get("/api/articles?order=northcoders")
                   .expect(400)
                   .then((res) => {
                       expect(res.body.msg).toBe("Invalid order parameter.");
              });
          });
        test("200: Responds with articles object when passed an order parameter with upperCase/lowerCase characters.", () => {
            return request(app)
                    .get("/api/articles?order=AsC")
                    .expect(200)
                    .then((res) => {
                        expect(res.body.articles).toBeSortedBy("created_at", {descending: false, coerce: true});
                });
            });
    })
    describe("Filtering", () => {
        test("200: Responds with an array of article objects, filtered by 'topic'.", () => {
            return request(app)
                   .get("/api/articles?topic=coding")
                   .expect(200)
                   .then((res) => {
                       expect(res.body.articles).toBeInstanceOf(Array)
                       expect(res.body.articles).toHaveLength(11)
                       res.body.articles.forEach((article) => {
                        expect(article).toMatchObject({
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            topic: "coding",
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(String)
                        })
                    })
                   })
        })
        test("400: Responds with error and msg when passed an invalid topic parameter.", () => {
            return request(app)
                   .get("/api/articles?topic=northcoders")
                   .expect(400)
                   .then((res) => {
                       expect(res.body.msg).toBe("Invalid topic parameter.");
              });
          });
        test("200: Responds with articles object when passed a topic parameter with upperCase/lowerCase characters.", () => {
        return request(app)
                .get("/api/articles?topic=FooTbAlL")
                .expect(200)
                .then((res) => {
                    expect(res.body.articles).toBeInstanceOf(Array)
                    expect(res.body.articles).toHaveLength(1)
                    expect(res.body.articles).toBeSortedBy("created_at", {descending: true, coerce: true});
            });
        });
        test("200: Responds with message when passed a valid but with no entries topic.", () => {
            return request(app)
                    .get("/api/articles?topic=cooking")
                    .expect(200)
                    .then((res) => {
                        expect(res.body.msg).toBe("No entry with specified valid topic.")
                });
            });
    })
})

// Tests for the endpoint GET /api/articles/:article_id/comments
describe("GET /api/articles/:article_id/comments", () => {
    test("200: Responds with an array of comments for the given article_id.", () => {
        const article_id = 1;
        return request(app)
               .get(`/api/articles/${article_id}/comments`)
               .expect(200)
               .then((res) => {
                    expect(res.body.comments).toBeInstanceOf(Array);
                    expect(res.body.comments).toHaveLength(11);
                    res.body.comments.forEach((comment) => {
                        expect(comment).toMatchObject({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String)
                        });
                    });
                })
    })
    test("400: Responds with error msg when the article_id is in non-numeric format", () => {
        const article_id = "Northcoders";
        return request(app)
               .get(`/api/articles/${article_id}/comments`)
               .expect(400)
               .then((res) => {
                   expect(res.body.msg).toBe(`Invalid article_id with value ${article_id}. Must be a number.`)
               }) 
    })
    test("404: Responds with specific msg when requested a non-existent article_id", () => {
        const article_id = 1000;
        return request(app)
               .get(`/api/articles/${article_id}/comments`)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent comments for article_id with value ${article_id}. Please try again.`)
               })  
    })
    test("404: Responds with message when passed a valid article_id but with no entries comment.", () => {
        const article_id = 2;
        return request(app)
                .get(`/api/articles/${article_id}/comments`)
                .expect(404)
                .then((res) => {
                    expect(res.body.msg).toBe(`Non-existent comments for article_id with value ${article_id}. Please try again.`)
            });
        });
})

// Tests for the endpoint POST /api/articles/:article_id/comments
describe("POST /api/articles/:article_id/comments", () => {
    test("201: Responds with a new posted comment object.", () => {
        const article_id = 1;
        const comment = {
            username: 'rogersop',
            body: 'Sounds interesting!'
        };
        return request(app)
               .post(`/api/articles/${article_id}/comments`)
               .send(comment)
               .expect(201)
               .then((res) => {
                    expect(res.body).toBeInstanceOf(Object)
                    expect(res.body.comment).toBeInstanceOf(Object);
                    expect(res.body.comment).toMatchObject({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number)
                    });
               })
    })
    test("400: Responds with an error when requested an invalid article_id.", () => {
        const article_id = "Northcoders";
        const comment = {
            username: 'rogersop',
            body: 'Sounds interesting!'
        };
        return request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(comment)
            .expect(400)
            .then((res) => {
                expect(res.body.msg).toBe(`Invalid article_id with value ${article_id}. Must be a number.`)
            })
    })
    test("404: Responds with specific msg when requested a non-existent article_id", () => {
        const article_id = 100;
        const comment = {
            username: 'rogersop',
            body: 'Sounds interesting!'
        };
        return request(app)
               .post(`/api/articles/${article_id}/comments`)
               .send(comment)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Key (article_id)=(${article_id}) is not present in table \"articles\".`)
               })  
    })
    test("201: Responds with a new posted comment using only the needed parameters", () => {
        const article_id = 1;
        const comment = {
            username: 'rogersop',
            body: 'Sounds interesting!',
            country: "United Kingdom"
        };
        return request(app)
               .post(`/api/articles/${article_id}/comments`)
               .send(comment)
               .expect(201)
               .then((res) => {
                    expect(res.body).toBeInstanceOf(Object)
                    expect(res.body.comment).toBeInstanceOf(Object);
                    expect(res.body.comment).toMatchObject({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number)
                    });
               })
    })
    test("400: Responds with an error when passed a comment with missing key.", () => {
        const article_id = 1;
        const comment = {
            body: 'Sounds interesting!'
        };
        return request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(comment)
            .expect(400)
            .then((res) => {
                expect(res.body.msg).toBe(`Missing property: username`)
            })
    })
})

// Tests fot the endpoint DELETE /api/comments/:comment_id
describe("DELETE /api/comments/:comment_id", () => {
    test("204: Responds with no content, and deletes the comment of the provided comment_id", () => {
        const comment_id = 1;
        return request(app)
               .delete(`/api/comments/${comment_id}`)
               .expect(204)
               .then((res) => {
                   expect(res.body).toBeInstanceOf(Object)
                   expect(res.body).toMatchObject({})
               })
    })
    test("404: Responds with specific msg when requested a non-existent comment_id", () => {
        const comment_id = 1000;
        return request(app)
               .delete(`/api/comments/${comment_id}`)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent comments for comment_id with value ${comment_id}. Please try again.`)
               })  
    })
    test("400: Responds with error msg when the comment_id is in non-numeric format", () => {
        const comment_id = "Northcoders";
        return request(app)
               .delete(`/api/comments/${comment_id}`)
               .expect(400)
               .then((res) => {
                   expect(res.body.msg).toBe(`Invalid comment_id with value ${comment_id}. Must be a number.`)
               }) 
    })
})

// Tests for the endpoint GET /api/users
describe("GET /api/users", () => {
    test("200: Responds with an array of users objects.", () => {
        return request(app)
               .get("/api/users")
               .expect(200)
               .then((res) => {
                    expect(res.body.users).toBeInstanceOf(Array);
                    expect(res.body.users).toHaveLength(4);
                    res.body.users.forEach(user => {
                        expect(user).toEqual(
                            expect.objectContaining({
                                username: expect.any(String)
                            })
                        );
                    });
                });
    })
})

// Tests for the endpoint GET /api/users/:username
describe("GET /api/users/:username", () => {
    test("200: Responds with a user object for the specific username.", () => {
        const username = 'lurker';
        return request(app)
               .get(`/api/users/${username}`)
               .expect(200)
               .then(({ body }) => {
                    expect(body).toEqual({
                        user: {
                            username: 'lurker',
                            name: 'do_nothing',
                            avatar_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
                        }
                    });
                });
    })
    test("404: Responds with specific msg when requested a non-existent username", () => {
        const username = 'northcoders';
        return request(app)
               .get(`/api/users/${username}`)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent username with value ${username}. Please try again.`)
               })  
    })
})

// Tests for the endpoint PATCH /api/comments/:comment_id
describe("PATCH /api/comments/:comment_id", () => {
    test("200: Responds with a comment object", () => {
        const newVote = { inc_votes: 1 };
        const comment_id = 1;
        return request(app)
               .patch(`/api/comments/${comment_id}`)
               .send(newVote)
               .expect(200)
               .then((res) => {
                  expect(res.body).toBeInstanceOf(Object);
               })
    })
    test("200: Responds with an updated comment object, with increased votes.", () => {
        const newVote = { inc_votes: 1 };
        const comment_id = 1;
        return request(app)
               .patch(`/api/comments/${comment_id}`)
               .send(newVote)
               .expect(200)
               .then((res) => {
                   expect(res.body).toEqual({
                        comment: {
                          comment_id: 1,
                          author: 'butter_bridge',
                          article_id: 9,
                          votes: 17,
                          created_at: expect.any(String),
                          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
                        }
                    })
               })
                  
    })
    test("400: Responds with error msg when the comment_id is in non-numeric format", () => {
        const newVote = { inc_votes: 1 };
        const comment_id = "Northcoders";
        return request(app)
               .patch(`/api/comments/${comment_id}`)
               .send(newVote)
               .expect(400)
               .then((res) => {
                   expect(res.body.msg).toBe(`Invalid comment_id with value ${comment_id}. Must be a number.`)
               }) 
    })
    test("404: Responds with specific msg when requested a non-existent comment_id", () => {
        const newVote = { inc_votes: 1 };
        const comment_id = 1000;
        return request(app)
               .patch(`/api/comments/${comment_id}`)
               .send(newVote)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent comment_id with value ${comment_id}. Please try again.`)
               })  
    })
    test('400: Responds with error msg and when an invalid vote type is entered.', () => {
        const newVotes = { inc_votes: "Northcoders" };
        const comment_id = 1;
        return request(app)
          .patch(`/api/comments/${comment_id}`)
          .send(newVotes)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe(`Invalid inc_votes with value ${newVotes.inc_votes}. Must be a number.`);
          });
    });
})

// Tests for the endpoint POST /api/articles
describe("POST /api/articles", () => {
    test("201: Responds with the new article, enriched with more info.", () => {
        const article = {
            author: "rogersop",
            title: "String",
            body: "Text",
            topic: "football"
        }
        return request(app)
               .post("/api/articles")
               .send(article)
               .expect(201)
               .then((res) => {
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.article).toBeInstanceOf(Object);
                expect(res.body.article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    body: expect.any(String),
                    topic: expect.any(String),
                    article_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    comment_count: expect.any(String)
                });
               })
    })
    test("400: Responds with an error when passed an article with missing key.", () => {
        const article = {
            author: "rogersop",
            body: "Text",
            topic: "football"
        }
        return request(app)
            .post("/api/articles")
            .send(article)
            .expect(400)
            .then((res) => {
                expect(res.body.msg).toBe(`Missing property: title`)
            })
    })
    test("201: Responds with a new posted article using only the needed parameters", () => {
        const article = {
            author: "rogersop",
            title: "String",
            body: "Text",
            topic: "football",
            country: "United Kingdom"
        }
        return request(app)
               .post("/api/articles")
               .send(article)
               .expect(201)
               .then((res) => {
                    expect(res.body).toBeInstanceOf(Object)
                    expect(res.body.article).toBeInstanceOf(Object);
                    expect(res.body.article).toMatchObject({
                        author: expect.any(String),
                        title: expect.any(String),
                        body: expect.any(String),
                        topic: expect.any(String),
                        article_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        comment_count: expect.any(String)
                    });
               })
    })
})

// Tests for the endpoint POST /api/topics
describe("POST /api/topics", () => {
    test("201: Responds with the new topic.", () => {
        const topic = {
            slug: "jokes",
            description: "Laughing is contagious"
        }
        return request(app)
               .post("/api/topics")
               .send(topic)
               .expect(201)
               .then((res) => {
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.topic).toBeInstanceOf(Object);
                expect(res.body.topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                });
               })
    })
    test("400: Responds with an error when passed a topic with missing key.", () => {
        const topic = {
            slug: "jokes"
        }
        return request(app)
            .post("/api/topics")
            .send(topic)
            .expect(400)
            .then((res) => {
                expect(res.body.msg).toBe(`Missing property: description`)
            })
    })
    test("201: Responds with a new topic using only the needed parameters", () => {
        const topic = {
            slug: "jokes",
            description: "Laughing is contagious",
            country: "United Kingdom"
        }
        return request(app)
               .post("/api/topics")
               .send(topic)
               .expect(201)
               .then((res) => {
                 expect(res.body).toBeInstanceOf(Object)
                 expect(res.body.topic).toBeInstanceOf(Object);
                 expect(res.body.topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                });
                })
    })
})

// Tests fot the endpoint DELETE /api/articles/:article_id
describe("DELETE /api/articles/:article_id", () => {
    test("204: Responds with no content, and deletes the article of the provided article_id", () => {
        const article_id = 1;
        return request(app)
               .delete(`/api/articles/${article_id}`)
               .expect(204)
               .then((res) => {
                   expect(res.body).toBeInstanceOf(Object)
                   expect(res.body).toMatchObject({})
               })
    })
    test("404: Responds with specific msg when requested a non-existent article_id", () => {
        const article_id = 1000;
        return request(app)
               .delete(`/api/articles/${article_id}`)
               .expect(404)
               .then((res) => {
                   expect(res.body.msg).toBe(`Non-existent article for article_id with value ${article_id}. Please try again.`)
               })  
    })
    test("400: Responds with error msg when the article_id is in non-numeric format", () => {
        const article_id = "Northcoders";
        return request(app)
               .delete(`/api/articles/${article_id}`)
               .expect(400)
               .then((res) => {
                   expect(res.body.msg).toBe(`Invalid article_id with value ${article_id}. Must be a number.`)
               }) 
    })
})