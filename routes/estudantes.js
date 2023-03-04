const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const Estudante = require('../models/Estudante');


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

// rota para listar todos os estudantes
router.get('/', async (req, res) => {
    try {
        const estudantes = await Estudante.findAll();
        res.render('estudantes/index', { estudantes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar estudantes');
    }
});

// rota para exibir o formulário de criação de estudante
router.get('/new', (req, res) => {
    res.render('estudantes/new');
});

// rota para criar um novo estudante
router.post('/', async (req, res) => {
    const { nome, data_nascimento, endereco, telefone } = req.body;
    try {
        const estudante = await Estudante.create({ nome, data_nascimento, endereco, telefone });
        res.redirect('/estudantes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar estudante');
    }
});

// rota para exibir os detalhes de um estudante
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

// rota para exibir o formulário de edição de um estudante
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

// rota para atualizar os dados de um estudante
router.put('/:id', async (req, res) => {
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

// rota para excluir um estudante
router.delete('/:id', async (req, res) => {
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