const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const userRoute = require('./routes/userRoutes');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

mongoose.connect('mongodb://localhost/sedu-db', () =>
  console.log('Vertitabanı sunucusuna bağlanıldı.')
);

// Template Engine
app.set('view engine', 'ejs');

global.userIN = null;

// Middleware
app.use(express.static('public')); // statik dosya yerlerini belirle
app.use(express.json()); // json kullan
app.use(express.urlencoded({ extended: true }));
app.use(
  // session aç
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sedu-db' }),
  })
);
app.use(flash())
// Tüm istekler geldiğinde herhangi bir kullanıcı girişi
// var mı kontrol et.
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next(); // Sonraki middleware geç
});

// Flash messages
app.use((req, res, next) => {
  res.locals.flahsMessages = req.flash();
  next();
});

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () =>
  console.log(`Suncucu ${port} nolu porttan ayağa kalktı`)
);
