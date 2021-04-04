import mongoose from 'mongoose';

//Abstracao do Usuario do sistema no banco de dados do MongoDB, falta colocar outros atributos(se houver). Deixei apenas o atributo Nome, email e senha.
const UserSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
  },
);

export default mongoose.model('User', UserSchema);