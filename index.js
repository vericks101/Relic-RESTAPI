const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const forgotRoute = require('./routes/forgotUsernameOrPassword');
const resetRoute = require('./routes/resetPassword');
const resetViaUsername = require('./routes/resetPasswordViaUsername');
const verifyEmail = require('./routes/verifyEmail');

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to the database.')
);

mongoose.connection.on('error', function(){console.log('test')});

// Middlewares
app.use(cors());
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/forgotusernameorpassword', forgotRoute);
app.use('/api/reset', resetRoute);
app.use('/api/resetPasswordViaUsername', resetViaUsername);
app.use('/api/verify', verifyEmail);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is up and running on port ' + port + '.'));