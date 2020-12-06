const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
//const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');
const connectDB = require('./config/db');
const path = require('path');
//const rateLimit = require('express-rate-limit');
dotenv.config({ path: './config/config.env' });

// Connect the Database
connectDB();

// Initialize the app
const app = express();

// body parser middleware
app.use(express.json({ limit: '15mb' }));

app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Cookie parser
app.use(cookieParser());

// morgan middleware for outputing requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security header
//app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// rate limiting If I want to limit the number of requests
/*const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);*/

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Routes
const users = require('./routes/users');
const auth = require('./routes/auth');
const post = require('./routes/post');

// Mount Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/post', post);

//Serve static assets in production
// Set static folder
//app.use('/static', express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + '/client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
