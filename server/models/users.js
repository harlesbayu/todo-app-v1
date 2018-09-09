const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:   {
    type: String,
  },
  gender: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address : {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  todoList: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User