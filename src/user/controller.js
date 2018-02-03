const logger = require('../Services/logger');
const hash = require('../Services/hash');
const User = require('./model');

/**
 * Create New Entity User in the database
 * @param {*} email 
 * @param {*} password 
 * @param {*} firstname 
 * @param {*} lastname 
 * @return Promise ({err, message, data})
 */
const newUser = (({ email, password, firstname, lastname }) =>
  new Promise((resolve, reject) => {
    // #Maybe unash some variables;

    // #Check definition of every variables
    if (typeof email !== 'string' || typeof password !== 'string' ||
      typeof firstname !== 'string' || typeof lastname !== 'string') {
      logger.error('Some informations are missings to create new user.', {
        email,
        firstname,
        lastname,
        password,
        tags: ['user', 'createUser', 'create', 'validation'],
      });
      return reject({
        message: 'Some data to create user are missing',
        err: true,
        data: null,
      });
    }

    // Validate the variables provided
    // Email : regexp email 
    // Password : unhash and check size, minCharacter ..
    // firstname : only alphabetics
    // lastname : only alphabetics


    // Use static assignation to control all the properties added
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.save((err, user) => {
      if (err) {
        logger.error({
          newUser,
          err,
          user,
          tags: ['user', 'createUser', 'create', 'mongo'],
        });
        return reject({
          message: 'Error during mongoose save',
          err,
          data: null
        });
      }

      logger.info('User created', {
        user
      });
      return resolve({
        error: null,
        data: user,
        message: 'User created',
      });
    });
  })
);

/**
 *  get User by 'key' field
 * @param {*} key 
 * @param {*} value 
 * @return Promise ({err, message, data})
 */
const getUserBy = ((key, value) =>
  new Promise((resolve, reject) => {
    // #static methods in model

    if (key === 'email') {
      User.getUserWithEmail(value, (err, user) => {
        // #Error
        if (err) {
          logger.error('Error during finding a user by mail', {
            err,
            user,
            value,
            tags: ['user', 'getUserByMail', 'get/find', 'mongo'],
          });
          return reject({
            err: new Error(err),
            data: user,
            message: 'Error  when trying to find a user by mail',
          });
        }
        // #User
        return resolve({
          data: user,
          message: 'User get by mail',
          error: null,
        });
      });
    }

    // #Other keys
    // #Create qwery to find
    const findObject = {};
    findObject[key] = value;
    User.find(findObject, (err, user) => {
      // #Error
      if (err) {
        logger.error(`Erro when tryong to findUser by '${key}'`, {
          err,
          user,
          key,
          value,
          tags: ['user', 'getUserBy', 'get/find', 'mongoose'],
        });
        return reject({
          err,
          data: user,
          message: `Error when try to retrieve user by ${key}`,
        });
      }
      return resolve({
        data: user,
        message: `User get by ${key}`,
        error: null,
      });
    });
  })
);


module.exports = {
  newUser,
  getUserBy,
};
