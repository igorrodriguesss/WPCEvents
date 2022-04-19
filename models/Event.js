const { DataTypes } = require('sequelize')

const db = require('../connection/conn')

const User = require('../models/User')

const Event = db.define('Event',{
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        require: true,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        require: true,
        allowNull: true
    },
    private: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    items: {
        type: DataTypes.JSON,
    },
    image: {
        type: DataTypes.STRING,
    }
})

Event.belongsTo(User)
User.hasMany(Event)




module.exports = Event