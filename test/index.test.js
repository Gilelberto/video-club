const supertest = require('supertest');
const app = require('../app'); //contiene la aplicación servidor realmente

describe("Test the auth system", () => {
    it("Should get an user and password from login", (done) =>{
        const data = {
            email: "a348503@uach.mx",
            password: "abcd1234",
        }
        const response = supertest(app).post('/login').send(data)
        .expect(200)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            done();
          }  
        });
    });
});