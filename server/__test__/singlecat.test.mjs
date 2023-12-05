import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { singleCategoryController } from '../controllers/categoryController';
import categoryModel from '../models/categoryModel';
const app = express();
app.use(bodyParser.json());
app.get('/category1/:slug', singleCategoryController);

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start()
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('singleCategoryController', () => {
  it('should get a single category', async () => {
    const category = new categoryModel({ name: 'Category 1', slug: 'category-1' });
    await category.save();

    const res = await request(app).get(`/category1/${category.slug}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.category.name).toBe('Category 1');
    expect(res.body.category.slug).toBe('category-1');
  });


});
