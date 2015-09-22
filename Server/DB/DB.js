var Sequelize = require("sequelize");
var sequelize = new Sequelize("besties", "root", "", {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var users = sequelize.define('user', {
  //id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_name: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  status: Sequelize.STRING,
  profile_pic: Sequelize.STRING,
  has_bestie: Sequelize.BOOLEAN,
  bestie_user_ID: Sequelize.INTEGER
});

var pictures = sequelize.define('picture', {
  //id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  link: Sequelize.STRING,
  user_ID: Sequelize.INTEGER,
  bestie_user_ID: Sequelize.INTEGER,
});

var messages = sequelize.define('message', {
  // id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  text: Sequelize.STRING,
  bestie_ID: Sequelize.STRING,
  user_ID: Sequelize.STRING
});

var pictureComments = sequelize.define('pictureComment', {
  picture_ID: Sequelize.INTEGER,
  message_ID: Sequelize.INTEGER
});

users.hasMany(messages, {foreignKey: 'user_ID'});
users.hasMany(pictures, {foreignKey: 'user_ID'});
pictures.belongsToMany(messages, {through: 'pictureComments'});
messages.belongsToMany(pictures, {through: 'pictureComments'});

module.exports.Messages = messages;
module.exports.Pictures = pictures;
module.exports.Users = users;


