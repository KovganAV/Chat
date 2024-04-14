const express = require('express');
const router = express.Router();

router.delete('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to logout' });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
