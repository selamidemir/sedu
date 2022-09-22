const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => res.status(200).send('ANA SAYFA'));

app.listen(port, () =>
  console.log(`Suncucu ${port} nolu porttan ayağa kalktı`)
);
