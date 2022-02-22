const { formatTopicData, formatUserData, formatArticleData, formatCommentData } = require("../db/seeds/utils.js/utils");


describe("Ensure the format of the data is correct", () => {
    test("Topic Data", () => {
        // Arrange
        const input = [
            { slug: "value11", description:"value12" },
            { slug: "value21", description:"value22" },
          ];
        const expected = [
            ["value11", "value12"],
            ["value21", "value22"],
          ];
        // Act
        const actual = formatTopicData(input);
        // Assert
        expect(actual).toEqual(expected);
    }) 

    test("User Data", () => {
        // Arrange
        const input = [
            { username: "value11", name:"value12", avatar_url:"value13" },
            { username: "value21", name:"value22", avatar_url:"value23" },
          ];
        const expected = [
            ["value11", "value12", "value13"],
            ["value21", "value22", "value23"],
          ];
        // Act
        const actual = formatUserData(input);
        // Assert
        expect(actual).toEqual(expected);
    })

    test("Article Data", () => {
        // Arrange
        const input = [
            { title: "value11", topic:"value12", author:"value13", body:"value14", created_at:"value15", votes:"value16" },
            { title: "value21", topic:"value22", author:"value23", body:"value24", created_at:"value25", votes:"value26"  },
          ];
        const expected = [
            ["value11", "value12", "value13", "value14", "value15", "value16"],
            ["value21", "value22", "value23", "value24", "value25", "value26"],
          ];
        // Act
        const actual = formatArticleData(input);
        // Assert
        expect(actual).toEqual(expected);
    })

    test("Comment Data", () => {
        // Arrange
        const input = [
            { body: "value11", votes:"value12", author:"value13", article_id:"value14", created_at:"value15" },
            { body: "value21", votes:"value22", author:"value23", article_id:"value24", created_at:"value25" },
          ];
        const expected = [
            ["value11", "value12", "value13", "value14", "value15"],
            ["value21", "value22", "value23", "value24", "value25"],
          ];
        // Act
        const actual = formatCommentData(input);
        // Assert
        expect(actual).toEqual(expected);
    })

})