'use strict';

const bcrypt = require('bcryptjs')
const user = {
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678'
}

const useBcrypt = new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (salt) return resolve(salt)
    return reject(err)
  })
})

const saltPassword = salt => {
  return new Promise( (resolve, reject) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (hash) return resolve(hash)
      return reject(err)
    })
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await useBcrypt
    const password = await saltPassword(salt)

    return queryInterface.bulkInsert('Users', [
      {
        name: user.name,
        email: user.email,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
