const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:   {
    type: String,
    required: [true,'name is required']
  },
  gender: {
    type: String,
    required: [true, 'gender is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'phone number is required']
  },
  address : {
    type: String,
    required: [true, 'address number is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email already exist']
  },
  password: {
    type: String,
    required: [true, 'password number is required']
  },
  todoList: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User