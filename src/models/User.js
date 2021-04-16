import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide your email.'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minlength: 8
    },
    token: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
);

UserSchema.virtual('tasks', {
  ref: 'Task',
  foreignField: 'user',
  localField: '_id'
});

UserSchema.pre('save', async function(next) {
  const password_hash = await bcrypt.hash(this.password, 10);
  this.password = password_hash;

  next();
});

export default mongoose.model('User', UserSchema);