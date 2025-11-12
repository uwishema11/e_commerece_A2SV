import { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import * as orderService from '../services/order';
import * as userService from '../services/user';
import app from '../app';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const TEST_USER_ID = '1';
const TEST_USER_EMAIL = 'testuser@mock.com';

let token: string;

describe('Order API', () => {
  sinon.stub(userService, 'findUserByEmail').callsFake((email: string) => {
    if (email === TEST_USER_EMAIL) {
      return Promise.resolve({
        id: TEST_USER_ID,
        email: 'testuser@mock.com',
        role: 'USER',
      } as any);
    }
    return Promise.resolve(null);
  });
  beforeEach(() => {
    sinon.stub(orderService, 'getUserOrders').resolves([
      {
        order_id: '1',
        user_id: TEST_USER_ID,
        total_amount: 20,
        status: 'PENDING',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    sinon.stub(orderService, 'getOrderById').callsFake((id: string) => {
      if (id === 'non-existing-id') return Promise.resolve(null);
      return Promise.resolve({
        order_id: id,
        user_id: TEST_USER_ID,
        product_id: 'product-1',
        quantity: 2,
        total_amount: 30,
        total_price: 20,
        status: 'PENDING',
        created_at: new Date(),
        updated_at: new Date(),
      } as any);
    });
  });
  before(async () => {
    const mockPayload = {
      id: TEST_USER_ID,
      email: 'testuser@mock.com',
      role: 'USER',
    };

    const options = { expiresIn: '3d' as jwt.SignOptions['expiresIn'] };
    token = jwt.sign(mockPayload, JWT_SECRET, options);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should retrieve user orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.message).to.equal('Orders retrieved successfully');
  });
  it('should not retrieve orders for unauthenticated user', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.status).to.equal(401);
    expect(res.body.success).to.equal(false);
    expect(res.body.message).to.equal('You need to login to proceed');
  });
});
