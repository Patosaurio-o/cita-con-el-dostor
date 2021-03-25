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
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "ingrese un email valido"
      } 
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: {
        args:6,
        msg: "ingrese una contraseña entre 6 y 16 caracteres"
      },
      max: {
        args:16,
        msg: "ingrese una contraseña entre 6 y 16 caracteres"
      }
    }
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
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: {
        args:8,
        msg: "el horario de atencion es entre las 08:00 y las 17:00 Hrs"
      },
      max: {
        args:16,
        msg: "el horario de atencion es entre las 08:00 y las 17:00 Hrs"
      }
    }
  },
  complain: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [10, 255],
        msg: "tiene que tener un minimo de 10 caracteres"
      }
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