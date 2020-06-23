const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacao = require('./util/cotacao');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações',
        author: 'Flavio'
    })
});

app.get('/sobre', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Flavio Moreira'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda'
    })
});

app.get('/cotacoes', (req, res) => {
    if (!req.query.ativo) {
        const error = {
            mensage: 'Ativo deve ser informado!',
            code: 400
        }
        return res.status(error.code).json(error);
    }
    const symbol = req.query.ativo.toUpperCase();
    cotacao(symbol, (err, body) => {
        if(err) {
            return res.status(err.code).json({err});
        }
        res.status(200).json(body);
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Flavio Moreira',
        erroMessage: 'Pagina não encontrada!'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is up on port 3000");
});