import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import * as productService from '../services/product';
import * as userService from '../services/user';
import app from '../app';

import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const TEST_USER_ID = '1';
const TEST_USER_EMAIL = 'testuser@mock.com';

let token: string;

describe('Product API', () => {
  beforeEach(() => {
    sinon.stub(userService, 'findUserByEmail').callsFake((email: string) => {
      if (email === TEST_USER_EMAIL) {
        return Promise.resolve({
          id: TEST_USER_ID,
          email: 'testuser@mock.com',
          role: 'ADMIN',
        } as any);
      }
      return Promise.resolve(null);
    });
    sinon.stub(productService, 'findAllProducts').resolves([
      {
        product_id: '1',
        name: 'Test Product 1',
        description: 'This is test product 1',
        price: 10,
        image_url: 'http://example.com/image1.jpg',
        stock_quantity: 5,
        user_id: 'user-1',
        category_name: 'Category 1',
        status: 'AVAILABLE',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: '2',
        name: 'Test Product 2',
        description: 'This is test product 2',
        price: 20,
        image_url: 'http://example.com/image2.jpg',
        stock_quantity: 3,
        user_id: 'user-2',
        category_name: 'Category 2',
        status: 'AVAILABLE',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    sinon.stub(productService, 'findProductById').callsFake((id: string) => {
      if (id === 'non-existing-id') return Promise.resolve(null);
      return Promise.resolve({
        product_id: id,
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        image_url: 'http://example.com/image.jpg',
        stock_quantity: 10,
        user_id: '123',
        category_name: 'Test Category',
        status: 'AVAILABLE',
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
    sinon.stub(productService, 'deleteProduct').resolves();
  });
  before(async () => {
    const mockPayload = {
      id: TEST_USER_ID,
      email: 'testuser@mock.com',
      role: 'ADMIN',
    };

    const options = { expiresIn: '3d' as jwt.SignOptions['expiresIn'] };
    token = jwt.sign(mockPayload, JWT_SECRET, options);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fetch all products successfully', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body.data).to.be.an('array').with.length(2);
    expect(res.body.data[0]).to.have.property('product_id', '1');
  });

  it('should fetch a single product by ID', async () => {
    const res = await request(app).get('/api/products/product-details/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body.data).to.have.property('product_id', '1');
  });

  it('should return 404 for non-existing product ID', async () => {
    const res = await request(app).get(
      '/api/products/product-details/non-existing-id'
    );
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('success', false);
  });
  it('admin should delete a product by ID', async () => {
    const res = await request(app)
      .delete('/api/products/delete/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property(
      'message',
      'Product have been deleted successfully'
    );
  });
  it('should not delete product for unauthenticated user', async () => {
    const res = await request(app).delete('/api/products/delete/1');
    expect(res.status).to.equal(401);
    expect(res.body.success).to.equal(false);
    expect(res.body.message).to.equal('You need to login to proceed');
  });
});
