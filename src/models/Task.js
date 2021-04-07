import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A task must have a name'],
      trim: true
    },
    priority: {
      type: String,
      default: 'Baixa',
      enum: ['Alta', 'Baixa']
    },
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