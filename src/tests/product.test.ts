import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import * as productService from '../services/product';
import app from '../app';

describe('Product API', () => {
  beforeEach(() => {
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
});
