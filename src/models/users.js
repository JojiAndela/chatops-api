export default (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    last_seen: DataTypes.DATE,
    bio: DataTypes.TEXT,
    avatar: DataTypes.STRING
  });
  users.associate = ({ Message, Chat, ChatUser }) => {
    users.hasMany(Message, {
      as: 'sentMessages',
      foreignKey: 'senderId',
    });

    users.hasMany(Message, {
      as: 'receivedMessages',
      foreignKey: 'receiverId',
    });

    users.belongsToMany(Chat, {
      as: 'chats',
      through: ChatUser,
      foreignKey: 'userId',
    });

  };
  return users;
};