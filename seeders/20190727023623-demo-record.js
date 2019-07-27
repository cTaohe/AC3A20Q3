'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.rawSelect('Users', 
      {where: { 
          email: 'user1@example.com'
        },
      },
      ['id']
    );

    if (user) {
      return queryInterface.bulkInsert('Records', [
        {
        name: '高爾夫球球具',
        date: '2019-01-01',
        category: 'recreation',
        amount: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: user},
        {
        name: '汽車加油費用',
        date: '2019-01-05',
        category: 'traffic',
        amount: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: user},
        {
        name: '午餐費',
        date: '2019-03-15',
        category: 'food',
        amount: 85,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: user},
        {
        name: '應酬',
        date: '2019-02-04',
        category: 'food',
        amount: 999,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: user}
      ], {});
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Records', null, {});
  }
};