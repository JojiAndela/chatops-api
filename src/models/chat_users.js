'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat_users = sequelize.define('ChatUser', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: DataTypes.UUID,
    chatId: DataTypes.UUID
  }, {
    tableName: 'Chat_users'
  });
  chat_users.associate = function(models) {
    // associations can be defined here
  };
  return chat_users;
};