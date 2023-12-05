import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { createCategoryController } from '../controllers/categoryController';
import categoryModel from '../models/categoryModel';
const app = express();
app.use(bodyParser.json());
app.post('/category', createCategoryController);

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

describe('createCategoryController', () => {
    it('should create a new category', async () => {
        const res = await request(app)
            .post('/category')
            .send({ name: 'New Category' });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.category.name).toBe('New Category');
        expect(res.body.category.slug).toBe('new-category');
    });

    it('should not create a category if name is not provided', async () => {
        const res = await request(app)
            .post('/category')
            .send({});

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Name is required');
    });

    it('should not create a category if it already exists', async () => {
        const category = new categoryModel({ name: 'Existing Category', slug: 'existing-category' });
        await category.save();

        const res = await request(app)
            .post('/category')
            .send({ name: 'Existing Category' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Category Already Exists');
    });


});
