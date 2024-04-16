const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const User = require('../webchat-frontend/src/api/Data.ts');

function sha256(str) {
  return CryptoJS.SHA256(str).toString();
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== sha256(password)) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Successful login', userId: user.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
