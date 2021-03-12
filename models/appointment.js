const { DataTypes } = require('sequelize');
const sql = require('../db');  

const User = sql.define('User', {     
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Appointment = sql.define('Appointment', {     
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUUID: 3,
      isAfter: "2021-03-09",
    }
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8,17],
    }
  },
  complain: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 10,
    }
  }
});

User.hasMany(Appointment);
Appointment.belongsTo(User);

sql.sync()
.then(() => {
  console.log('error 404 Data Base not found')
});

module.exports = {
  User,
  Appointment
};