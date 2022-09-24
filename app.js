const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoutes');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

mongoose.connect('mongodb://localhost/sedu-db', () =>
  console.log('Vertitabanı sunucusuna bağlanıldı.')
);

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

app.listen(port, () =>
  console.log(`Suncucu ${port} nolu porttan ayağa kalktı`)
);
