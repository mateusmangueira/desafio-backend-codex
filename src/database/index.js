import mongoose from 'mongoose';
import User from '../models/User';
import Task from '../models/Task';

//Colocar os Models da aplicacao nessa parte

const models = [User, Task]; //Adicionar o model criado nesse array

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
    const DB = process.env.DATABASE;
    this.mongoConnection = mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default new Database();