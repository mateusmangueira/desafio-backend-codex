import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
);

UserSchema.pre('save', async function(next) {
  const password_hash = await bcrypt.hash(this.password, 10);
  this.password = password_hash;

  next();
});

export default mongoose.model('User', UserSchema);