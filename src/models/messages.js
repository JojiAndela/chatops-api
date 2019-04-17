export default (sequelize, DataTypes) => {
  const messages = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    msg: DataTypes.TEXT,
    senderId: DataTypes.UUID,
    receiverId: DataTypes.UUID,
    chatId: DataTypes.UUID,
    read: DataTypes.BOOLEAN
  });

  messages.associate = ({ User, Chat }) => {
    messages.belongsTo(User,{
      as: 'sender',
      foreignKey: 'senderId',
    });

    messages.belongsTo(User,{
      as: 'reciever',
      foreignKey: 'receiverId',
    });

    messages.belongsTo(Chat,{
      as: 'chat',
      foreignKey: 'chatId',
    });
  };
  return messages;
};