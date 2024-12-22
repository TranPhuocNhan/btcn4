require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { sequelize } = require('./config/database');
const concurrently = require('concurrently');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set View Engine
app.engine(
  'handlebars',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/user', userRoutes);
app.get('/', (req, res) => {
  const title = 'Trang Chủ';
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    avatar: 'https://placeimg.com/100/100/people',
  };

  const usersOnline = [
    { username: 'User1', avatar: 'https://placeimg.com/100/100/people' },
    { username: 'User2', avatar: 'https://placeimg.com/100/100/people' }
  ];

  const gameTables = [
    { name: 'Bàn 1', status: 'Chờ người chơi', started: false },
    { name: 'Bàn 2', status: 'Đang chơi', started: true }
  ];

  const messages = [
    { user: 'User1', text: 'Chào mọi người!' },
    { user: 'User2', text: 'Chào User1!' }
  ];


  // Render trang home với các giá trị đã truyền
  res.render('home', {
    title: title,
    user: user,
    usersOnline: usersOnline,
    gameTables: gameTables,
    messages: messages,
  });
});



// Start Server
const PORT_SERVER = process.env.PORT_SERVER || 21515;

app.listen(PORT_SERVER || 21515, () => {
  console.log('Server đang chạy tại http://localhost:21515');
});