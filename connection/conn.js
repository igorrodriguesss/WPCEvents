const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('login', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conexão com banco de dados, feita com sucesso!')
} catch (err) {
    console.log(`Conexão com banco de dados não foi efetuada + ${err}`)
}

module.exports = sequelize