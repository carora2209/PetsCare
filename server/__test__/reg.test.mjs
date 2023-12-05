import request from 'supertest';
import express from 'express';
import { registerController } from '../controllers/authController';
import { loginController } from '../controllers/authController';

const app = express();
app.use(express.json());

app.post('/register', registerController);

describe('POST /register', () => {
    it('should validate request body', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                name: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                answer: ''
            });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Name is Required');

    });
});


app.post('/login', loginController);

describe('POST /login', () => {
    it('should validate request body', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: '',
                password: ''
            });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Invalid email or password');

    });
});




