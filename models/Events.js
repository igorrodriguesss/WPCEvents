const { DataTypes } = require('sequelize')

const db = require('../connection/conn')

const Events = db.define('Events',{
    name: {
        title: DataTypes.STRING,
        allowNull: true
    },
    name: {
        title: DataTypes.STRING,
        allowNull: true
    },
    name: {
        title: DataTypes.STRING,
        allowNull: true
    },
    name: {
        title: DataTypes.STRING,
        allowNull: true
    },
    name: {
        title: DataTypes.STRING,
        allowNull: true
    },
})