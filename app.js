const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

app.get('/', (req, res) => res.status(200).render('index', { pageName: 'index'}));
app.get('/about', (req, res) => res.status(200).render('about', { pageName: 'about'}));

app.listen(port, () =>
  console.log(`Suncucu ${port} nolu porttan ayağa kalktı`)
);
