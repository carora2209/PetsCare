import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { deleteCategoryCOntroller } from '../controllers/categoryController';
import categoryModel from '../models/categoryModel';

const app = express();
app.use(bodyParser.json());
app.delete('/category/:id', deleteCategoryCOntroller);

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

describe('deleteCategoryController', () => {
    it('should delete a category', async () => {
        const category = new categoryModel({ name: 'Category 1', slug: 'category-1' });
        await category.save();

        const res = await request(app).delete(`/category/${category.id}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Categry Deleted Successfully');
    });


});
