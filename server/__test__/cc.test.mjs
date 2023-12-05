import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import FormData from 'form-data';

import { createProductController } from '../controllers/productController';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.post('/product', createProductController);

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

describe('createProductController', () => {
    it('should create a new product', async () => {
      const productData = new FormData();
      
      const res = await request(app)
      .post('/product',productData);

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });


    it('should not create a product if required fields are not provided', async () => {
        const res = await request(app)
            .post('/product')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Error in creating product');
    });

    it('should not create a product if photo size is more than 1mb', async () => {
        const res = await request(app)
            .post('/product')
            .field('name', 'New Product')
            .field('description', 'This is a new product')
            .field('price', '100')
            .field('category', 'New Category')
            .field('quantity', '10')
            .attach('photo', fs.readFileSync(path.join('', './large.jpg')), 'large.jpg');

        expect(res.status).toBe(400);
    });

});
