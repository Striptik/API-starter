
// #User Schema

const mongoose = require('mongoose');

const { Schema } = mongoose;

// #Define fields
const UserSchema = new Schema({
  email: {
    type: String, 
    required: true,
    index: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
}, {
  collection: 'users', // #Define the name of the collection
  strict: true,
  timestamps: true,
});

// #Define Methods (not with big Arrow =>)
UserSchema.methods.sayHello = function sayHello() {
  console.log(`Hello, my name is ${this.firstname}!\n`);
};

// #Define Statics Methods (not with big Arrow =>)
UserSchema.statics.getUserWithEmail = function getUserWithEmail(email, cb) {
  return this.findOne({ email }, cb);
};

UserSchema.statics.getUsersWithFirstname = function getUsersWithFirstname(firstname, cb) {
  return this.find({ firstname: new RegExp(firstname, 'i') }, cb);
};

UserSchema.statics.getUsers = function getUsers(cb) {
  return this.find({}, cb);
};

// #Virtuals (no persisting in the schema)
UserSchema.virtual('fullname')
  .get(function getFullName() { return `${this.firstname}  ${this.lastname}`; })
  .set(function setFullName(fullName) {
    this.firstname = fullName.substr(0, fullName.indexOf(' '));
    this.lastname = fullName.substr(fullName.indexOf(' ') + 1);
  });

/* 
  Can Use it to get or set firstname and lastname

  set:
  KevinL.fullname = 'Kevin Loiseleur' => KevinL.firstname = Kevin, KevinL.lastname = Loiseleur
  get:
  console.log(KevinL.fullname) // Kevin Loiseleur
*/
 

const User = mongoose.model('User', UserSchema);
module.exports = User;
