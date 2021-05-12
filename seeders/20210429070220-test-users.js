'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      // hash化してない！
      { name: '太郎',  email: 'taro@example.com', password: 'taro-password', createdAt: now, updatedAt: now},
      { name: '次郎',  email: 'jiro@example.com', password: 'jiro-password', createdAt: now, updatedAt: now},
      { name: '三郎',  email: 'saburo@example.com', password: 'saburo-password', createdAt: now, updatedAt: now},
      { name: '四郎',  email: 'shiro@example.com', password: 'shiro-password', createdAt: now, updatedAt: now},
      { name: '五郎',  email: 'goro@example.com', password: 'goro-password', createdAt: now, updatedAt: now},
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
