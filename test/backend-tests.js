const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your backend code is in app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('Backend API Tests', () => {
    // Test GET request to root route
    describe('GET /', () => {
        it('should return status 200', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    // Test GET request to non-existent route
    describe('GET non-existent route', () => {
        it('should return status 404', (done) => {
            chai.request(app)
                .get('/non-existent-route')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    // Test POST request to addTask route
    describe('POST /addTask', () => {
        it('should add a new task', (done) => {
            chai.request(app)
                .post('/addTask')
                .send({ task: 'Test Task' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Task added successfully');
                    expect(res.body).to.have.property('task').equal('Test Task');
                    done();
                });
        });
    });

    // Test DELETE request to deleteTask route
    describe('DELETE /deleteTask', () => {
        it('should delete the specified task', (done) => {
            chai.request(app)
                .delete('/deleteTask')
                .send({ task: 'Test Task' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Task deleted successfully');
                    expect(res.body).to.have.property('task').equal('Test Task');
                    done();
                });
        });
    });
});
