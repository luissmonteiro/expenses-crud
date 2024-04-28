const request = require('supertest');
const chai = require('chai');
const app = require('../../server'); // Import your Express app
const User = require('../../src/models/user');
const Expense = require('../../src/models/user');

const { expect } = chai;

let token;
let user;
let expense;
const userEmail = 'testuser35@email.com';

describe('POST /signup', () => {
    it('should create a new user and return it', async () => {

        const res = await request(app)
            .post('/auth/signup')
            .send({
                email: userEmail,
                password: 'testpassword'
            });

        expect(res.status).to.equal(201);
    });
    
});

describe('POST /login', () => {
        it('should return a token and the user', async () => {
                const res = await request(app)
                .post('/auth/login')
                .send({
                        email: userEmail,
                        password: 'testpassword'});
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('token');
                token = res.body.token;
                user = res.body.user;
        });
});

describe('POST /create', () => {
        it('should create a new expense and return it', async () => {
                const res = await request(app)
                .post('/api/create')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        description: 'test description',
                        value: 10,
                        date: '01/01/2022'
                });
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('description', 'test description');
                expect(res.body).to.have.property('value', 10);
                expense = res.body;
        });
});

describe('GET /list', () => {
    it('should return a list of expenses', async () => {
        const res = await request(app)
            .get('/api/list')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property('description');
        expect(res.body[0]).to.have.property('value');
        expect(res.body[0]).to.have.property('date');
    });});

    describe('GET /getExpense/:id', () => {
        it('should return a specific expense', async () => {
            const res = await request(app)
                .get(`/api/get/${expense._id}`)
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('description', 'test description');
            expect(res.body).to.have.property('value', 10);
        });
    });


describe('PUT /update/:id', () => {
    it('should update an expense', async () => {
        const updatedDescription = 'updated test description';
        const updatedValue = 20;
        const updatedDate = '02/01/2022';

        const res = await request(app)
            .put(`/api/update/${expense._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                description: updatedDescription,
                value: updatedValue,
                date: updatedDate
            });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('description', updatedDescription);
        expect(res.body).to.have.property('value', updatedValue);
    });
});



describe('DELETE /delete', async () => {
    it('should delete an expense', async () => {
        const res = await request(app)
                .delete(`/api/delete/${expense._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'test description'
                });
        
        await User.deleteOne({ email: userEmail });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Expense deleted!');
    });

   
})

