const express = require('express');
const dotenv = require('dotenv');
const pageRoute = require('./routes/pageRoutes')

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

// Routes
app.use('/', pageRoute);

app.listen(port, () =>
  console.log(`Suncucu ${port} nolu porttan ayağa kalktı`)
);
