'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const user1 = await queryInterface.rawSelect('Users', {where: {email: 'user1@example.com'},},['id']);
    const user2 = await queryInterface.rawSelect('Users', {where: {email: 'user2@example.com'},},['id']);
    if (user1 && user2) {
      return queryInterface.bulkInsert('Records', [
        {
          name: '高爾夫球球具',
          date: '2019-01-01',
          category: 'recreation',
          amount: 7000,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user1
        },
        {
          name: '汽車加油費用',
          date: '2019-01-05',
          category: 'traffic',
          amount: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user1
        },
        {
          name: '午餐費',
          date: '2019-03-15',
          category: 'food',
          amount: 85,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user1
        },
        {
          name: '應酬',
          date: '2019-02-04',
          category: 'food',
          amount: 999,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user1
        },
        {
          name: '房租',
          date: '2019-01-15',
          category: 'living',
          amount: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user2
        },
        {
          name: '菜錢',
          date: '2019-02-01',
          category: 'living',
          amount: 168,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user2
        },
        {
          name: '學費',
          date: '2019-05-25',
          category: 'other',
          amount: 3210,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user2
        },
        {
          name: '公車票',
          date: '2019-04-07',
          category: 'traffic',
          amount: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: user2
        }
      ], {});
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Records', null, {});
  }
};