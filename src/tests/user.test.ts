import { expect } from 'chai';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import sinon from 'sinon';
import app from '../app';
import * as userService from '../services/user';

describe('User API', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should register a user successfully', async () => {
    sinon.stub(userService, 'findUserByEmail').resolves(null);
    sinon.stub(userService, 'addUser').resolves({
      id: 'f7552c05-56a3-408d-a2e6-d15126ecee8f',
      username: 'testuser',
      email: 'test23@gmail.com',
      password: '',
      image_url: '',
      role: 'USER',
      status: 'ACTIVE',
      created_at: new Date(),
      updated_at: new Date(),
    });

    const res = await request(app).post('/api/users/register').send({
      username: 'testuser',
      email: 'test23@gmail.com',
      password: 'Test@1234',
      confirm_password: 'Test@1234',
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('success', true);
    expect(res.body.data).to.have.property('id');
    expect(res.body.data).to.have.property('email', 'test23@gmail.com');
  });

  it('should not register user with existing email', async () => {
    sinon.stub(userService, 'findUserByEmail').resolves({
      id: 'existing-user-id',
      username: 'testUser',
      email: 'test@gmail.com',
    } as any);

    const res = await request(app).post('/api/users/register').send({
      username: 'newuser',
      email: 'test@gmail.com',
      password: 'Test@1234',
      confirm_password: 'Test@1234',
    });

    expect(res.status).to.equal(400);
    expect(res.body.success).to.equal(false);
    expect(res.body.message).to.equal(
      'User with the provided email already exists! Please try using different email'
    );
  });
  it('should login a user successfully', async () => {
    const hashedPassword = await bcrypt.hash('Test@1234', 10);
    sinon.stub(userService, 'findUserByEmail').resolves({
      id: 'existing-user-id',
      username: 'testUser',
      email: 'test@gmail.com',
      password: hashedPassword,
    } as any);
    const res = await request(app).post('/api/users/login').send({
      email: 'test@gmail.com',
      password: 'Test@1234',
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
  });
  it('should not login with incorrect password', async () => {
    const hashedPassword = await bcrypt.hash('Test@1234', 10);
    sinon.stub(userService, 'findUserByEmail').resolves({
      id: 'existing-user-id',
      username: 'testUser',
      email: 'test@gmail.com',
      password: hashedPassword,
    } as any);
    const res = await request(app).post('/api/users/login').send({
      email: 'test@gmail.com',
      password: 'WrongPassword',
    });
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('success', false);
  });
});
