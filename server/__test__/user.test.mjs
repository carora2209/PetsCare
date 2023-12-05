//import request from 'supertest';

import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { updateProfileController } from '../controllers/authController.js';

import userModel from '../models/userModel.js';

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start()
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('updateProfileController', () => {
    it('should update the user profile', async () => {
        const req = {
            user: {
                _id: 'some-user-id',
            },
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                address: '123 Main St',
                phone: '5555555555',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        const hashPassword = jest.fn().mockResolvedValue('hashed-password');
        const findByIdMock = jest.spyOn(userModel, 'findById').mockResolvedValue({
            name: 'Jane Doe',
            password: 'old-password',
            phone: '555-555-5555',
            address: '456 Main St',
        });
        const findByIdAndUpdateMock = jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue({
            name: 'John Doe',
            password: 'hashed-password',
            phone: '555-555-5555',
            address: '123 Main St',
        });

        await updateProfileController(req, res);

        expect(findByIdMock).toHaveBeenCalledWith('some-user-id');

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            message: 'Profile Updated SUccessfully',
            updatedUser: {
                name: 'John Doe',
                password: 'hashed-password',
                phone: '555-555-5555',
                address: '123 Main St',
            },
        });
    });

});