import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'
import { response } from 'express';


let token;

describe('Test my app server', () => { //fazer beforeall para logar
    beforeAll((done) => {
        request(app)
        .post('/sessions')
        .send({
            email: 'usertest1@gmail.com',
            password: '12345678',
        })
        .end((err, res) =>{
            token = res.body.token;
            done();
        });

    });

    it('should GET all tasks', async () => {
        const res = await request(app).get('/tasks')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('sucess')
        expect(res.body.results).toBe(res.body.data.tasks.length)
        res.body.data.tasks.forEach(task => {
            expect(task).toHaveProperty('name', 'priority', '_id', 'id')
        });

    });

    it('should POST a task', async () => {
        const res = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "teste task 1",
            priority: "Alta"
        })
        expect(res.body.status).toBe('sucess')
        });

    afterAll(async () => { 
        await mongoose.connection.close()
      });

});