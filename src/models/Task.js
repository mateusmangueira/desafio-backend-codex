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
      trim: true,
      validate: {
        validator: function(val) {
          return val.toLowerCase() === 'alta' || val.toLowerCase() === 'baixa';
        },
        message: 'A task must be "Alta" or "Baixa"'
      }
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

TaskSchema.pre('save', function(next) {
  if(this.priority.toLowerCase() === "baixa") {
    this.priority = 'Baixa';
  }
  else {
    this.priority = 'Alta';
  }

  next();
});

export default mongoose.model('Task', TaskSchema);