const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sinon = require("sinon");
const chai = require("chai");
require("dotenv/config");
const { signup, login, isSignedIn, JWT_SECRET } = require('../../../src/controllers/authController');
const User = require('../../../src/models/user');
const {expressjwt} = require('express-jwt');

describe('authController', () => {
    describe('signup', () => {
        it('should create a new user and return it', async () => {
          const req = { body: { email: 'testuser@email.com', password: 'testpassword' } };
          const res = {
            end: function(){},
            status: function(s) {this.statusCode = s;
                this.json = (message) => {this.json = message; return this;};
                  return this;}
        };
      
          const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'hashedPassword' };
      
          const create = sinon.stub(User, 'create').resolves(mockUser);
          const find = sinon.stub(User, 'findOne').returns(false);
      
          await signup(req, res);
      
          sinon.assert.match(res.json, { message: 'New user created!' });
      
          create.restore();
          find.restore();
        });
      });


      describe('signup without password', () => {
        it('should return error message', async () => {
          const req = { body: { email: 'testuser@email.com', password: '' } };
          const res = {
            end: function(){},
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;}
        };
          await signup(req, res);
          sinon.assert.match(res.json, { message: 'Missing required fields' });
        });
      });



    describe('login', () => {
        it('should generate a JWT token and return it', async () => {
            const req = { body: { email: 'testuser@email.com', password: 'testpassword' } };
            const res = { json: sinon.spy()};
            

            const hashedPassword = await bcrypt.hash('testpassword', 10);
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: hashedPassword };

            const find = sinon.stub(User, 'findOne').returns(mockUser);
            
            generateToken = jwt.sign({ userId: 'userId' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            
            await login(req, res);
            sinon.assert.calledWith(res.json, sinon.match({user: mockUser, token: generateToken}));

            find.restore();
            
        });
    });

    describe('login with wrong credentials', () => {
        it('should return error', async () => {
            const req = { body: { email: 'testuser@email.com', password: 'testpassword' } };
            const res = {
                end: function(){},
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;}
            };
            

            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: '123' };

            const find = sinon.stub(User, 'findOne').returns(mockUser);
            
            await login(req, res);
            sinon.assert.match(res.json, {message: 'Invalid Credentials'});

            find.restore();
            
        });
    });

});