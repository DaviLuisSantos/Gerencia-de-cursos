const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Estudante = db.define('estudante', {
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
});

module.exports = Estudante;