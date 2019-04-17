module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Chat_users', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      chatId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Chats',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

  down: queryInterface => queryInterface.dropTable('Chat_users')

};