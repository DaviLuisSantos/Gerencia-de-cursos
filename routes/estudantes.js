const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const Estudante = require('../models/Estudante');
const bodyParser = require('body-parser');
const sequelize = require('../config/db');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

router.get('/', async (req, res) => {
    try {
        const estudantes = await Estudante.findAll();
        res.render('estudantes/index', { estudantes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar estudantes');
    }
});

router.get('/new', (req, res) => {
    res.render('estudantes/new');
});

router.post('/new', async (req, res) => {
    const { nome, data_nascimento, endereco, telefone } = req.body;
    try {
        console.log(endereco);
        const estudante = await Estudante.create({ nome, data_nascimento, endereco, telefone });
        res.redirect('/estudantes');
        console.log(estudante);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar estudante');
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const estudante = await Estudante.findByPk(id);
        if (!estudante) {
            res.status(404).send('Estudante não encontrado');
        } else {
            res.render('estudantes/show', { estudante });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar estudante');
    }
});

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    try {
        const estudante = await Estudante.findByPk(id);
        if (!estudante) {
            res.status(404).send('Estudante não encontrado');
        } else {
            res.render('estudantes/edit', { estudante });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar estudante');
    }
});

router.put('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const { nome, data_nascimento, endereco, telefone } = req.body;
    try {
        const estudante = await Estudante.findByPk(id);
        if (!estudante) {
            res.status(404).send('Estudante não encontrado');
        } else {
            await estudante.update({ nome, data_nascimento, endereco, telefone });
            res.redirect(`/estudantes/${id}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar estudante');
    }
});

router.delete('/:id/excluir', async (req, res) => {
    const id = req.params.id;
    try {
        const estudante = await Estudante.findByPk(id);
        if (!estudante) {
            res.status(404).send('Estudante não encontrado');
        } else {
            await estudante.destroy();
            res.redirect('/estudantes');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar estudante');
    }
});

module.exports = router;