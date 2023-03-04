const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const db = require('../config/db');
const Estudante = require('./Estudante');
const Curso = require('./Curso');

const Matricula = db.define('Matricula', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data_matricula: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
});

Matricula.belongsTo(Curso);
Matricula.belongsTo(Estudante);
Curso.hasMany(Matricula);
Estudante.hasMany(Matricula);

module.exports = Matricula;
