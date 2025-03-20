// Write a unit test for GET /users API using Mocha and Chai.
// The test should check if the response is an array and the array contains the user objects.   
// You can use the following code snippet to start writing the test:    
const chai = require("chai");
const chaiHttp = require("chai-http");       
const app = require("../server");
const expect = chai.expect;  
chai.use(chaiHttp);
describe("GET /users", () => {   
  it("should return an array of users", (done) => {
    chai.request(app)    
      .get("/users")
      .end((err, res) => {   
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");  
        done();
      });    
  });
});  

