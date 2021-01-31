const { data } = require("jquery");

describe("Homework 2_3_4", () => {
  beforeEach("login the app", () => {
    cy.loginAPIWeb();
  });

  it("Validate HTTP request for adding a new article", () => {
    //Listen to the Post articles request
    cy.intercept("POST", "**/articles").as("postArticles");

    //Fill the article form
    cy.contains("New Article").click();
    cy.get('[placeholder="Article Title"]').type("This is a title");
    cy.get('[placeholder="What\'s this article about?"]').type(
      "This is a description"
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      "This is a body"
    );
    cy.get('[placeholder="Enter tags"]').type("This is a tag{Enter}");
    cy.contains("Publish Article").click();

    //Validate HTTP request
    cy.wait("@postArticles");
    cy.get("@postArticles").then((xhr) => {
      console.log(xhr);
      expect(xhr.request.headers.accept).to.include("application/json");
      expect(xhr.request.body.article.body).to.equal("This is a body");
      expect(xhr.response.body.article.description).to.equal(
        "This is a description"
      );
      expect(xhr.response.body.article.title).to.equal("This is a title");
      expect(xhr.response.body.article.tagList).to.contain("This is a tag");
    });
  });

  it("Stub network response", () => {
    //Stub the request
    cy.intercept("**/api/articles?*", { fixture: "articles.json" }).as(
      "getArticles"
    );

    //Stub statuscode 500 as response
    cy.intercept(
      "GET",
      "https://conduit.productionready.io/api/profiles/Don-QA",
      {
        statusCode: 500,
      }
    ).as("getUserID");

    //Triger the request
    cy.get('[href="#/@Don-QA"]').click();

    //Validate the response and frontend
    cy.wait("@getUserID");
    //cy.wait('@getArticles')
  });

  it.only("Stub network response again", () => {
    //Stub the request
    cy.intercept("**/api/articles?*", { fixture: "articles.json" }).as(
      "getArticles"
    );

    //Triger the resueqt
    cy.get('[href="#/@Don-QA"]').click();

    //Validate response has ten data and each author image is exist
    cy.wait("@getArticles", { timeout: 8000 }).then((xhr) => {
      expect(xhr.response.body.articles).to.have.lengthOf(10);

      //compare response's each author image to fixture's each author image
      cy.fixture("articles").then((data) => {
        for (let count = 0; count < 10; count++) {
          expect(xhr.response.body.articles[count].author.image).to.be.exist;
          expect(xhr.response.body.articles[count].author.image).to.eq(
            data.articles[count].author.image
          );
        }
      });
    });
  });
});
