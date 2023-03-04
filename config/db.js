const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../bancodecursos.db',
    logging: false,
    define: {
        timestamps: false, // desativa a adição automática das colunas createdAt e updatedAt
    },
});

module.exports = sequelize;
