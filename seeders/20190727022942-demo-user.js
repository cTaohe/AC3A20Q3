'use strict';
const { salt } = require('../valid/salt')
const users = [{
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678'
  },{
    name: '美牙',
    email: 'user2@example.com',
    password: '12345678'
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let handledate = []
    for (let user of users){
      const saltPassword = await salt(user.password)
      handledate.push(saltPassword)
    }
    return queryInterface.bulkInsert('Users', [
      {
        name: users[0].name,
        email: users[0].email,
        password: handledate[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: users[1].name,
        email: users[1].email,
        password: handledate[1],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
