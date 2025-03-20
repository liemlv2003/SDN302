const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Food API', () => {
    it('should GET all food items', (done) => {
        chai.request(app)
            .get('/food')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should POST a new food item', (done) => {
        chai.request(app)
            .post('/food')
            .send({ name: 'Pizza', price: 10, category: 'Main Course' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Pizza');
                done();
            });
    });

    it('should not POST food with invalid data', (done) => {
        chai.request(app)
            .post('/food')
            .send({ name: '', price: -5, category: 'Invalid' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
