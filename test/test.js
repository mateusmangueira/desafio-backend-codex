import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

let token;
let task;

describe('Test my app server', () => {
    beforeAll((done) => {
        request(app)
        .post('/sessions')
        .send({
            email: 'usertest1@gmail.com',
            password: '12345678',
        })
        .end((err, res) => {
            token = res.body.token;
            done();
        })
        
    });

<<<<<<< HEAD
    it('should GET user tasks', async () => {
=======
    it('should GET user tasks', async () => { //TA TUDO CERTO DE GET
>>>>>>> b18ae57ba194d4c84e3347d854a86df4c63c5d5f
        const res = await request(app).get('/tasks')
        .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.status).toBe('sucess')
        expect(res.body.results).toBe(res.body.data.tasks.length)
        res.body.data.tasks.forEach(task => {
            expect(task).toHaveProperty('name', 'user', 'priority', '_id', 'id')
        });

    });

    it('should POST a task', async () => { 
        const res = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "teste task 1",
            priority: "Alta",
        })
        task = res.body.data.task;
        expect(res.status).toBe(201)
        expect(res.body.status).toBe('sucess')
        expect(res.body.data.task).toHaveProperty('priority', '_id', 'name', 'user', '__v', 'id')
    });

    it('should not POST a task whithout name', async () => {
        const res = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        expect(res.status).toBe(400)
        expect(res.body.status).toBe('fail')
        expect(res.body.message).toBe('Task validation failed: name: A task must have a name')
    });

    it('should not POST a taks with priority different than "Alta" or "Baixa"', async () => {
        const res = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'test create taks',
            priority: 'media'
        })
        expect(res.status).toBe(400)
        expect(res.body.status).toBe('fail')
        expect(res.body.message).toBe('Task validation failed: priority: A task must be "Alta" or "Baixa"')
    });

    it('should UPDATE a task', async () => {
        const res = await request(app).put(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "novo nome",
        })
        expect(res.status).toBe(200)
        expect(res.body.status).toBe('success')
        expect(res.body.data.task).toHaveProperty('priority', '_id', 'name', 'user', '__v', 'id')
    });

    it('should not UPDATE a task if try to change priority', async () => {
        const res = await request(app).put(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            priority: "baixa",
        })
        expect(res.status).toBe(400)
        expect(res.body.status).toBe('fail')
        expect(res.body.message).toBe('Priority cannot change')
    });

    it('should DELETE a task', async () => {
        const res = await request(app).delete(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(204)
    });

    afterAll(async () => { 
        await mongoose.connection.close()
      });

});