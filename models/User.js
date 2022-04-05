const { DataTypes } = require('sequelize')

const db = require('../connection/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: true
    },
    
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: true
    },

    password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: true
    },
})

module.exports = User