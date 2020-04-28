const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

// Register user.
router.post('/register', async (req, res) => {

    // Validate data before we create a user.
    const {error} = registerValidation(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    // Check if user is already in the database.
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
        return res.status(400).send('Email already exists.');

    // Hash the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user.
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.send({ user: user._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

// Login user.
router.post('/login', async (req, res) => {
    // Validate data before we login a user.
    const {error} = loginValidation(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    // Check if user email exists.
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Email or password does not match any existing records.');
    
    // Check if password is correct.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send('Email or password does not match any existing records.');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;