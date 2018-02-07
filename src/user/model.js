
// #User Schema
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const logger = require('../Services/logger');

const SALT_FACTOR = 10;
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
  auth: {
    hash: {
      type: String,
    },
    reset: {
      type: String,
    },
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

UserSchema.methods.setPassword = function setPass(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) {
        logger.error('Error in setting password, when generating salt', {
          password,
          err,
          salt,
          tags: ['setPassword', 'bcryptError', 'genSalt'],
        });
        return reject({ err, data: null });
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          logger.error('Error in setting password, when  hashing password', {
            password,
            err,
            hash,
            tags: ['setPassword', 'bcryptError', 'hashPassword'],
          });
          return reject({ err, data: null });
        }
        return resolve({ err: null, data: hash });
      });
    });
  });
};

UserSchema.methods.checkPassword = function checkPass(password) {
  return new Promise((resolve, reject) => {
    console.log(this.auth.hash, '2');
    bcrypt.compare(password, this.auth.hash, (err, data) => {
      if (err) {
        return reject({ data: null, err });
      }
      console.log('data', data);
      if (data === false) {
        return reject({ data: null, err: false });
      }
      return resolve({ data, err: null });
    });
  });
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
