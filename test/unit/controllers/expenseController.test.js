const { expect } = require('chai');
const sinon = require('sinon');
const Expense = require('../../../src/models/expense.js');
const User = require('../../../src/models/user');
const { createExpense, listExpenses, getEspecificExpense, updateExpense, deleteExpense } = require('../../../src/controllers/expenseController');

describe('createExpense', () => {

describe('correct expense creation', () => {
    it('should create a new expense', async () => {
        const req = {
            auth: {
                userId: 'userId',
            },
            body: {
                "description": "Test expense",
                "value": 100,
                "date": "01/01/2022"
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        };

        const create = sinon.stub(Expense, 'create').resolves(req);
        const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
        const find = sinon.stub(User, 'findOne').returns(mockUser);

        await createExpense(req, res);

        sinon.assert.match(res.json.body, req.body);

        create.restore();
        find.restore();
    });})

    describe('userId doesnt exist', () => {
    it('should return error message', async () => {
        const req = {
            auth: {
                userId: '123',
            },
            body: {
                "description": "Test expense",
                "value": 1,
                "date": "01/01/2022"
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }
        const find = sinon.stub(User, 'findOne').returns(null);

        await createExpense(req, res);

        sinon.assert.match(res.json, { message: 'User not found' });

        find.restore();
    });})

    describe('negative expense value', () => {
    it('should return "invalid value" message', async () => {
        const req = {
            auth: {
                userId: 'userId',
            },
            body: {
                "description": "Test expense",
                "value": -1,
                "date": "01/01/2022"
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }

        const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
        const find = sinon.stub(User, 'findOne').returns(mockUser);

        await createExpense(req, res);

        sinon.assert.match(res.json, { message: 'Invalid value' });

        find.restore();
    });})

    describe('wrong type expense value', () => {
    it('should return "invalid value" message', async () => {
        const req = {
            auth: {
                userId: 'userId',
            },
            body: {
                "description": "Test expense",
                "value": "100",
                "date": "01/01/2022"
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }

        const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
        const find = sinon.stub(User, 'findOne').returns(mockUser);

        await createExpense(req, res);

        sinon.assert.match(res.json, { message: 'Invalid value' });

        find.restore();
    });})

    describe('description length > 191', () => {
    it('should return description error message', async () => {
        const req = {
            auth: {
                userId: 'userId',
            },
            body: {
                "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
                "value": 100,
                "date": "01/01/2022"
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }

        const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
        const find = sinon.stub(User, 'findOne').returns(mockUser);

        await createExpense(req, res);

        sinon.assert.match(res.json, { message: 'Description must the maximum of 191 chacacters' });

        find.restore();
    });});

    describe('description length == 191', () => {
    it('should create expense', async () => {
            const req = {
                auth: {
                    userId: 'userId',
                },
                body: {
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    "value": 100,
                    "date": "01/01/2022"
                },
            };
            const res = {
                json: sinon.spy(),
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
            }
            const create = sinon.stub(Expense, 'create').resolves(req);
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
            const find = sinon.stub(User, 'findOne').returns(mockUser);
    
            await createExpense(req, res);
    
            sinon.assert.match(res.json.body, req.body);
    
            find.restore();
            create.restore();
    });
    });

    describe('date in the future', () => {
        it('should return date error message', async () => {
            const req = {
                auth: {
                    userId: 'userId',
                },
                body: {
                    "description": "Test expense",
                    "value": 100,
                    "date": "01/01/2025"
                },
            };
            const res = {
                json: sinon.spy(),
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
            }
    
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
            const find = sinon.stub(User, 'findOne').returns(mockUser);
    
            await createExpense(req, res);
    
            sinon.assert.match(res.json, { message: 'Invalid date' });
    
            find.restore();
        });});
    

    describe('wrong date', () => {
        it('should return date error message', async () => {
            const req = {
                auth: {
                    userId: 'userId',
                },
                body: {
                    "description": "Test expense",
                    "value": 100,
                    "date": "Test"
                },
            };
            const res = {
                json: sinon.spy(),
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
            }
    
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
            const find = sinon.stub(User, 'findOne').returns(mockUser);
    
            await createExpense(req, res);
    
            sinon.assert.match(res.json, { message: 'Invalid date' });
    
            find.restore();
        });});
    });


describe('listExpenses', () => {

describe('correct listExpenses call', () => {
    it('should return expenses array', async () => {
        const req = {
            auth: {
                userId: 'userId',
            },
            body: {},
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        };

        const mockExpenses = [ { description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId' },
        { description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId' } ];
        const create = sinon.stub(Expense, 'find').resolves(mockExpenses);
        const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
        const find = sinon.stub(User, 'findOne').returns(mockUser);

        await listExpenses(req, res);

        sinon.assert.match(res.json, mockExpenses);

        create.restore();
        find.restore();
    });})

describe('call listExpenses without userId', () => {
    it('should return error message', async () => {
        const req = {
            auth: {
            },
            body: {
                "description": "Test expense",
                "value": 1,
                "date": "01/01/2022"
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }
        const find = sinon.stub(User, 'findOne').returns(null);

        await listExpenses(req, res);

        sinon.assert.match(res.json, { message: 'User not found' });

        find.restore();
    });})


});

describe('getEspecificExpense', () => {
    describe('correct getEspecificExpense call', () => {
        it('should return expense', async () => {
            const req = {
                auth: {
                    userId: 'userId',
                },
                params: {
                    id: 'testExpenseId'
                },
            };
            const res = {
                json: sinon.spy(),
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
            };
    
            const mockExpense = { id:'testExpenseId', description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId' };
            const create = sinon.stub(Expense, 'findOne').resolves(mockExpense);
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
            const find = sinon.stub(User, 'findOne').returns(mockUser);
    
            await getEspecificExpense(req, res);
    
            sinon.assert.match(res.json, mockExpense);
    
            create.restore();
            find.restore();
        });})

        
        describe('call getEspecificExpense without userId', () => {
            it('should return error message', async () => {
                const req = {
                    auth: {
                    },
                    params: {
                        id: 'testExpenseId'
                    },
                };
                const res = {
                    json: sinon.spy(),
                    status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                }
                const find = sinon.stub(User, 'findOne').returns(null);
        
                await getEspecificExpense(req, res);
        
                sinon.assert.match(res.json, { message: 'User not found' });
        
                find.restore();
            });})
        
        describe('call getEspecificExpense with other userId', () => {
            it('should return error message', async () => {
                const req = {
                    auth: {
                        userId: '662bb9cdf9adf0eb8f936099' //does not exist
                    },
                    params: {
                        id: 'testExpenseId'
                    },
                };
                const res = {
                    json: sinon.spy(),
                    status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                }

                const create = sinon.stub(Expense, 'findOne').resolves(null);
                const mockUser = { _id: '662bb9cdf9adf0eb8f936099', email: 'testuser@email.com', password: 'testpassword' };
                const find = sinon.stub(User, 'findOne').returns(mockUser);
        
                await getEspecificExpense(req, res);
        
                sinon.assert.match(res.json, { message: 'Expense not found' });
        
                create.restore();
                find.restore();
            });})
});


describe('updateExpense', () => {
    describe('correct updateExpense call', () => {
        it('should return the updated expense', async () => {
            const req = {
                auth: {
                    userId: 'userId',
                },
                "params": {
                    id: "testExpenseId"
                },
                body: {
                    description: 'Test update expense',
                    date: "01/01/2022",
                    value: 100
                },
            };
            const res = {
                json: sinon.spy(),
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
};
    
            const mockExpense = { id:'testExpenseId', description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId' };
            const mockUpdatedExpense = { id:'testExpenseId', description: 'Test expense', value: 300, date: '30/01/2022', user: 'userId' };
            const findExpense = sinon.stub(Expense, 'findOne').resolves(mockExpense);
            const update = sinon.stub(Expense, 'findOneAndUpdate').resolves(mockUpdatedExpense);
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
            const find = sinon.stub(User, 'findOne').returns(mockUser);
    
            await updateExpense(req, res);
    
            sinon.assert.match(res.json, mockUpdatedExpense);
    
            update.restore();
            find.restore();
            findExpense.restore();
            
        });})

        describe('userId doesnt exist', () => {
            it('should return error message', async () => {
                const req = {
                    auth: {
                        userId: '123',
                    },
                    params: {
                        id: 'testExpenseId'
                    },
                    body: {
                        "description": "Test expense",
                        "value": 1,
                        "date": "01/01/2022"
                    },
                };
                const res = {
                    json: sinon.spy(),
                    status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                }
                const find = sinon.stub(User, 'findOne').returns(null);
        
                await updateExpense(req, res);
        
                sinon.assert.match(res.json, { message: 'User not found' });
        
                find.restore();
            });})
        
            describe('negative expense value', () => {
            it('should return "invalid value" message', async () => {
                const req = {
                    auth: {
                        userId: 'userId',
                    },
                    params: {
                        id: 'testExpenseId'
                    },
                    body: {
                        "description": "Test expense",
                        "value": -1,
                        "date": "01/01/2022"
                    },
                };
                const res = {
                    json: sinon.spy(),
                    status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                }
        
                const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
                const find = sinon.stub(User, 'findOne').returns(mockUser);
        
                await updateExpense(req, res);
        
                sinon.assert.match(res.json, { message: 'Invalid value' });
        
                find.restore();
            });})
        
            describe('wrong type expense value', () => {
            it('should return "invalid value" message', async () => {
                const req = {
                    auth: {
                        userId: 'userId',
                    },
                    params: {
                        id: 'testExpenseId'
                    },
                    body: {
                        "description": "Test expense",
                        "value": "100",
                        "date": "01/01/2022"
                    },
                };
                const res = {
                    json: sinon.spy(),
                    status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                }
        
                const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
                const find = sinon.stub(User, 'findOne').returns(mockUser);
        
                await updateExpense(req, res);
        
                sinon.assert.match(res.json, { message: 'Invalid value' });
        
                find.restore();
            });})
        
            describe('description length > 191', () => {
            it('should return description error message', async () => {
                const req = {
                    auth: {
                        userId: 'userId',
                    },
                    params: {
                        id: 'testExpenseId'
                    },
                    body: {
                        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
                        "value": 100,
                        "date": "01/01/2022"
                    },
                };
                const res = {
                    json: sinon.spy(),
                    status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                }
        
                const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
                const find = sinon.stub(User, 'findOne').returns(mockUser);
        
                await updateExpense(req, res);
        
                sinon.assert.match(res.json, { message: 'Description must the maximum of 191 chacacters' });
        
                find.restore();
            });});
        
            describe('description length == 191', () => {
            it('should create expense', async () => {
                    const req = {
                        auth: {
                            userId: 'userId',
                        },
                        params: {
                            id: 'testExpenseId'
                        },
                        body: {
                            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                            "value": 100,
                            "date": "01/01/2022"
                        },
                    };
                    const res = {
                        json: sinon.spy(),
                        status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                    }
                    const mockExpense = { id:'testExpenseId', description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId' };
                    const mockUpdatedExpense = { id:'testExpenseId', "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                     value: 300, date: '30/01/2022', user: 'userId' };
                    const findExpense = sinon.stub(Expense, 'findOne').resolves(mockExpense);
                    const update = sinon.stub(Expense, 'findOneAndUpdate').resolves(mockUpdatedExpense);
                    const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
                    const find = sinon.stub(User, 'findOne').returns(mockUser);
            
                    await updateExpense(req, res);
            
                    sinon.assert.match(res.json, mockUpdatedExpense);
            
                    find.restore();
                    findExpense.restore();
                    update.restore();
            });
            });
        
            describe('date in the future', () => {
                it('should return date error message', async () => {
                    const req = {
                        auth: {
                            userId: 'userId',
                        },
                        params: {
                            id: 'testExpenseId'
                        },
                        body: {
                            "description": "Test expense",
                            "value": 100,
                            "date": "01/01/2025"
                        },
                    };
                    const res = {
                        json: sinon.spy(),
                        status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                    }
            
                    const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
                    const find = sinon.stub(User, 'findOne').returns(mockUser);
            
                    await updateExpense(req, res);
            
                    sinon.assert.match(res.json, { message: 'Invalid date' });
            
                    find.restore();
                });});
            
        
            describe('wrong date', () => {
                it('should return date error message', async () => {
                    const req = {
                        auth: {
                            userId: 'userId',
                        },
                        params: {
                            id: 'testExpenseId'
                        },
                        body: {
                            "description": "Test expense",
                            "value": 100,
                            "date": "Test"
                        },
                    };
                    const res = {
                        json: sinon.spy(),
                        status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                    }
            
                    const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
                    const find = sinon.stub(User, 'findOne').returns(mockUser);
            
                    await updateExpense(req, res);
            
                    sinon.assert.match(res.json, { message: 'Invalid date' });
            
                    find.restore();
                });});

                describe('update expense from other user', () => {
                    it('should return error message', async () => {
                        const req = {
                            auth: {
                                userId: '662bb9cdf9adf0eb8f936099' //does not exist
                            },
                            params: {
                                id: 'testExpenseId'
                            },body: {
                                "description": "Test expense",
                                "value": 100,
                                "date": "01/01/2024"
                            },
                        };
                        const res = {
                            json: sinon.spy(),
                            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
                        }
                
                        const create = sinon.stub(Expense, 'findOne').resolves(null);
                        const mockUser = { _id: '662bb9cdf9adf0eb8f936099', email: 'testuser@email.com', password: 'testpassword' };
                        const find = sinon.stub(User, 'findOne').returns(mockUser);
                        const update = sinon.stub(Expense, 'findOneAndUpdate').resolves(null);
                
                        await updateExpense(req, res);
                
                        sinon.assert.match(res.json, { message: 'Expense not found' });
                
                        create.restore();
                        find.restore();
                        update.restore();
                    });
                });

});

describe('deleteExpense', () => {

describe('correct updateExpense call', () => {
        it('should return the updated expense', async () => {
            const req = {
                auth: {
                    userId: 'userId',
                },
                params: {
                    id: "testExpenseId"
                },
                body: {
                    description: 'Test delete expense',
                    date: "01/01/2022",
                    value: 100
                },
            };
            const res = {
                json: sinon.spy(),
                status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
};
    
            const mockExpense = { id:'testExpenseId', description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId', deleted: false};
            const mockUpdatedExpense = { id:'testExpenseId', description: 'Test expense', value: 100, date: '01/01/2022', user: 'userId', deleted: true};
            const findExpense = sinon.stub(Expense, 'findOne').resolves(mockExpense);
            const update = sinon.stub(Expense, 'findOneAndUpdate').resolves(mockUpdatedExpense);
            const mockUser = { _id: 'userId', email: 'testuser@email.com', password: 'testpassword' };
            const find = sinon.stub(User, 'findOne').returns(mockUser);
    
            await deleteExpense(req, res);
    
            sinon.assert.match(res.json, {message: 'Expense deleted!'});
    
            update.restore();
            find.restore();
            findExpense.restore();
            
        });})

describe('delete expense from other user', () => {
    it('should return error message', async () => {
        const req = {
            auth: {
                userId: '662bb9cdf9adf0eb8f936099' //does not exist
            },
            params: {
                id: 'testExpenseId'
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }

        const create = sinon.stub(Expense, 'findOne').resolves(null);
        const mockUser = { _id: '662bb9cdf9adf0eb8f936099', email: 'testuser@email.com', password: 'testpassword' };
        const find = sinon.stub(User, 'findOne').returns(mockUser);
        const update = sinon.stub(Expense, 'findOneAndUpdate').resolves(null);

        await deleteExpense(req, res);

        sinon.assert.match(res.json, { message: 'Expense not found' });

        create.restore();
        find.restore();
    });
});

describe('delete expense without valid user', () => {
    it('should return error message', async () => {
        const req = {
            auth: {
                userId: '662bb9cdf9adf0eb8f936099' //does not exist
            },
            params: {
                id: 'testExpenseId'
            },
        };
        const res = {
            json: sinon.spy(),
            status: function(s) {this.statusCode = s;this.json = (message) => {this.json = message; return this;};  return this;},
        }
        const find = sinon.stub(User, 'findOne').returns(null);

        await deleteExpense(req, res);

        sinon.assert.match(res.json, { message: 'User not found' });

        find.restore();
    });
});



});
