const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const db = require('../config/db');
const Professor = require('./Professor');

const Curso = db.define('Curso', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
});


module.exports = Curso;
