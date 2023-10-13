const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('ewaste','root','Sen@iDev77!.',{
    host:'127.0.0.1',
    port:3306,
    dialect:'mysql'
})

try{
    sequelize.authenticate()
    console.log('Mysql conectado!')
}catch(error){
    console.log(`Deu erro: ${error}`)
}

module.exports = sequelize