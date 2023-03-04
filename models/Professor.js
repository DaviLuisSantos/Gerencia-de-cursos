const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Professor = db.define('Professor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
    disciplina: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});

module.exports = Professor;
