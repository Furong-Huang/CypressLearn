describe("Stub exercise", () => {
  before(() => {
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
        expect(response.body.data).to.not.be.null
        cy.request("DELETE", "https://reqres.in/api/users/2").then(
          (response) => {
            expect(response.status).equal(204);
          }
        );
    });
  });

  it("Stub responses to GET and Patch", () => {
    //Create a new user
    const newuser = {
      name: "Sam",
      job: "QA",
    };
    cy.request("POST", "https://reqres.in/api/users", newuser).then(
      (response) => {
        expect(response.status).equal(201);
        expect(response.body.name).equal(newuser.name);
        expect(response.body.job).equal(newuser.job);
      }
    );

    //Stub Get the created user
    cy.intercept(
      {
        method: "GET",
        url: "**/users/*",
      },
      {
        statusCode: 200,
        body: {
          data: {
            id: 574,
            email: "Sam.Sung@reqres.in",
            first_name: "Sam",
            last_name: "Sung",
            avatar: "https://reqres.in/img/faces/2-image.jpg",
          },
          support: {
            url: "https://reqres.in/#support-heading",
            text:
              "To keep ReqRes free, contributions towards server costs are appreciated!",
          },
        },
      }
    ).as("get");

    cy.visit("https://reqres.in/#support-heading");
    cy.get('[data-id="users-single"]').click();

    cy.wait("@get").should(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.data.id).to.eq(574);
      expect(response.body.data.first_name).to.eq("Sam");
      expect(response.body.data.last_name).to.eq("Sung");
    });

    //Update user's name
    const user = {
      name: "Sam1",
      job: "QA",
    };
    cy.request("PATCH", "https://reqres.in/api/users/2", user).then(
      (response) => {
        console.log(response);
        expect(response.status).equal(200);
        expect(response.body.name).equal(user.name);
        expect(response.body.job).equal(user.job);
      }
    );

    //Stub Patch the Updated user
    cy.intercept(
      {
        method: "PATCH",
        url: "**/users/*",
      },
      {
        statusCode: 200,
        body: {
          name: "Sam1",
          job: "QA1",
          updatedAt: "2021-01-29T05:35:55.865Z",
        },
      }
    ).as("patch");

    cy.get('[data-id="patch"]').click();
    cy.wait("@patch").should(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.name).to.eq("Sam1");
      expect(response.body.job).to.eq("QA1");
    });
  });
});
