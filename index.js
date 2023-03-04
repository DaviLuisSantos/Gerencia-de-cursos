const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db');
const Estudante = require('./models/Estudante');
const Professor = require('./models/Professor');
const Curso = require('./models/Curso');
const Matricula = require('./models/Matricula');
const estudantesRoutes = require('./routes/estudantes');

db.sync()

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Testa a conexão com o banco de dados
(async () => {
    try {
        await db.authenticate();
        console.log('Conexão estabelecida com o banco de dados.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
})();

// Define as associações entre as tabelas
Curso.belongsTo(Professor);
Professor.hasMany(Curso);
Matricula.belongsTo(Estudante);
Matricula.belongsTo(Curso);
Estudante.belongsToMany(Curso, { through: Matricula });
Curso.belongsToMany(Estudante, { through: Matricula });

// Sincroniza os modelos com o banco de dados
(async () => {
    try {
        await db.sync({ force: true });
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Não foi possível sincronizar os modelos com o banco de dados:', error);
    }
})();

app.get('/', (req, res) => {
    res.render('index');
});
app.use('/estudantes', estudantesRoutes);


app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
