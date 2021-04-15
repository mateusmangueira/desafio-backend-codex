import mongoose from 'mongoose';
import User from '../models/User';
import Task from '../models/Task';

const models = [User, Task];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const DB = process.env.DATABASE || 'mongodb+srv://mateus:123321@backend-desafio-codex.doriq.mongodb.net/backend-desafio?retryWrites=true&w=majority';
    this.mongoConnection = mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default new Database();