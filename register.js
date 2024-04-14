const express = require('express');
const CryptoJS = require('crypto-js');
const router = express.Router();
const User = require('../webchat-frontend/src/api/request.ts').User; 
//const { User } = require('../webchat-frontend/src/api/request.js');  // Adjust the path accordingly

function sha256(str) {
    return CryptoJS.SHA256(str).toString();
}

router.post('/register', async (req, res) => { 
    const { username, Password, password_confirmation } = req.body.user;

    if (Password !== password_confirmation) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ username, Password: sha256(Password) });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
