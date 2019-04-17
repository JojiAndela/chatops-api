export default (sequelize, DataTypes) => {
  const chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });
  chat.associate = function({ Message, User, ChatUser}) {

    chat.belongsToMany(User,{
      as: 'users',
      through: ChatUser,
      foreignKey: 'chatId',
    });

    chat.hasMany(Message, {
      as: 'messages',
      foreignKey: 'chatId',
    });

  };
  return chat;
};