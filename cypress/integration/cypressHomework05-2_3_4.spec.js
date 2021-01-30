describe("Homework 2", () => {
  beforeEach("login the app", () => {
      cy.loginAPIWeb()
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
    cy.get('[placeholder="Enter tags"]').type("This is a tag");
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
      expect(xhr.response.body.article.tagList).to.be.empty;
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

  it("Stub network response again", () => {

    //Stub the request
    cy.intercept("**/api/articles?*", { fixture: "articles.json" }).as(
      "getArticles"
    );

    //Triger the resueqt
    cy.get('[href="#/@Don-QA"]').click();

    //Validate response has ten data and author image is exist
    cy.wait("@getArticles").then((data) => {
      cy.get('[class="article-preview"]')
        .find(
          '[src="https://static.productionready.io/images/smiley-cyrus.jpg"]', {timeout:6000}
        )
        .should("have.length", 10)
        .invoke("attr", "src")
        .then((src) => {
          expect(src).to.be.exist;
        });

      //Validate each article's author image matching fixture's
      for (let count = 0; count < 10; count++) {
        cy.get('[class="article-preview"]')
          .find(
            '[src="https://static.productionready.io/images/smiley-cyrus.jpg"]', {timeout:6000}
          )
          .eq(count)
          .invoke("attr", "src")
          .then((src) => {
            expect(data.response.body.articles[count].author.image).to.eq(src);
          });
      }
    });
  });
});
