describe("API Testing", () => {
  before(() => {
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      if (expect(response.body.data).to.not.be.null) {
        cy.request("DELETE", "https://reqres.in/api/users/2").then(
          (response) => {
            expect(response.status).equal(204);
          }
        );
      }
    });
  });

  it("GET,POST,PATCH,DELETE", () => {

    //Create a new user
    const newuser = {
      name: "morpheus",
      job: "QA",
    };
    cy.request("POST", "https://reqres.in/api/users", newuser).then(
      (response) => {
        expect(response.status).equal(201);
        expect(response.body.name).equal(newuser.name);
        expect(response.body.job).equal(newuser.job);
      }
    );

    //Get a single user
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      expect(response.status).equal(200);
      expect(response.body.data.first_name).equal("Janet");
      expect(response.body.data.last_name).equal("Weaver");
    });


    //Update user's name
    const user = {
      name: "Sam",
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


    //Confirm user's info whether correct
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      console.log(response);
      expect(response.status).equal(200);
      expect(response.body.data.first_name).equal("Janet");
      expect(response.body.data.last_name).equal("Weaver");
    });
  });

});
