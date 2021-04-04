import mongoose from 'mongoose';

//Abstracao das Tarefas do sistema no banco de dados do MongoDB, falta colocar outros atributos(se houver). Deixei apenas o atributo Nome.
const TaskSchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
},
{
   toJSON: {
       virtuals:true,
   }
  },
);

export default mongoose.model('Task', TaskSchema);