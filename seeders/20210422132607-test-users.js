'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const now = new Date();
   return queryInterface.bulkInsert('Users',[
     {
      name: "太郎",
      email: 'taro@example.com',
      password: bcrypt.hashSync('secret', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
